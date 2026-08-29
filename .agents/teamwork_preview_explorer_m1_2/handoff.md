# Handoff Report: Course Portal Transcript & Playback Fixes

**Author**: M1 Explorer 2  
**Date**: 2026-07-14  
**Target File**: `src/app/ultimate-guide/portal/page.tsx`  
**Working Directory**: `/Users/maurik/Documents/01 Projects/Programming/My website/.agents/teamwork_preview_explorer_m1_2/`

---

## 1. Observation
I directly inspected `src/app/ultimate-guide/portal/page.tsx` and observed the following:
* **R1: postMessage event handling (lines 454–482)**:
  * String filtering: `if (typeof event.data !== 'string') return;` at line 455.
  * Strict greater-than-zero check: `if (secs > 0) { setCurrentTime(secs); }` at line 469.
* **R2: PlayerJS initialization and timing (lines 409–450)**:
  * Polling interval registration: `const interval = setInterval(initPlayer, 1000);` at line 439.
  * Nested ready check:
    ```typescript
    activePlayer.on('ready', () => {
      activePlayer.on('timeupdate', (data: unknown) => { ... });
    });
    ```
    at lines 420–427.
* **R3: Lesson switches (lines 390–406)**:
  * Lesson loader effect does not reset `activeLine` to `-1` when `activeIdx` changes.
* **R4: Auto-scrolling and rendering (lines 502–517 and 716–718)**:
  * Auto-scroll dependencies: `[activeLine, showTranscript, isHoveringTranscript]` at line 517.
  * $O(N^2)$ render logic inside the JSX map:
    ```typescript
    const isActive = idx === transcriptData.reduce((acc, curr, i) => {
      return currentTime >= curr.time ? i : acc;
    }, -1);
    ```
    at lines 716–718.

---

## 2. Logic Chain
1. **Handling direct object postMessage payloads**: Removing the strict string check and parsing the message conditionally allows handling both object and stringified JSON formats. Changing the playhead threshold from `secs > 0` to `secs >= 0` ensures it can register playhead updates back to 0. (Supports R1).
2. **Preventing PlayerJS handshake failures**: Binding the initialization to the iframe's native `onLoad` event guarantees the frame window exists. Extracting the initialization and setting up a polling fallback ensures playerjs is initialized even if the playerjs library script is lazy-loaded after the iframe. Listening to the iframe's `ready` event directly in the postMessage handler allows immediate, reliable binding. (Supports R2).
3. **Resolving PlayerJS ready race condition**: Registering the `timeupdate` listener directly on the active player instance rather than nesting it within `ready` guarantees that time updates are received even if the ready event fired before the parent bound its listener. (Supports R2).
4. **Visual highlight consistency on lesson switch**: Explicitly calling `setActiveLine(-1)` and resetting the last scrolled line ref upon lesson switch ensures the UI cleans up previous states. (Supports R3).
5. **Preventing layout thrashing**: Using `lastScrolledLineRef` to track the last scrolled position and returning early if `activeLine === lastScrolledLineRef.current` ensures no scroll queries or operations run on hover-out. (Supports R4).
6. **Optimizing render performance**: Changing the JSX line highlight checking to a direct `idx === activeLine` comparison removes the $O(N^2)$ nested `reduce` loop, dropping render complexity to $O(N)$ for the map. (Supports R4).

---

## 3. Caveats
- No caveats: The investigation was purely read-only and code-level. No third-party API behavioral changes are expected since this matches standard PlayerJS specs.

---

## 4. Conclusion
The proposed plan provides a concrete, zero-dependency, and highly optimized set of changes to `src/app/ultimate-guide/portal/page.tsx` that will resolve the playback syncing, lifecycle, state reset, and scroll performance issues.

---

## 5. Verification Method
1. **File Inspection**: Verify that all recommended modifications in `analysis.md` (e.g. `iframeRef`, `handleIframeLoad`, `lastScrolledLineRef`, postMessage conditional parser) are integrated.
2. **Manual Test Procedure**:
   * Switch lessons: verify that the transcript highlight resets to `-1` instantly.
   * Play video: verify the transcript scrolls automatically.
   * Hover over transcript: verify that the transcript does NOT scroll.
   * Hover out: verify it scrolls only if the active line changed, and does not thrash.
   * Restart video: verify the transcript highlight updates correctly back to the 0-second mark.
