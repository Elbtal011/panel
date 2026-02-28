# Management CRM Design Rules

Use this as the default style baseline for all new pages/components.

## Typography Scale
- Page title (`h1` in `.page-header`): `20px`
- Page subtitle (`.page-header p`): `14px`
- Section title (`h3` in cards/panels): `16px` to `18px`
- Body text: `14px`
- Secondary/meta text: `12px` to `13px`
- Never use oversized headings (`24px+`) inside normal panels/cards.

## Empty States
- Keep empty states simple and centered.
- Do not place decorative icons in the center empty-state area by default.
- Empty title should be `18px`, supporting text `14px`.

## Buttons
- Keep existing button variants:
  - Primary: `.btn.btn--dark`
  - Secondary: `.btn.btn--ghost`
  - Destructive: `.btn.btn--danger`
- Avoid adding custom one-off button styles unless required.

## Layout and Spacing
- Reuse existing structure:
  - `.page-header.page-header--wide`
  - `.panel.panel--wide`
  - `.review-toolbar` + `.search` for filter/search bars
- Use consistent spacing rhythm:
  - Section gap: `10px` to `18px`
  - Field gap: `6px` to `12px`
  - Border radius: `8px` to `12px`

## Inputs and Forms
- Inputs/selects in panels/modals should match existing style:
  - Height: `40px`
  - Border: `1px solid var(--ui-border)`
  - Radius: `8px` to `10px`
  - Font size: inherited (`14px` base)

## Icons
- Navigation/sidebar icons are allowed.
- Inline functional icons are allowed only when they improve clarity.
- Avoid decorative icons in middle content sections unless explicitly requested.

## Reuse First
- Before introducing new styles, check and reuse existing classes in `client/src/App.css`.
- Prefer consistency with `Stellenanzeigen`, `Aufgabenvorlagen`, `Caller`, and `Telefonnummern` pages.
