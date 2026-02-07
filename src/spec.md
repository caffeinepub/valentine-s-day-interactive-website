# Specification

## Summary
**Goal:** Make the AnimatedJar clearly visible and reliably styled on the Silver Hearts page on initial load.

**Planned changes:**
- Align `AnimatedJar` DOM class names with the existing jar-related CSS selectors in `frontend/src/index.css` so the jar body and lid render with the intended shapes, borders, and fills.
- Verify/adjust jar container positioning and stacking (e.g., `position`/`z-index`) so the jar stays above the page background and decorative heart effects across mobile and desktop viewports.
- Preserve existing SilverHeartsPage jar interactions (open-on-first-click with burst hearts, temporary non-clickable during lid animation, subsequent clicks showing messages and eventually fireworks).

**User-visible outcome:** On SilverHeartsPage, the jar is immediately visible (light/dark mode), stays on top of background effects, and continues to behave the same when clicked (open + burst hearts, then messages, then fireworks).
