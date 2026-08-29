# Original User Request

## Initial Request — 2026-07-14T18:24:17+02:00

Resolve all issues with video transcript syncing, active line highlighting, and scroll glitching in the Next.js course portal.

Working directory: /Users/maurik/Documents/01 Projects/Programming/My website
Integrity mode: development

## Requirements

### R1. Robust Iframe Playback Event Syncing
Update the playback message event listener in `src/app/ultimate-guide/portal/page.tsx` to handle both string and object data payloads sent by the Bunny Stream player iframe via cross-origin postMessage. Ensure that player playback events successfully update the `currentTime` state.

### R2. Handshake Timing & Lifecycle Management
Bind the PlayerJS initialization to the iframe's native `onLoad` event (and maintain a robust polling backup). This ensures that the PlayerJS handshake is not sent before the player script inside the iframe is fully loaded.

### R3. State Reset on Lesson Switch
Reset the `activeLine` highlight state cleanly to `-1` when a user switches between course lessons, preventing visual highlights from getting stuck on obsolete line indexes.

### R4. Hover-Aware Smooth Auto-Scrolling
Disable the transcript container's auto-scroll behavior when a user is reading or hovering (`onMouseEnter`/`onMouseLeave`) over the transcript container, preventing layout jumping. Only scroll the container when the active line index changes to avoid constant sub-second layout calculations.

## Acceptance Criteria

### Highlighting and Scroll Mechanics
- [ ] Playing the video updates the active transcript sentence line highlight in real-time.
- [ ] Hovering over the transcript container pauses the auto-scrolling behavior.
- [ ] Moving out of the transcript container resumes smooth auto-scrolling to the active playing line.
- [ ] Switching lessons resets the active highlight to the beginning (00:00).
- [ ] The Next.js production build (`npm run build`) runs cleanly without TypeScript or ESLint compile warnings.
