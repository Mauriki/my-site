# Codebase Analysis & Recommendation Report: Course Portal Transcript & Playback Fixes

**Author**: M1 Explorer 2  
**Date**: 2026-07-14  
**Target File**: `src/app/ultimate-guide/portal/page.tsx`  
**Working Directory**: `/Users/maurik/Documents/01 Projects/Programming/My website/.agents/teamwork_preview_explorer_m1_2/`

---

## Executive Summary

A comprehensive read-only investigation of the Next.js course portal page (`src/app/ultimate-guide/portal/page.tsx`) was conducted to diagnose issues regarding:
1. **Playback syncing (R1)**: Support for object-based and stringified postMessage payloads, and correct playhead reset behavior.
2. **Lifecycle management (R2)**: Handling race conditions in PlayerJS handshake and event listener registrations.
3. **Lesson state resets (R3)**: Resetting the active transcript line highlight upon lesson switch.
4. **Scroll & Rendering Performance (R4)**: Eliminating layout thrashing during hover changes and fixing an $O(N^2)$ rendering bottleneck.

This report outlines the observations, underlying root causes, a detailed design/implementation plan with code patches, and verification methods.

---

## Detailed Analysis of Current Implementation

### R1. Robust Iframe Playback Event Syncing
- **Observation**:
  - In `page.tsx` lines 453–482:
    ```typescript
    useEffect(() => {
      const handleMessage = (event: MessageEvent) => {
        if (typeof event.data !== 'string') return;
        try {
          const parsed = JSON.parse(event.data);
          if (parsed && parsed.event === 'timeupdate') {
            let secs = 0;
            if (typeof parsed.value === 'number') {
              secs = parsed.value;
            } ...
            if (secs > 0) {
              setCurrentTime(secs);
            }
          }
        } catch {
          // Silently skip non-JSON messages
        }
      };
      window.addEventListener('message', handleMessage);
      return () => { window.removeEventListener('message', handleMessage); };
    }, []);
    ```
- **Root Cause & Issues**:
  1. **Strict String Check**: The listener immediately rejects any `event.data` that is not a string (`typeof event.data !== 'string'`). Modern browsers or postMessage wrappers often clone objects directly, delivering them as `object`. This prevents syncing for non-stringified events.
  2. **Non-Zero Playhead Threshold**: The check `if (secs > 0)` prevents the UI playhead from resetting to `0` if the video is restarted or loops back, because `0` is not greater than `0`.
  3. **No Origin Filtering**: While not strictly a bug, checking data shape without origin filtering is acceptable but can be made safer by verifying the payload format.

---

### R2. Handshake Timing & Lifecycle Management
- **Observation**:
  - In `page.tsx` lines 409–450:
    ```typescript
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
            clearInterval(interval);
          } catch (err) { ... }
        }
      };
      initPlayer();
      const interval = setInterval(initPlayer, 1000);
      return () => {
        clearInterval(interval);
        playerRef.current = null;
        if (player) { try { player.off('timeupdate'); } catch {} }
      };
    }, [activeIdx]);
    ```
- **Root Cause & Issues**:
  1. **Handshake Sent Too Early (Lost Message)**: PlayerJS is initialized unconditionally via `setInterval(initPlayer, 1000)`. If the script executes before the iframe's content window is ready to receive messages, the handshake sent by `new Player(iframe)` is lost.
  2. **Race Condition on 'ready' Event**: The `timeupdate` event listener is registered inside the `ready` event callback. If the iframe finishes loading and sends its `ready` postMessage *before* PlayerJS binds the `ready` listener on the parent window, the `ready` callback never fires, and the `timeupdate` listener is never registered.
  3. **No native onLoad binding**: The code relies entirely on a polling timer (`setInterval`) and DOM selection (`querySelector`), which is inefficient and prone to timing inconsistencies.

---

### R3. State Reset on Lesson Switch
- **Observation**:
  - In `page.tsx` lines 390–406:
    ```typescript
    useEffect(() => {
      setTranscriptData(null);
      setCurrentTime(0);
      fetch(`/transcripts/lesson${activeIdx + 1}.json`)
        .then((res) => { ... })
        .then((data) => { setTranscriptData(data); })
        .catch(() => { setTranscriptData(null); });
    }, [activeIdx]);
    ```
- **Root Cause & Issues**:
  - When the lesson changes, `activeIdx` is updated. While `currentTime` and `transcriptData` are reset, the `activeLine` state is **not** reset to `-1`.
  - As a result, the UI will continue to highlight the active line from the *previous* lesson at its last position until the new lesson's transcript is fetched and the new playhead starts playing, creating a broken visual state.

---

### R4. Hover-Aware Smooth Auto-Scrolling
- **Observation**:
  - In `page.tsx` lines 502–517:
    ```typescript
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
  - In `page.tsx` lines 716–718:
    ```typescript
    {transcriptData.map((line, idx) => {
      const isActive = idx === transcriptData.reduce((acc, curr, i) => {
        return currentTime >= curr.time ? i : acc;
      }, -1);
      ...
    ```
- **Root Cause & Issues**:
  1. **Layout Thrashing on Hover-Out**: Because `isHoveringTranscript` is listed in the dependency array, when a user leaves the transcript area (`isHoveringTranscript` becomes `false`), the effect fires. This recalculates container height, line offsets, and triggers a `scrollTo` call, even if the active line hasn't changed.
  2. **Rendering Bottleneck ($O(N^2)$ complexity)**: Inside the transcript map, `reduce` is executed for *every* line during render to find the active line index. If the transcript has $N$ lines, this runs $N^2$ iterations on every single state update. Since `currentTime` updates multiple times a second, this creates massive rendering lag.

---

## Detailed Design & Implementation Plan

### Recommended Code Modifications

#### 1. Add `iframeRef` and Iframe Load Callback
Declare a React ref for the iframe and track the initialization status:
```typescript
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerInitAttempted = useRef<string | null>(null);
  const lastScrolledLineRef = useRef<number>(-1);
```

#### 2. Refactor PlayerJS Initialization (R2)
Implement a robust initialization that handles native `onLoad` triggers, polling fallback, and direct `timeupdate` binding:
```typescript
  const initPlayer = () => {
    // If the player for this specific lesson is already initialized, do nothing
    if (playerInitAttempted.current === currentLecture.videoSrc && playerRef.current) {
      return;
    }

    const iframe = iframeRef.current;
    if (iframe && typeof window !== 'undefined' && (window as unknown as WindowWithPlayerJS).playerjs) {
      try {
        // Clean up previous player reference
        if (playerRef.current) {
          try {
            playerRef.current.off('timeupdate');
          } catch {}
          playerRef.current = null;
        }

        // Initialize new PlayerJS instance
        const activePlayer = new (window as unknown as WindowWithPlayerJS).playerjs!.Player(iframe);
        playerRef.current = activePlayer;
        playerInitAttempted.current = currentLecture.videoSrc;

        // Register timeupdate immediately on the playerjs instance (no need to wait for 'ready')
        activePlayer.on('timeupdate', (data: unknown) => {
          let secs = -1;
          if (data && typeof data === 'object') {
            if (typeof (data as { seconds?: number }).seconds === 'number') {
              secs = (data as { seconds: number }).seconds;
            }
          } else if (typeof data === 'number') {
            secs = data;
          }
          if (secs >= 0) {
            setCurrentTime(secs);
          }
        });
      } catch (err) {
        console.error("PlayerJS initialization failed", err);
      }
    }
  };

  const handleIframeLoad = () => {
    initPlayer();
  };
```

Bind this to a `useEffect` managing lesson changes to reset states and run the polling loop:
```typescript
  useEffect(() => {
    playerInitAttempted.current = null;
    initPlayer(); // Try immediately

    // Polling backup
    const interval = setInterval(() => {
      if (!playerRef.current) {
        initPlayer();
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      if (playerRef.current) {
        try {
          playerRef.current.off('timeupdate');
        } catch {}
        playerRef.current = null;
      }
    };
  }, [activeIdx]);
```

#### 3. Update broad window message handler for R1 & R2 Ready Detection
Handle both parsed object payloads and stringified payloads:
```typescript
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      let data = event.data;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch {
          return; // Skip invalid JSON
        }
      }

      if (!data || typeof data !== 'object') return;

      // R2: Initialize PlayerJS as soon as the iframe player script signals it is ready
      if (data.event === 'ready') {
        initPlayer();
        return;
      }

      // R1: Robust check for timeupdate in various shapes
      const isTimeUpdate = data.event === 'timeupdate' || data.method === 'timeupdate';
      if (isTimeUpdate) {
        let secs = -1;
        if (typeof data.value === 'number') {
          secs = data.value;
        } else if (data.value && typeof data.value.seconds === 'number') {
          secs = data.value.seconds;
        } else if (data.data && typeof data.data.seconds === 'number') {
          secs = data.data.seconds;
        } else if (typeof data.seconds === 'number') {
          secs = data.seconds;
        }

        if (secs >= 0 && !isNaN(secs)) {
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

#### 4. Reset Active Line on Lesson Switch (R3)
Modify the lesson switch effect to cleanly reset `activeLine` and the scroll ref:
```typescript
  // Load transcript data when active lesson changes
  useEffect(() => {
    setTranscriptData(null);
    setCurrentTime(0);
    setActiveLine(-1); // Reset active line highlight state cleanly to -1
    lastScrolledLineRef.current = -1; // Reset last scrolled line tracker
    fetch(`/transcripts/lesson${activeIdx + 1}.json`)
      .then((res) => {
        if (res.ok) return res.json();
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

#### 5. Smooth Auto-Scrolling and Performance Refactoring (R4)
Refactor the auto-scroll `useEffect` to use a `lastScrolledLineRef` and return early if the active line has not changed:
```typescript
  // Auto-scroll transcript container only when activeLine changes and user is not reading/hovering
  useEffect(() => {
    if (showTranscript && activeLine !== -1 && transcriptContainerRef.current) {
      if (isHoveringTranscript) {
        return; // Don't scroll while hovering
      }

      if (activeLine === lastScrolledLineRef.current) {
        return; // Avoid redundant layout calculations
      }

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
        
        lastScrolledLineRef.current = activeLine; // Track scroll index
      }
    }
  }, [activeLine, showTranscript, isHoveringTranscript]);
```

Optimize the JSX to avoid the $O(N^2)$ render bottleneck by using the precalculated state:
```typescript
  // In JSX mapping transcript lines (around line 715–738):
  {transcriptData.map((line, idx) => {
    // R4 Optimization: O(1) active state lookup instead of O(N) reduce per line
    const isActive = idx === activeLine;
    ...
```

And update the iframe container to use the `iframeRef` and `onLoad`:
```typescript
  <iframe
    ref={iframeRef}
    key={currentLecture.videoSrc}
    src={`${currentLecture.videoSrc}&api=true`}
    title={currentLecture.title}
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
    allowFullScreen
    referrerPolicy="strict-origin-when-cross-origin"
    onLoad={handleIframeLoad}
  />
```

Also, update `seekTo` to use the `iframeRef`:
```typescript
  const seekTo = (seconds: number) => {
    if (playerRef.current) {
      try {
        playerRef.current.setCurrentTime(seconds);
        playerRef.current.play();
        return;
      } catch (err) {
        console.error("PlayerJS seek failed, falling back to postMessage", err);
      }
    }
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        JSON.stringify({
          context: 'player.js',
          method: 'setCurrentTime',
          value: seconds
        }),
        '*'
      );
      iframe.contentWindow.postMessage(
        JSON.stringify({
          context: 'player.js',
          method: 'play'
        }),
        '*'
      );
    }
  };
```

---

## 5-Component Investigation & Handoff Report

### 1. Observation
- Direct code paths inspected:
  - `src/app/ultimate-guide/portal/page.tsx`
  - Playback listener: lines 453–482
  - PlayerJS instantiation: lines 409–450
  - Lesson loader: lines 390–406
  - Auto-scroll handler: lines 502–517
  - JSX rendering bottleneck: lines 716–718
- Verbatim code snippets and issues:
  - String check: `if (typeof event.data !== 'string') return;` ignores object payloads.
  - Zero playhead threshold: `if (secs > 0)` prevents resets to 0.
  - Nested event handler: `activePlayer.on('ready', () => { activePlayer.on('timeupdate', ... ) })` introduces a timing race condition where `timeupdate` is never registered if `ready` has already fired.
  - No `activeLine` reset on lesson switch: the loader `useEffect` does not clear `activeLine`.
  - Auto-scroll layout thrashing on hover-out: the effect fires and recalculates layout properties whenever `isHoveringTranscript` changes, even if `activeLine` remains unchanged.
  - JSX render loop: `isActive = idx === transcriptData.reduce(...)` causes $O(N^2)$ iterations inside the map.

### 2. Logic Chain
1. By changing `typeof event.data !== 'string'` to check for both strings and parsed objects, the message handler becomes robust against all variations of postMessage payloads (R1).
2. By allowing `secs >= 0` instead of `secs > 0`, the playhead can successfully sync and restart at 0 seconds (R1).
3. By binding player initialization to the iframe's native `onLoad` event, we guarantee the window is ready. By using a 1-second interval backup that stops once `playerRef.current` is set, we handle cases where the PlayerJS library finishes loading after the iframe. Additionally, listening for the iframe's `ready` postMessage lets us initialize immediately (R2).
4. By registering the `timeupdate` listener directly on the `activePlayer` instead of nesting it in the `ready` event, we eliminate the race condition where `ready` fires before the parent listener binds (R2).
5. By calling `setActiveLine(-1)` and resetting the scroll tracker ref when `activeIdx` changes, the highlighted active line is cleared immediately when switching lessons, preventing visual artifacts (R3).
6. By tracking the last scrolled line in a ref (`lastScrolledLineRef`) and comparing `activeLine === lastScrolledLineRef.current`, we only trigger a layout query and `scrollTo` operation when a *new* line becomes active. This stops layout thrashing when mouse hover states change (R4).
7. By replacing the nested `reduce` with a direct comparison to `activeLine` inside the JSX rendering map, rendering complexity drops from $O(N^2)$ to $O(N)$ (constant lookup per line), eliminating CPU spike during playback updates (R4).

### 3. Caveats
- Since this is a read-only investigation, code modifications have not been applied.
- The Bunny Stream player's behavior is assumed to match standard Player.js protocol definitions, which has been verified through their documentation and existing code logic.
- We assumed the project uses standard React/Next.js client-side rendering mechanics for `page.tsx` elements.

### 4. Conclusion
The proposed plan offers an elegant, zero-overhead solution to all four target problems (R1–R4) in `src/app/ultimate-guide/portal/page.tsx`. It fixes critical race conditions, adds missing state resets, handles all cross-origin payloads, and drastically reduces rendering overhead from $O(N^2)$ to $O(N)$ while preventing layout thrashing.

### 5. Verification Method
1. **Inspecting Source Code**:
   - Check that `iframeRef` is properly attached to the iframe in the JSX.
   - Verify that the message listener successfully handles object payloads and stringified payloads.
   - Verify that `setActiveLine(-1)` is called when changing lessons.
   - Verify that `activeLine === lastScrolledLineRef.current` check prevents scroll calls during hover shifts.
2. **Build and Test Verification**:
   - Once the changes are applied by the implementer agent, compile the app with `npm run build` to verify Next.js compiles without type or layout errors.
   - Test interaction in the browser: hover over the transcript during video play, click other lessons, and check that the highlighting matches playback perfectly.
