# Handoff Report: Course Portal Transcript Analysis

This is the M1 Explorer handoff report detailing the analysis and proposed solutions for requirements R1 through R4 in the Next.js course portal page (`src/app/ultimate-guide/portal/page.tsx`).

The full, detailed analysis and recommended design/patch can be found in `analysis.md` inside this directory:
`/Users/maurik/Documents/01 Projects/Programming/My website/.agents/teamwork_preview_explorer_m1_1/analysis.md`

## 1. Observation
*   **R1. Robust Iframe Playback Event Syncing:** The fallback `postMessage` listener (lines 453-482) exits early if the message payload is not a string (`typeof event.data !== 'string'`). Bunny Stream player can send raw object payloads. The listener also only syncs if `secs > 0`, ignoring resetting to `0` during video restart/seek.
*   **R2. Handshake Timing & Lifecycle Management:** The player initialization `useEffect` (lines 409-450) runs a polling interval that immediately instantiates `new playerjs.Player(iframe)` which sends a handshake message (`ping`) to the iframe. This happens before the iframe's internal document or player script is fully loaded, causing the handshake to be ignored.
*   **R3. State Reset on Lesson Switch:** When switching lessons, `activeIdx` changes, and the `useEffect` on lines 389-406 loads the new transcript and resets `currentTime` to 0. However, `activeLine` is never reset to `-1`. Since `transcriptData` is `null` during load, the auto-calculation effect exits early, causing the highlighted line from the previous lesson to persist visually (ghost highlight).
*   **R4. Hover-Aware Smooth Auto-Scrolling:** The auto-scroll effect (lines 501-517) has `isHoveringTranscript` in its dependency array, which triggers a scroll jump immediately when the mouse leaves. Additionally, the JSX mapping for transcript lines calculates `isActive` via an $O(N)$ `.reduce` operation inside the `.map` function, leading to $O(N^2)$ rendering complexity on every playback update.

## 2. Logic Chain
*   To solve **R1**, parse the event payload based on type (`string` vs `object`) and check `secs >= 0` to enable syncing at 0 seconds.
*   To solve **R2**, use a ref to the iframe (`iframeRef`) and hook into the iframe's native `onLoad` handler to trigger PlayerJS initialization, backed by a slow polling retry interval (e.g. 1500ms) only when `playerReady` is false.
*   To solve **R3**, call `setActiveLine(-1)` immediately inside the lesson change effect.
*   To solve **R4**, move the hover state to a React ref (`isHoveringTranscriptRef`) to exclude it from the auto-scroll dependency array, ensuring auto-scroll only fires when the active line transitions. To fix rendering performance, replace the nested `.reduce` check with a direct comparison: `isActive = idx === activeLine`.

## 3. Caveats
*   No code changes were written to the codebase, and no builds/tests were run, in accordance with the read-only constraint.
*   Assumes standard PlayerJS API availability on `window.playerjs` and that the Bunny Stream player iframe URL contains the `api=true` parameter.

## 4. Conclusion
*   Implement the proposed patch from `analysis.md` which resolves all four issues cleanly by utilizing React refs and decoupling scroll dependencies, boosting rendering performance from $O(N^2)$ to $O(1)$ comparisons per line.

## 5. Verification Method
*   Mock `postMessage` calls with JSON strings and objects (and 0-second payloads) to test R1.
*   Perform rapid lesson switches to test R2 and verify no handshake timeouts or broken bindings.
*   Switch lessons after scroll-highlighting a line to verify R3 (immediate reset to `-1`).
*   Hover over the transcript box during playback and verify auto-scroll pauses, and does not jump when mouse leaves to verify R4.
*   Run `npm run build` once the changes are applied by the implementer.
