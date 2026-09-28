---
name: write-tests
description: Write, refactor, or review tests in a Remix 3 app. Use when adding or changing `.test.ts`/`.test.tsx`, `.test.browser.tsx`, or `.test.e2e.ts` files, test fixtures, mocks, the `test` script, or test-only dependencies.
---

# Write Tests

Adapted from the Remix monorepo's `write-tests` skill (`remix-run/remix/.agents/skills/write-tests`) for a standalone app that depends on the single `remix` package. Monorepo-specific guidance (workspace packages, `node:test` exception packages, `pnpm --filter`, workspace cycles) has been removed; the runner, structure, fixture, and assertion guidance is unchanged. The canonical reference is the installed guide at `node_modules/remix/guides/13-testing.md`.

## Overview

Write tests that prove behavior with the smallest useful fixture surface. Use `remix/test` and `remix/assert` with `describe`/`it` style, keep the dependency graph clean, and validate with the narrowest reliable commands.

## Workflow

1. Read `package.json`, `tsconfig.json`, and existing sibling tests before choosing a boundary or fixture style.
2. Choose the narrowest boundary that proves the behavior (see below).
3. Keep the test next to the behavior owner, e.g. `app/actions/controller.test.ts` beside `controller.tsx`. Prefer local helpers and direct Web/Node primitives over extra libraries as fixtures.
4. Put test-only packages (e.g. `playwright`) in `devDependencies`, never `dependencies`.
5. Run `pnpm test` and `pnpm typecheck`. Refresh `pnpm-lock.yaml` when package metadata changes.

## Choose the boundary

| Boundary               | Use it for                                                  | How                                              | File pattern                 |
| ---------------------- | ----------------------------------------------------------- | ------------------------------------------------ | ---------------------------- |
| Unit                   | A data helper, schema, or utility                           | Import it, call it, assert on the result         | `**/*.test.{ts,tsx}`         |
| Router                 | An action, response, middleware, session, or DB request     | `router.fetch(new URL(href, 'http://localhost'))` | `**/*.test.{ts,tsx}`         |
| Browser component      | A component event, DOM update, or browser API               | `render()` from `remix/ui/test`                  | `**/*.test.browser.{ts,tsx}` |
| End to end             | Navigation or a complete browser/server flow                | Router behind a test server, driven by Playwright | `**/*.test.e2e.{ts,tsx}`     |

A controller returning the wrong status belongs in a router test. A button that does not enter its pending state belongs in a browser component test. Browser and e2e runners need `playwright` in `devDependencies` plus `npx playwright install`.

## Runner

The `test` script is `remix test` (this starter sets `NODE_ENV=test remix test`). Imports:

```ts
import * as assert from 'remix/assert'
import { describe, it } from 'remix/test'
```

Router test:

```ts
import { router } from '../router.ts'
import { routes } from '../routes.ts'

describe('root controller', () => {
  it('GET / returns the home page', async () => {
    let response = await router.fetch(new URL(routes.home.href(), 'http://localhost'))
    assert.equal(response.status, 200)
  })
})
```

Browser component test:

```tsx
import { render } from 'remix/ui/test'

it('toggles an album as a favorite', async (t) => {
  let { $, act, cleanup } = render(<FavoriteButton albumTitle="Thriller" />)
  t.after(cleanup)
  let button = $('button')
  assert.ok(button instanceof HTMLButtonElement)
  await act(() => button.click())
  assert.equal(button.getAttribute('aria-pressed'), 'true')
})
```

Wrap any interaction that may call `handle.update()` or finish async component work in `act(...)`, and register `cleanup` with `t.after(...)` so it runs even when an assertion fails.

## Test Structure

- Write tests in `describe`/`it` style. When touching a file that uses top-level `test()`, convert the affected tests and leave unrelated tests alone.
- Name `describe()` blocks after the public API or behavior owner, and name `it()` tests by observable behavior.
- Do not generate tests inside `describe()` with loops or conditionals; this breaks per-test IDE execution.
- Prefer a few explicit cases over dense table tests when the cases document distinct behavior.
- Keep async tests awaited all the way through. Avoid resolving promises before the behavior under test has completed.
- Use mocks sparingly and locally, via the `remix/test` test context mocks.

## Fixtures

- Keep fixtures minimal and local to the test file unless they are reused across files for the same behavior surface.
- Avoid pulling in extra libraries just to build a fixture; a fetch-handler fixture can branch on `new URL(request.url).pathname`.
- Prefer Web APIs and standards-aligned primitives when they express the fixture clearly.
- Isolate stateful tests: when middleware supplies sessions, databases, or storage, export a `createAppRouter(options)` factory from `app/router.ts` beside the production `router`, and build a fresh test router per test with memory-backed infrastructure (e.g. `createMemorySessionStorage()` from `remix/session-storage/memory`).
- For e2e tests, serve the smallest app or handler that exercises the user-observable behavior.
- Close spawned processes, servers, and watchers in test cleanup.

## Assertions

- Use `remix/assert`.
- Assert public behavior and observable side effects (status, headers, rendered HTML, DOM state, ARIA attributes), not private implementation structure.
- For error tests, assert the error shape or message consumers can rely on.

## Validation

```sh
pnpm test
pnpm test -- --type server
pnpm test -- --type browser --project chromium
pnpm typecheck
pnpm install --frozen-lockfile
```

Type checking stays a separate command: the runner executes TypeScript but does not replace project-wide compiler checks.
