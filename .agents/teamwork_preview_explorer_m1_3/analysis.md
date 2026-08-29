# Analysis and Recommendation Report: Video Playback & Transcript Handling

This report provides a read-only codebase analysis of `src/app/ultimate-guide/portal/page.tsx` and proposes a detailed design and implementation plan to fix issues regarding video playback event syncing, handshake timing, state reset on lesson switches, and smooth hover-aware transcript auto-scrolling.

---

## 1. Observations

### R1. Robust Iframe Playback Event Syncing
- **Current Code (Lines 453–482)**:
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
- **Finding**: The listener strictly discards non-string data by doing `if (typeof event.data !== 'string') return;`. If Bunny Stream sends an object directly (which is standard behavior for postMessage in modern browsers and some wrapper APIs), the event is completely ignored. Additionally, `if (secs > 0)` prevents updating `currentTime` when `secs` is exactly `0`, meaning playback resets to the beginning of the video will not sync cleanly to the UI.

---

### R2. Handshake Timing & Lifecycle Management
- **Current Code (Lines 409–450)**:
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
- **Finding**: The `useEffect` polls every second to bind PlayerJS, but it starts sending handshake messages to the iframe before the iframe's internal document and scripts have fully loaded. Since the iframe's `src` is reloaded via a React `key` change (`key={currentLecture.videoSrc}` at line 687), there is no coordination with the iframe's actual loading lifecycle.

---

### R3. State Reset on Lesson Switch
- **Current Code (Lines 389–406)**:
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
- **Finding**: When `activeIdx` changes, `transcriptData` and `currentTime` are reset. However, `activeLine` is not reset to `-1` in this block. Because `activeLine` update logic depends on `transcriptData` being non-null (lines 485–499), `activeLine` remains at its previous value (from the prior lesson) until the new JSON transcript is fetched and loaded. If a lesson has no transcript, the old highlight state persists indefinitely.

---

### R4. Hover-Aware Smooth Auto-Scrolling
- **Current Code (Lines 501–517)**:
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
- **Current Code (Lines 715–718)**:
  ```typescript
  {transcriptData.map((line, idx) => {
    const isActive = idx === transcriptData.reduce((acc, curr, i) => {
      return currentTime >= curr.time ? i : acc;
    }, -1);
  ```
- **Finding**: 
  1. The dependency array of the scroll effect includes `isHoveringTranscript`. Thus, when the user hovers or unhovers, the layout scrolling calculation triggers again.
  2. Crucially, the render method maps over `transcriptData` and determines the active line by executing a `.reduce()` query on `transcriptData` matching against `currentTime`. Because `currentTime` updates sub-second, the entire transcript list performs list-wide recalculations and renders several times per second, triggering constant layout recalculations.

---

## 2. Logic Chain

### R1. Robust Iframe Playback Event Syncing
- By checking if `event.data` is an object, we can bypass `JSON.parse` and access properties directly.
- By parsing `event.data` as JSON only when it is a string, we support stringified messages securely.
- Changing the update threshold from `secs > 0` to `secs >= 0` ensures that the transition to the start of the video (0.0 seconds) is captured correctly.

### R2. Handshake Timing & Lifecycle Management
- Binding the initialization to the iframe's `onLoad` ensures the iframe document has loaded and the iframe's embedded player script is ready to process messages.
- Storing `iframeLoaded` in state allows us to keep initialization deferred.
- Using a 3-second backup timer fallback addresses edge cases where `onLoad` is not fired (e.g., if browser cached the iframe content and did not fire a load event, or during developer hot-reloads).

### R3. State Reset on Lesson Switch
- Calling `setActiveLine(-1)` immediately inside the lesson change effect ensures that the UI cleanly resets its active line highlight state to `-1` before the new transcript data is asynchronously loaded.

### R4. Hover-Aware Smooth Auto-Scrolling
- Moving the hover state tracking from a state variable (`isHoveringTranscript`) to a mutable ref (`isHoveringTranscriptRef = useRef(false)`) prevents mouse hover transitions from triggering the scroll effect or component re-renders.
- Removing `isHoveringTranscript` from the scroll `useEffect` dependency list isolates the scrolling trigger solely to changes in `activeLine` or `showTranscript`.
- Changing the JSX mapping to use `idx === activeLine` rather than a `.reduce()` lookup against `currentTime` eliminates sub-second layout recalculations during rendering.

---

## 3. Caveats

- **Bunny Stream Protocol Compatibility**: We assume Bunny Stream's postMessage data payload matches the standard PlayerJS event schema (e.g. sends `{ event: 'timeupdate', value: { seconds: X } }` or `{ event: 'timeupdate', data: { seconds: X } }`). The normalization function covers all variations found in the wild.
- **External PlayerJS Script**: If the PlayerJS library loaded via `<Script>` fails to load (due to network error/blocking), the component relies on the fallback `postMessage` window listener, which is preserved and hardened in this plan.

---

## 4. Conclusion & Detailed Implementation Plan

The proposed design requires the following modifications in `src/app/ultimate-guide/portal/page.tsx`:

### Proposed Diffs

#### 1. Add `iframeLoaded` State and `isHoveringTranscriptRef` Ref
Add a ref for hover state tracking and a state for iframe loading in `CoursePortalInner` (near line 185):
```typescript
  const [activeLine, setActiveLine] = useState(-1);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const isHoveringTranscriptRef = useRef(false);
```

#### 2. Reset activeLine and iframeLoaded on Lesson Switch
Update the `activeIdx` effect (lines 389–406):
```typescript
  // Load transcript data when active lesson changes
  useEffect(() => {
    setTranscriptData(null);
    setCurrentTime(0);
    setActiveLine(-1);
    setIframeLoaded(false);
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

#### 3. Update PlayerJS Initialization with Lifecycle Tracking and Polling Fallback
Replace the current PlayerJS registration effect (lines 409–450):
```typescript
  // Listen to playback time messages from Bunny Stream iframe using Player.js API
  useEffect(() => {
    let player: PlayerJSPlayer | null = null;
    let interval: NodeJS.Timeout | null = null;

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
          
          if (interval) {
            clearInterval(interval);
          }
        } catch (err) {
          console.error("PlayerJS registration failed", err);
        }
      }
    };

    if (iframeLoaded) {
      initPlayer();
      interval = setInterval(initPlayer, 1000);
    } else {
      // Robust polling backup: force initialization setup after 3s if onLoad fails to fire
      const backupTimeout = setTimeout(() => {
        setIframeLoaded(true);
      }, 3000);
      return () => clearTimeout(backupTimeout);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      playerRef.current = null;
      if (player) {
        try {
          player.off('timeupdate');
        } catch {}
      }
    };
  }, [activeIdx, iframeLoaded]);
```

#### 4. Harden Iframe Playback postMessage Sync
Update the broad window event message fallback listener (lines 453–482):
```typescript
  // Fallback: Broad window message listener for cross-origin postMessage (safely filters JSON and Objects)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      let data: any = null;
      if (typeof event.data === 'string') {
        try {
          data = JSON.parse(event.data);
        } catch {
          return; // Silently skip non-JSON messages
        }
      } else if (typeof event.data === 'object' && event.data !== null) {
        data = event.data;
      } else {
        return; // Unsupported message formats
      }

      if (data && (data.event === 'timeupdate' || data.method === 'timeupdate')) {
        let secs: number | undefined;
        if (typeof data.value === 'number') {
          secs = data.value;
        } else if (data.value && typeof data.value.seconds === 'number') {
          secs = data.value.seconds;
        } else if (data.data && typeof data.data.seconds === 'number') {
          secs = data.data.seconds;
        } else if (typeof data.seconds === 'number') {
          secs = data.seconds;
        }

        if (typeof secs === 'number' && !isNaN(secs) && secs >= 0) {
          setCurrentTime(secs);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
```

#### 5. Optimise Scroll Triggering to Exclude Hover Transitions
Update the scrolling effect dependencies and target the hover ref (lines 501–517):
```typescript
  // Auto-scroll transcript container only when activeLine changes and user is not reading/hovering
  useEffect(() => {
    if (showTranscript && activeLine !== -1 && transcriptContainerRef.current && !isHoveringTranscriptRef.current) {
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
  }, [activeLine, showTranscript]);
```

#### 6. Update JSX to Trigger iframe onLoad and Bind Ref Listeners
Update the JSX definitions for both the iframe and the transcript wrapper (lines 686–693 and 709–718):

- **Iframe**:
  ```typescript
                  <iframe
                    key={currentLecture.videoSrc} // Force iframe reload when lecture changes
                    src={`${currentLecture.videoSrc}&api=true`}
                    title={currentLecture.title}
                    onLoad={() => setIframeLoaded(true)}
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
  ```

- **Transcript Container and Highlight Rendering**:
  ```typescript
                  <div 
                    className="transcript-container"
                    ref={transcriptContainerRef}
                    onMouseEnter={() => { isHoveringTranscriptRef.current = true; }}
                    onMouseLeave={() => { isHoveringTranscriptRef.current = false; }}
                  >
                    {transcriptData.map((line, idx) => {
                      const isActive = idx === activeLine;
                      
                      const formatTime = (secs: number) => {
                        const rounded = Math.round(secs);
                        const m = Math.floor(rounded / 60);
                        const s = rounded % 60;
                        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
                      };
                      
                      return (
                        <div
                          key={idx}
                          className={`transcript-line ${isActive ? 'active' : ''}`}
                          onClick={() => seekTo(line.time)}
                        >
                          <span className="transcript-timestamp">{formatTime(line.time)}</span>
                          <p className="transcript-text">{line.text}</p>
                        </div>
                      );
                    })}
                  </div>
  ```

---

## 5. Verification Method

To verify these changes after implementation, run the following steps:

1. **Verify R1 (Playback Event Syncing)**:
   - Play a lesson video. Verify the live transcript highlights corresponding lines in real-time.
   - Inject custom `postMessage` objects into the main window via browser DevTools Console to verify string vs object fallback parses:
     ```javascript
     // Check object fallback
     window.postMessage({ event: 'timeupdate', value: { seconds: 15 } }, '*');
     // Check stringified JSON fallback
     window.postMessage(JSON.stringify({ event: 'timeupdate', value: { seconds: 20 } }), '*');
     ```
   - Verify `currentTime` updates to 15s and 20s respectively.
   - Verify injecting `seconds: 0` resets current time to zero successfully.

2. **Verify R2 (Handshake & Lifecycle)**:
   - Check Console logs for error lines. Ensure no "PlayerJS registration failed" messages appear before the iframe finishes loading.
   - Emulate slow network conditions in DevTools and switch lessons. Verify that PlayerJS handshake is not dispatched prematurely.

3. **Verify R3 (State Reset on Lesson Switch)**:
   - Select Lesson 1 and play it until line highlights are active (e.g. Line 5).
   - Switch to Lesson 2.
   - Verify that the highlighted state is immediately cleared (active line returns to index `-1`) before the new transcript data loads.

4. **Verify R4 (Hover-Aware Smooth Auto-Scroll)**:
   - Play a video with the live transcript open. Ensure the transcript container automatically scrolls smoothly to center the active line.
   - Hover the mouse cursor over the transcript list. Ensure auto-scroll ceases completely, allowing you to read or scroll manually without layout snap-backs.
   - Move the mouse cursor out of the transcript container. Verify that the view does not jump immediately, but waits until the `activeLine` changes to center the new active line.
