# Project: Course Portal Transcript Fixes

## Architecture
- React / Next.js app router.
- Page: `src/app/ultimate-guide/portal/page.tsx`
- Integrates Player.js script to interface with Bunny Stream player iframe.
- Has an interactive transcript display synced with video playback, interactive worksheets.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Exploration | Deeply explore page.tsx, search for issues, design fixes for R1-R4 | None | DONE |
| 2 | M2: Implementation | Implement changes for R1, R2, R3, R4 in page.tsx, run `npm run build` | M1 | DONE |
| 3 | M3: Verification | Perform review, challenger checks, and forensic audit on build and logic | M2 | DONE |

## Interface Contracts
- Cross-origin message event payload must support both stringified JSON and direct objects.
- Active line highlight must reset to -1 when lesson switches.
- Auto-scroll must be disabled during active hover state on the transcript container.
