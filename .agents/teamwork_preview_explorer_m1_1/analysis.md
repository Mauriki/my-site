# Course Portal Video Playback and Transcript Analysis & Design Plan

This report provides a detailed analysis of the current implementation of video playback and transcript handling in the course portal, specifically in `src/app/ultimate-guide/portal/page.tsx`, and presents a comprehensive design/implementation plan to address requirements R1 through R4.

---

## 1. Observation

A detailed review of `src/app/ultimate-guide/portal/page.tsx` reveals the following:

### R1. Robust Iframe Playback Event Syncing
*   **Location:** lines 453-482.
*   **Current Code:**
    ```typescript
    // Fallback: Broad window message listener for cross-origin postMessage (safely filters JSON)
    useEffect(() => {
      const handleMessage = (event: MessageEvent) => {
        if (typeof event.data !== 'string') return;
        try {
          const parsed = JSON.parse(event.data);
          if (parsed && parsed.event === 'timeupdate') {
            let secs = 0;
            if (typeof parsed.value === 'number') {
              secs = parsed.value;
            } else if (parsed.value && typeof parsed.value.seconds === 'number') {
              secs = parsed.value.seconds;
            } else if (parsed.data && typeof parsed.data.seconds === 'number') {
              secs = parsed.data.seconds;
            } else if (typeof parsed.seconds === 'number') {
              secs = parsed.seconds;
            }
            if (secs > 0) {
              setCurrentTime(secs);
            }
          }
        } catch {
          // Silently skip non-JSON messages
        }
      };

      window.addEventListener('message', handleMessage);
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }, []);
    ```
*   **Findings:**
    1.  The listener performs an early exit if `typeof event.data !== 'string'`. If the Bunny Stream player sends events directly as JavaScript objects (rather than serialized JSON strings), they are discarded.
    2.  The time update logic checks `if (secs > 0)`. If a playback update is `0` (e.g., when the video resets or is seeked to the beginning), the state is not updated, creating a sync discrepancy.

### R2. Handshake Timing & Lifecycle Management
*   **Location:** lines 409-450.
*   **Current Code:**
    ```typescript
    // Listen to playback time messages from Bunny Stream iframe using Player.js API
    useEffect(() => {
      let player: PlayerJSPlayer | null = null;

      const initPlayer = () => {
        const iframe = document.querySelector('.portal-video-ratio iframe') as HTMLIFrameElement;
        if (iframe && typeof window !== 'undefined' && (window as unknown as WindowWithPlayerJS).playerjs) {
          try {
            const activePlayer = new (window as unknown as WindowWithPlayerJS).playerjs!.Player(iframe);
            player = activePlayer;
            playerRef.current = activePlayer;
            
            activePlayer.on('ready', () => {
              activePlayer.on('timeupdate', (data: unknown) => {
                const seconds = (data as { seconds?: number })?.seconds;
                if (typeof seconds === 'number') {
                  setCurrentTime(seconds);
                }
              });
            });
            
            // Clear interval if successfully bound
            clearInterval(interval);
          } catch (err) {
            console.error("PlayerJS registration failed", err);
          }
        }
      };

      // Retry binding in case playerjs script is still loading
      initPlayer();
      const interval = setInterval(initPlayer, 1000);

      return () => {
        clearInterval(interval);
        playerRef.current = null;
        if (player) {
          try {
            player.off('timeupdate');
          } catch {}
        }
      };
    }, [activeIdx]);
    ```
*   **Findings:**
    1.  The current logic initializes PlayerJS via a blind polling interval (`setInterval(initPlayer, 1000)`) on lesson change.
    2.  It instantiates `new playerjs.Player(iframe)` immediately. The PlayerJS constructor sends a `ping` (handshake) to the iframe. If the iframe's internal document or player script is not fully loaded when the `ping` is sent, the handshake is lost and the player fails to register event listeners.
    3.  There is no binding to the iframe's native `onLoad` lifecycle event.

### R3. State Reset on Lesson Switch
*   **Location:** lines 389-406.
*   **Current Code:**
    ```typescript
    // Load transcript data when active lesson changes
    useEffect(() => {
      setTranscriptData(null);
      setCurrentTime(0);
      fetch(`/transcripts/lesson${activeIdx + 1}.json`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('No transcript');
        })
        .then((data) => {
          setTranscriptData(data);
        })
        .catch(() => {
          setTranscriptData(null);
        });
    }, [activeIdx]);
    ```
*   **Findings:**
    1.  When `activeIdx` changes, `transcriptData` is reset to `null` and `currentTime` is reset to `0`. However, `activeLine` is not reset to `-1`.
    2.  Since `transcriptData` is `null` during loading, the effect that updates `activeLine` (lines 485-499) exits early without calling `setActiveLine`.
    3.  Consequently, the highlighted active line state from the *previous* lesson remains active in the UI while the new lesson is loading, resulting in a ghost highlight bug.

### R4. Hover-Aware Smooth Auto-Scrolling
*   **Location:** lines 501-517 and 708-739.
*   **Current Code (Auto-Scroll Effect):**
    ```typescript
    // Auto-scroll transcript container only when activeLine changes and user is not reading/hovering
    useEffect(() => {
      if (showTranscript && activeLine !== -1 && transcriptContainerRef.current && !isHoveringTranscript) {
        const container = transcriptContainerRef.current;
        const lineElement = container.children[activeLine] as HTMLElement;
        if (lineElement) {
          const containerHeight = container.clientHeight;
          const lineOffset = lineElement.offsetTop;
          const lineHeight = lineElement.clientHeight;
          
          container.scrollTo({
            top: lineOffset - containerHeight / 2 + lineHeight / 2,
            behavior: 'smooth'
          });
        }
      }
    }, [activeLine, showTranscript, isHoveringTranscript]);
    ```
*   **Current Code (Render Mapping):**
    ```typescript
    {showTranscript && (
      <div 
        className="transcript-container"
        ref={transcriptContainerRef}
        onMouseEnter={() => setIsHoveringTranscript(true)}
        onMouseLeave={() => setIsHoveringTranscript(false)}
      >
        {transcriptData.map((line, idx) => {
          const isActive = idx === transcriptData.reduce((acc, curr, i) => {
            return currentTime >= curr.time ? i : acc;
          }, -1);
          ...
    ```
*   **Findings:**
    1.  The dependency array for the auto-scroll effect includes `isHoveringTranscript`. When the user hovers out of the transcript container, `isHoveringTranscript` changes to `false`, causing the effect to re-run and jarringly jump-scroll the container back to the active line.
    2.  During rendering, the code performs `transcriptData.reduce` for *every* line mapped inside the transcript. This creates an $O(N^2)$ render cost where $N$ is the number of lines in the transcript. Since `currentTime` updates multiple times per second, this results in significant performance bottlenecks and main-thread lag during video playback.

---

## 2. Logic Chain

The observations above lead directly to the following design recommendations:

1.  **For R1 (Robust Iframe Playback Event Syncing):**
    *   To support both object payloads and JSON strings, we need a unified parsing handler that inspects `event.data`'s type first.
    *   If it is a string, attempt `JSON.parse`. If it is an object, reference it directly.
    *   To fix the edge case for playback initialization or seeks back to the start, check `secs >= 0` rather than `secs > 0`.

2.  **For R2 (Handshake Timing & Lifecycle Management):**
    *   By binding PlayerJS creation to the `iframe`'s native `onLoad` event, we guarantee that the iframe document itself has loaded before sending any handshake message.
    *   Since React destroys and remounts the `iframe` when the lesson changes (due to `key={currentLecture.videoSrc}`), the native `onLoad` event will fire reliably on every lesson switch.
    *   To handle cached reloads or Edge cases where `onLoad` doesn't fire, we can retain a slow polling interval (e.g., 1500ms) that attempts initialization ONLY if `playerReady` is still false.
    *   Storing `playerReady` and `player` inside React refs (`playerReadyRef` and `playerRef`) prevents race conditions and ensures clean resource teardown.

3.  **For R3 (State Reset on Lesson Switch):**
    *   Adding `setActiveLine(-1)` immediately upon lesson switch (in the `useEffect` listening to `activeIdx`) resets the active line state instantly, preventing the ghost highlight from displaying during the loading phase.

4.  **For R4 (Hover-Aware Smooth Auto-Scrolling):**
    *   To prevent the scroll jump when the user stops hovering, the auto-scroll effect's dependencies should only include `activeLine` and `showTranscript`.
    *   To read the hover state without registering it as a reactive dependency, we can mirror the hover status into a ref `isHoveringTranscriptRef.current`.
    *   To eliminate the $O(N^2)$ layout calculation overhead during playback, we replace the nested `.reduce` logic inside the render loop with a direct comparison to the pre-calculated `activeLine` state: `isActive = idx === activeLine`.

---

## 3. Caveats

*   **Network Timing:** The design assumes `/transcripts/lesson{id}.json` files are available locally. If transcript files fail to load or are delayed, `transcriptData` will be `null` and the transcript box won't render, which is handled correctly by the existing `try/catch` block.
*   **Cross-Origin Restraints:** Bunny Stream iframe must have the query parameter `&api=true` appended to enable PlayerJS support. This is already implemented in `page.tsx` line 688 and should be kept.
*   **No Build/Test Execution:** As per scope guidelines, no code was written to the target source files, and no build or validation commands were executed.

---

## 4. Conclusion & Design Plan

We propose the following precise modifications to `src/app/ultimate-guide/portal/page.tsx`:

### Proposed Code Patch (`portal_fixes.patch`)

```patch
diff --git a/src/app/ultimate-guide/portal/page.tsx b/src/app/ultimate-guide/portal/page.tsx
index original..updated 100644
--- a/src/app/ultimate-guide/portal/page.tsx
+++ b/src/app/ultimate-guide/portal/page.tsx
@@ -181,8 +181,11 @@ function CoursePortalInner() {
   const [transcriptData, setTranscriptData] = useState<{ time: number; text: string }[] | null>(null);
   const transcriptContainerRef = useRef<HTMLDivElement>(null);
   const playerRef = useRef<PlayerJSPlayer | null>(null);
+  const iframeRef = useRef<HTMLIFrameElement>(null);
+  const playerReadyRef = useRef(false);
   const [activeLine, setActiveLine] = useState(-1);
   const [isHoveringTranscript, setIsHoveringTranscript] = useState(false);
+  const isHoveringTranscriptRef = useRef(false);
 
   // Interactive Worksheet Modal States
   const [activeWorksheet, setActiveWorksheet] = useState<'one-thing' | 'breakdown' | 'routine' | null>(null);
@@ -391,6 +394,7 @@ function CoursePortalInner() {
   useEffect(() => {
     setTranscriptData(null);
     setCurrentTime(0);
+    setActiveLine(-1);
     fetch(`/transcripts/lesson${activeIdx + 1}.json`)
       .then((res) => {
         if (res.ok) {
@@ -409,17 +413,20 @@ function CoursePortalInner() {
   // Listen to playback time messages from Bunny Stream iframe using Player.js API
   useEffect(() => {
     let player: PlayerJSPlayer | null = null;
+    playerReadyRef.current = false;
 
     const initPlayer = () => {
-      const iframe = document.querySelector('.portal-video-ratio iframe') as HTMLIFrameElement;
+      if (playerReadyRef.current) return;
+      const iframe = iframeRef.current;
       if (iframe && typeof window !== 'undefined' && (window as unknown as WindowWithPlayerJS).playerjs) {
         try {
-          const activePlayer = new (window as unknown as WindowWithPlayerJS).playerjs!.Player(iframe);
+          if (playerRef.current) {
+            try { playerRef.current.off('timeupdate'); } catch {}
+          }
+          const activePlayer = new (window as unknown as WindowWithPlayerJS).playerjs.Player(iframe);
           player = activePlayer;
           playerRef.current = activePlayer;
           
           activePlayer.on('ready', () => {
+            playerReadyRef.current = true;
             activePlayer.on('timeupdate', (data: unknown) => {
               const seconds = (data as { seconds?: number })?.seconds;
               if (typeof seconds === 'number') {
@@ -428,20 +435,16 @@ function CoursePortalInner() {
             });
           });
-          
-          // Clear interval if successfully bound
-          clearInterval(interval);
         } catch (err) {
           console.error("PlayerJS registration failed", err);
         }
       }
     };
 
-    // Retry binding in case playerjs script is still loading
     initPlayer();
-    const interval = setInterval(initPlayer, 1000);
+    const interval = setInterval(initPlayer, 1500);
 
     return () => {
       clearInterval(interval);
       playerRef.current = null;
       if (player) {
         try {
           player.off('timeupdate');
         } catch {}
       }
     };
   }, [activeIdx]);
 
   // Fallback: Broad window message listener for cross-origin postMessage (safely filters JSON)
   useEffect(() => {
     const handleMessage = (event: MessageEvent) => {
-      if (typeof event.data !== 'string') return;
-      try {
-        const parsed = JSON.parse(event.data);
-        if (parsed && parsed.event === 'timeupdate') {
-          let secs = 0;
-          if (typeof parsed.value === 'number') {
-            secs = parsed.value;
-          } else if (parsed.value && typeof parsed.value.seconds === 'number') {
-            secs = parsed.value.seconds;
-          } else if (parsed.data && typeof parsed.data.seconds === 'number') {
-            secs = parsed.data.seconds;
-          } else if (typeof parsed.seconds === 'number') {
-            secs = parsed.seconds;
-          }
-          if (secs > 0) {
-            setCurrentTime(secs);
-          }
-        }
-      } catch {
-        // Silently skip non-JSON messages
+      let parsed: any = null;
+      if (typeof event.data === 'string') {
+        try {
+          parsed = JSON.parse(event.data);
+        } catch {}
+      } else if (event.data && typeof event.data === 'object') {
+        parsed = event.data;
+      }
+
+      if (parsed && (parsed.event === 'timeupdate' || parsed.method === 'timeupdate')) {
+        let secs = -1;
+        if (typeof parsed.value === 'number') {
+          secs = parsed.value;
+        } else if (parsed.value && typeof parsed.value.seconds === 'number') {
+          secs = parsed.value.seconds;
+        } else if (parsed.data && typeof parsed.data.seconds === 'number') {
+          secs = parsed.data.seconds;
+        } else if (typeof parsed.seconds === 'number') {
+          secs = parsed.seconds;
+        }
+        if (secs >= 0) {
+          setCurrentTime(secs);
+        }
       }
     };
 
     window.addEventListener('message', handleMessage);
     return () => {
       window.removeEventListener('message', handleMessage);
     };
   }, []);
 
   // Update activeLine when currentTime changes
   useEffect(() => {
     if (transcriptData) {
       let activeIdxVal = -1;
       for (let i = 0; i < transcriptData.length; i++) {
         if (currentTime >= transcriptData[i].time) {
           activeIdxVal = i;
         } else {
           break;
         }
       }
       if (activeIdxVal !== activeLine) {
         setActiveLine(activeIdxVal);
       }
     }
   }, [currentTime, transcriptData, activeLine]);
 
   // Auto-scroll transcript container only when activeLine changes and user is not reading/hovering
   useEffect(() => {
-    if (showTranscript && activeLine !== -1 && transcriptContainerRef.current && !isHoveringTranscript) {
+    if (showTranscript && activeLine !== -1 && transcriptContainerRef.current && !isHoveringTranscriptRef.current) {
       const container = transcriptContainerRef.current;
       const lineElement = container.children[activeLine] as HTMLElement;
       if (lineElement) {
         const containerHeight = container.clientHeight;
         const lineOffset = lineElement.offsetTop;
         const lineHeight = lineElement.clientHeight;
         
         container.scrollTo({
           top: lineOffset - containerHeight / 2 + lineHeight / 2,
           behavior: 'smooth'
         });
       }
     }
-  }, [activeLine, showTranscript, isHoveringTranscript]);
+  }, [activeLine, showTranscript]);
 
   const seekTo = (seconds: number) => {
@@ -685,8 +696,15 @@ function CoursePortalInner() {
             <div className="portal-video-frame">
               <div className="portal-video-ratio">
                 <iframe
+                  ref={iframeRef}
                   key={currentLecture.videoSrc} // Force iframe reload when lesson changes
                   src={`${currentLecture.videoSrc}&api=true`}
                   title={currentLecture.title}
+                  onLoad={() => {
+                    // Primary handshake trigger on native load
+                    if (typeof window !== 'undefined' && (window as any).playerjs) {
+                      // Construct playerjs Player which triggers handshake
+                      const iframe = iframeRef.current;
+                      if (iframe) {
+                        if (playerRef.current) {
+                          try { playerRef.current.off('timeupdate'); } catch {}
+                        }
+                        const activePlayer = new (window as any).playerjs.Player(iframe);
+                        playerRef.current = activePlayer;
+                        activePlayer.on('ready', () => {
+                          playerReadyRef.current = true;
+                          activePlayer.on('timeupdate', (data: any) => {
+                            const seconds = data?.seconds;
+                            if (typeof seconds === 'number') {
+                              setCurrentTime(seconds);
+                            }
+                          });
+                        });
+                      }
+                    }
+                  }}
                   allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                   allowFullScreen
                   referrerPolicy="strict-origin-when-cross-origin"
@@ -709,8 +727,14 @@ function CoursePortalInner() {
                   <div 
                     className="transcript-container"
                     ref={transcriptContainerRef}
-                    onMouseEnter={() => setIsHoveringTranscript(true)}
-                    onMouseLeave={() => setIsHoveringTranscript(false)}
+                    onMouseEnter={() => {
+                      setIsHoveringTranscript(true);
+                      isHoveringTranscriptRef.current = true;
+                    }}
+                    onMouseLeave={() => {
+                      setIsHoveringTranscript(false);
+                      isHoveringTranscriptRef.current = false;
+                    }}
                   >
                     {transcriptData.map((line, idx) => {
-                      const isActive = idx === transcriptData.reduce((acc, curr, i) => {
-                        return currentTime >= curr.time ? i : acc;
-                      }, -1);
+                      const isActive = idx === activeLine;
```

---

## 5. Verification Method

To verify these changes after implementation:

1.  **Event Syncing (R1):**
    *   Simulate direct postMessage object and string payloads from the console:
        ```javascript
        // Test JSON string event
        window.postMessage(JSON.stringify({ event: 'timeupdate', value: { seconds: 12 } }), '*');
        // Test object event
        window.postMessage({ event: 'timeupdate', value: 15 }, '*');
        // Test 0 seconds event
        window.postMessage({ event: 'timeupdate', value: 0 }, '*');
        ```
    *   Verify that `currentTime` updates to `12`, `15`, and `0` respectively.

2.  **Handshake / Lifecycle (R2):**
    *   Load the page and inspect console logs. Ensure no PlayerJS connection warnings appear.
    *   Trigger rapid switching between lessons and verify that player controls and playback listeners remain active and bound to the newly rendered iframe without throwing errors.

3.  **State Reset (R3):**
    *   Start playing a video until the transcript scrolls and highlights a line (e.g. line 8).
    *   Click on a different lesson in the syllabus sidebar.
    *   Verify that the active line highlight immediately turns off (reset to `-1`) and does not display any highlight during the next video loading phase.

4.  **Auto-Scroll & Hover (R4):**
    *   Play a video and let the transcript autoscroll.
    *   Hover the mouse pointer over the transcript box.
    *   Verify that autoscroll suspends while the cursor remains inside the container.
    *   Move the mouse out of the transcript box. Verify that the transcript does NOT suddenly jump-scroll immediately upon mouse leave. It should only scroll when the active line index transitions.
    *   Inspect render performance using Chrome DevTools (Performance tab) to ensure that the $O(N^2)$ `.reduce` operation has been removed, returning CPU cycles to nominal levels.
