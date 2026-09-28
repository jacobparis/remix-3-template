import { clientEntry, css, on } from 'remix/ui'
import type { Handle } from 'remix/ui'
import input from 'remix/ui/input'
import { Menu, MenuItem } from 'remix/ui/menu'
import { onMenuSelect } from 'remix/ui/menu/primitives'

import { Card, CardAction, CardContent, CardHeader, CardTitle } from '../../ui/public/card.tsx'
import {
  fontMedium,
  fontMono,
  fontSm,
  fontXs,
  textSecondary,
  truncate,
  visuallyHidden,
} from '../../ui/public/text.ts'
import { componentStyleValues as tokens } from '../../ui/public/tokens.ts'

type Status = 'ready' | 'building' | 'error'

const deployments: { id: string; branch: string; message: string; age: string; status: Status }[] =
  [
    { id: 'dpl_8f2k', branch: 'main', message: 'Add checkout frame', age: '2m', status: 'building' },
    { id: 'dpl_7c1q', branch: 'main', message: 'Session middleware', age: '1h', status: 'ready' },
    { id: 'dpl_6a9z', branch: 'feat/search', message: 'Combobox filters', age: '3h', status: 'error' },
    { id: 'dpl_5r3t', branch: 'main', message: 'Upgrade to rc.3', age: '1d', status: 'ready' },
  ]

const statusColor: Record<Status, string> = {
  ready: 'light-dark(#1f9d55, #6fdc8c)',
  building: 'light-dark(#b7791f, #ffdf5f)',
  error: tokens.colors.action.danger.background,
}

export const Deployments = clientEntry(import.meta.url, function Deployments(handle: Handle) {
  let query = ''
  let lastAction = ''

  return () => {
    let visible = deployments.filter((deployment) =>
      `${deployment.branch} ${deployment.message}`.toLowerCase().includes(query.toLowerCase()),
    )

    return (
      <Card aria-labelledby="deployments-title">
        <CardHeader>
          <CardTitle id="deployments-title">Deployments</CardTitle>
          <CardAction>
            <Menu
              label="Actions"
              mix={onMenuSelect((event) => {
                lastAction = event.item.label
                void handle.update()
              })}
            >
              <MenuItem name="redeploy">Redeploy latest</MenuItem>
              <MenuItem name="promote">Promote to production</MenuItem>
              <MenuItem name="logs">View build logs</MenuItem>
              <MenuItem disabled name="rollback">
                Roll back
              </MenuItem>
            </Menu>
          </CardAction>
        </CardHeader>
        <CardContent mix={css({ display: 'grid', gap: tokens.space.lg })}>
          <div mix={input.root()}>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="4.75" stroke="currentColor" stroke-width="1.5" />
              <path d="m10.5 10.5 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <input
              aria-label="Filter deployments"
              mix={[
                input.field(),
                on('input', (event) => {
                  query = event.currentTarget.value
                  void handle.update()
                }),
              ]}
              placeholder="Filter by branch or message"
            />
          </div>
          <ul mix={css({ listStyle: 'none', margin: 0, padding: 0, display: 'grid' })}>
            {visible.map((deployment) => (
              <li
                key={deployment.id}
                mix={css({
                  display: 'flex',
                  alignItems: 'center',
                  gap: tokens.space.md,
                  paddingBlock: '10px',
                  borderBlockEnd: `1px solid ${tokens.colors.border.subtle}`,
                  '&:last-child': { borderBlockEnd: 0 },
                })}
              >
                <span
                  aria-hidden="true"
                  mix={css({
                    flex: '0 0 8px',
                    width: '8px',
                    height: '8px',
                    borderRadius: tokens.radius.full,
                  })}
                  style={{ background: statusColor[deployment.status] }}
                />
                <span mix={css({ display: 'grid', flex: '1 1 auto', minWidth: 0 })}>
                  <span mix={[fontSm, fontMedium, truncate]}>{deployment.message}</span>
                  <code mix={[fontXs, fontMono, textSecondary, truncate]}>
                    {deployment.branch} · {deployment.id}
                  </code>
                </span>
                <code mix={[fontXs, fontMono, textSecondary]}>
                  <span mix={visuallyHidden}>{deployment.status}, </span>
                  {deployment.age}
                </code>
              </li>
            ))}
            {visible.length === 0 ? (
              <li mix={[fontSm, textSecondary]}>No deployments match.</li>
            ) : null}
          </ul>
          <p aria-live="polite" mix={[fontSm, textSecondary, css({ margin: 0 })]}>
            {lastAction ? `Selected: ${lastAction}` : 'Pick an action from the menu.'}
          </p>
        </CardContent>
      </Card>
    )
  }
})
