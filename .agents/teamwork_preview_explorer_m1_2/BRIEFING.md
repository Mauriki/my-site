# BRIEFING — 2026-07-14T16:26:16Z

## Mission
Explore the Next.js course portal codebase and analyze current video playback and transcript handling to recommend a detailed design/implementation plan.

## 🔒 My Identity
- Archetype: Explorer
- Roles: Read-only investigator, analyzer, reporter
- Working directory: /Users/maurik/Documents/01 Projects/Programming/My website/.agents/teamwork_preview_explorer_m1_2/
- Original parent: 57f207c4-6809-445e-a44c-7f00b21cfd47
- Milestone: M1 Playback and Transcript Analysis

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- DO NOT modify any code files. Read only.
- DO NOT run any builds or tests.
- Operating in CODE_ONLY network mode.

## Current Parent
- Conversation ID: 57f207c4-6809-445e-a44c-7f00b21cfd47
- Updated: 2026-07-14T16:26:16Z

## Investigation State
- **Explored paths**:
  - `src/app/ultimate-guide/portal/page.tsx`
  - `.agents/orchestrator/PROJECT.md`
- **Key findings**:
  - **R1 Playback Event Sync**: String check `typeof event.data !== 'string'` ignores object payloads; playhead threshold `secs > 0` prevents syncing restarts to 0.
  - **R2 Handshake & Lifecycle**: Registering `timeupdate` inside `ready` causes race condition; player init must bind to iframe's native `onLoad` with robust polling and direct event subscriptions.
  - **R3 State Reset**: `activeLine` is not reset to `-1` when a user switches course lessons.
  - **R4 Auto-Scroll & Performance**: Container auto-scroll thrashes layout on hover-out because it runs even if the active line has not changed. Also, the transcript JSX rendering contains an $O(N^2)$ render bottleneck due to nested `reduce` loops.
- **Unexplored areas**: None.

## Key Decisions Made
- Use React `iframeRef` to eliminate DOM query.
- Propose direct event binding on the PlayerJS instance to avoid `ready` event timing issues.
- Introduce `lastScrolledLineRef` to skip redundant auto-scroll operations.
- Optimize JSX to use the pre-computed `activeLine` state, reducing complexity from $O(N^2)$ to $O(N)$ for rendering.

## Artifact Index
- /Users/maurik/Documents/01 Projects/Programming/My website/.agents/teamwork_preview_explorer_m1_2/analysis.md — Detailed analysis and recommendation report.
- /Users/maurik/Documents/01 Projects/Programming/My website/.agents/teamwork_preview_explorer_m1_2/handoff.md — Handoff report following the Handoff Protocol.
