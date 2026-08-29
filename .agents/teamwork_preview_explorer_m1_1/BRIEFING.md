# BRIEFING — 2026-07-14T16:26:10Z

## Mission
Analyze current video playback and transcript handling in the course portal, specifically `src/app/ultimate-guide/portal/page.tsx`, and recommend a detailed design/implementation plan to fix requirements R1-R4.

## 🔒 My Identity
- Archetype: Teamwork explorer
- Roles: Read-only investigator, analyzer
- Working directory: /Users/maurik/Documents/01 Projects/Programming/My website/.agents/teamwork_preview_explorer_m1_1/
- Original parent: 5c45b8d5-23ed-403d-b259-0b877f7cf54b
- Milestone: M1 Explorer

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- DO NOT modify any code files. Read only.
- DO NOT run any builds or tests.

## Current Parent
- Conversation ID: 5c45b8d5-23ed-403d-b259-0b877f7cf54b
- Updated: 2026-07-14T16:26:10Z

## Investigation State
- **Explored paths**:
  - `src/app/ultimate-guide/portal/page.tsx`
  - `.agents/orchestrator/PROJECT.md`
- **Key findings**:
  - R1: The message fallback listener discards raw object payloads because it requires a string payload type, and checks `secs > 0` which prevents resetting to `0`.
  - R2: Handshake starts early via direct `Player` instantiation inside polling without checking if iframe is fully loaded or bound to `onLoad`.
  - R3: `activeLine` is never explicitly set to `-1` when lesson switches, leading to ghost highlighted lines from the previous lesson.
  - R4: Auto-scroll has `isHoveringTranscript` as a dependency which triggers scroll jumping when mouse leaves. Also, the render mapping performs a `.reduce` inside the `.map` on every playback update, causing $O(N^2)$ computations and rendering lag.
- **Unexplored areas**: None, the scope is complete.

## Key Decisions Made
- Formulated a comprehensive design plan using React refs (`iframeRef`, `playerReadyRef`, `isHoveringTranscriptRef`) to decouple reactive states and resolve performance/lifecycle bugs without modifying target files.
- Documented findings and proposed code patches in `/Users/maurik/Documents/01 Projects/Programming/My website/.agents/teamwork_preview_explorer_m1_1/analysis.md`.

## Artifact Index
- /Users/maurik/Documents/01 Projects/Programming/My website/.agents/teamwork_preview_explorer_m1_1/analysis.md — Analysis and recommendation report
