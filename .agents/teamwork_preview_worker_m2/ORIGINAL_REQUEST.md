## 2026-07-14T16:26:35Z
You are M2 Worker. Your working directory is `/Users/maurik/Documents/01 Projects/Programming/My website/.agents/teamwork_preview_worker_m2/`.

Objective:
Implement the proposed fixes for requirements R1, R2, R3, and R4 in `src/app/ultimate-guide/portal/page.tsx` based on the synthesized design plan.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Key Requirements to Implement:
1. **R1 (Robust Iframe Playback Event Syncing)**: Update fallback message listener in `src/app/ultimate-guide/portal/page.tsx` to handle stringified JSON and object data payloads, and update `currentTime` if `secs >= 0` (instead of `secs > 0`).
2. **R2 (Handshake Timing & Lifecycle Management)**: Bind the PlayerJS initialization to the iframe's native `onLoad` event with a robust polling backup (e.g. 1500ms or 3000ms delay/timeout if onLoad fails to trigger). Make sure handshake is not sent before iframe script is loaded.
3. **R3 (State Reset on Lesson Switch)**: Cleanly reset `activeLine` to `-1` when a user switches lessons (on `activeIdx` changes).
4. **R4 (Hover-Aware Smooth Auto-Scrolling)**: Use a ref `isHoveringTranscriptRef` to track hover state (`onMouseEnter`/`onMouseLeave`) to avoid auto-scroll triggering on mouse leave. Only trigger scrolling when `activeLine` or `showTranscript` changes. Also, optimize the render JSX from $O(N^2)$ `.reduce` to a simple $O(N)$ comparison: `idx === activeLine`.

Verification & Compilation:
- You MUST run `npm run build` and `npm run lint` inside the working directory `/Users/maurik/Documents/01 Projects/Programming/My website` to verify there are NO TypeScript or ESLint warnings or errors.
- Document the commands, outputs, and build log in your handoff file.

Output:
- Write `handoff.md` in your working directory containing:
  1. Detailed summary of code modifications.
  2. Output/results of `npm run build` and `npm run lint`.
  3. Path to the modified file.
- Send a message to parent (id: `57f207c4-6809-445e-a44c-7f00b21cfd47`) with the path to `handoff.md` and verification status.
