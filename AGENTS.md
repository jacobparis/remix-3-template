# Remix UI Agent Guide

This app was scaffolded with `remix new` and uses Remix 3 with `remix/ui`. Remix 3 is not React, React Router, or Remix 2. Components are setup functions that return render functions, styles attach through the `css()` mixin in the `mix` prop, and there is no bundler. Use these conventions when continuing to build it out.

## Commands

```sh
pnpm install
pnpm dev
pnpm run hmr
pnpm start
pnpm test
pnpm typecheck
```

Use `pnpm run hmr` for live server and browser updates; `pnpm dev` only watches and restarts the server. `pnpm start` runs in production mode without a separate build step.

## Building features

Refer to ./.agents/skills/remix/SKILL.md for the Remix mental model and how to find guides and API READMEs through `node_modules/remix/INDEX.md`.

Other skills in `.agents/skills/`:

- `author-ui-components` for building components with `remix/ui`
- `typescript-expert` for type design and `tsc` errors
- `write-tests` for `remix/test` and `remix/assert` tests in this app

## Starter layout

- `app/routes.ts` defines the shared route contract used by server and browser modules for type-safe hrefs
- `app/router.ts` wires routes to controllers and installs the standard Remix UI renderer used by actions
- Put top-level route actions in `app/actions/controller.tsx`; add `app/actions/<route-key>/controller.tsx` for nested route maps. `app/actions/controller.test.ts` is the root controller's router smoke test
- `app/actions/home-page.tsx` and `app/actions/document.tsx` render the route-owned starter UI. `document.tsx` loads Inter and JetBrains Mono and sets `color-scheme: light dark`
- `app/actions/public/` contains the browser runtime entry and the interactive `clientEntry` components
- `app/ui/public/tokens.ts` holds the values every `remix/ui` component is styled with; import these instead of hard-coding colors, spacing, or type sizes
- `app/ui/public/` holds the app's shared components: `Container`, `Card`/`CardHeader`/`CardFooter`, `Text`/`Caption`/`Code`/`VisuallyHidden`, `Field`/`TextField`/`Fieldset`/`CheckboxField`/`RadioField`/`ToggleField`, `Button`/`LinkButton`, and `Divider`
- `app/ui/brand.tsx` holds the Remix wordmark

## Share components, not styles

- Never export a `css()` constant or any other style value for reuse. Style constants stay private to the module that defines them.
- When a style is needed in more than one place, write a Remix 3 component in `app/ui/public/` that owns that style and export the component. Check the existing components there first.
- A shared component destructures `mix` and the element props, then renders `mix={[ownCss, mix]}` so callers can add layout, such as a grid column or a width, without replacing the component's own styling.
- Wrap `remix/ui` style helpers the same way: use `Button` and `LinkButton` rather than putting `button()` on elements directly, and the field components rather than `input()`, `checkbox()`, `radio()`, or `toggle()`.
- One-off layout for a single screen stays a private `css()` constant in that screen's file.
- `tokens.ts` is the one shared style module, and it holds values only.
- `app/assets.ts` owns the server-side asset pipeline used by the asset route and render middleware
- Root `public/` contains static files served unchanged from the app root

## Writing

Write sentence-case headings that state the customer-specific claim or answer the reader's question. A useful title says what happened, what changes, or what decision is needed. It does not name the report genre.

- Prefer concrete nouns and active verbs.
- Do not use em dashes.
- Avoid all-caps eyebrows, overlines, decorative section numbers, synthetic symmetry, repetitive cadence, generic praise, and internal authoring language.

## Reject generated-design reflexes

Do not ship any of these recognizable defaults:

- All-caps or tracked eyebrows, kickers, overlines, and decorative numbered section labels.
- Em dashes.
- Decorative gradients, glows, blobs, stripes, textures, glass, or ornamental shadows.
- Generic centered hero copy followed by a card grid.
- Repeated metric boxes when one composed relationship would be clearer.
- A badge, pill, or rounded capsule for ordinary metadata, chart annotations, or editorial labels.
- Cards nested inside cards, or borders used to repair weak hierarchy.
- A dark rounded rectangle around every chart or calculator.
- Arbitrary icon tiles, oversized icons, or mixed icon styles.
- Tiny muted prose, arbitrary font sizes, inconsistent peer values, or misaligned baselines. Use the `fontSize` tokens; 12px is the smallest text size.
- A narrow table floating inside a wide section, or a wide table compressed into broken words.
- Decorative charts, redundant visualizations, legends that replace direct labels, or color without meaning.
- Repeated full-width bars that do not share a scale or encode a visible difference.
- Identical section silhouettes across unrelated reader questions.
- Repeated recommendation, summary, rationale, and conclusion sections that say the same thing.
- Authoring-process narration such as how the page was organized, why a representation was chosen, or how source fields were renamed. Keep concise interpretive captions that state an evidence-led takeaway or limitation.
- Visible theme controls, print-only UI, stock imagery, fake screenshots, or decorative brand marks. The page follows the system theme through `light-dark()` tokens.
