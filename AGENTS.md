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
- `app/ui/public/` holds the shared components, ported from shadcn/ui's shape, one module per `remix/ui` export: `Button`/`LinkButton`, `Input`/`InputGroup`/`InputGroupInput`, `Checkbox`, `Radio`, `Toggle`, `Accordion`/`AccordionItem`/`AccordionTrigger`/`AccordionContent`, `Tabs`/`TabList`/`Tab`/`TabPanel`, `Select`/`SelectOption`, `Combobox`/`ComboboxOption`, `Menu`/`MenuList`/`MenuItem`/`Submenu`, `Breadcrumbs`, `PopoverSurface`, and `ListboxList`/`ListboxOption`, plus `Container`, `Card`/`CardHeader`/`CardTitle`/`CardDescription`/`CardAction`/`CardContent`/`CardFooter`, `Field`/`TextField`/`Fieldset`/`CheckboxField`/`RadioField`/`ToggleField`, `Divider`, and `icons.tsx`
- Import these instead of the styled `remix/ui/*` components. Each keeps only the Remix behavior layer (`*/primitives` contexts and mixins, or a control's default-attrs mixin) and owns every style as `reset`, then `base`, then `variants[variant]`, then `sizes[size]`, then the caller's `mix`. Add a look by adding a key to that module's `variants` map, not by restyling at a call site
- `app/ui/public/text.ts` holds the text utility mixins: `fontXs` through `font2xl` plus `fontDisplay` (each sets a `tokens.fontSize` step and its paired `tokens.lineHeight` together), `fontMedium`, `fontSemibold`, `fontMono`, `textPrimary`, `textSecondary`, `truncate`, and `visuallyHidden`
- `app/ui/brand.tsx` holds the Remix wordmark
- `app/assets.ts` owns the server-side asset pipeline used by the asset route and render middleware
- Root `public/` contains static files served unchanged from the app root

## Styling

- Write `css()` inline in the `mix` prop: `mix={css({ display: 'grid', gap: tokens.space.lg })}`. Do not assign styles to module constants. The runtime caches rules by content, so an inline call adds no extra rules.
- Compose with arrays: `mix={[fontSm, textSecondary, css({ margin: 0 })]}`. Use `text.ts` utilities for type instead of setting `fontSize` or `lineHeight` by hand, and use `<code mix={[fontXs, fontMono, textSecondary]}>` or `<span mix={visuallyHidden}>` on plain elements. Do not wrap text in components.
- Text utilities are the only exported styles. When anything else is needed in more than one place, write a component in `app/ui/public/` and check the existing ones first.
- Build cards the shadcn way: `<Card>` contains `<CardHeader>` (with `<CardTitle>`, optional `<CardDescription>`, and an optional `<CardAction>` that sits in the top-right), then `<CardContent>`, then an optional `<CardFooter>`. Each part carries a `data-slot`, and callers add layout, such as a grid on `CardContent` or a border on `CardFooter`, through `mix`.
- A shared component destructures `mix` and the element props, then renders `mix={[css({...}), mix]}` so callers can extend it without replacing its styling.
- Build variant components the shadcn way, as in `button.tsx`. Import the `remix/ui` mixin for behavior, then mix in order: a `reset` that clears every property a variant could decide (background, color, border, radius, shadow, font, height, padding), a shared `base`, then `variants[variant]` and `sizes[size]`, and the caller's `mix` last. Every layer only adds styles, so callers never need to undo one. A variant component is the one place where `css()` maps are module constants.
- `Button` and `LinkButton` take `variant` (`default`, `secondary`, `outline`, `ghost`, `destructive`, `link`) and `size` (`sm`, `default`, `lg`, `icon`). Use `buttonVariants({ variant, size })` to give another element the same styles.
- Use `Button` and `LinkButton` rather than putting `button()` on elements, and the field components rather than `input()`, `checkbox()`, `radio()`, or `toggle()`. The one exception is `input.root()` and `input.field()` for an input with a leading icon.
- Use the `style` prop, not `css()`, for per-item dynamic values such as a swatch color.

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
