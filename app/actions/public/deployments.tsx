import { clientEntry, css, on } from 'remix/ui'
import type { Handle } from 'remix/ui'
import input from 'remix/ui/input'
import { Menu, MenuItem } from 'remix/ui/menu'
import { onMenuSelect } from 'remix/ui/menu/primitives'

import { cardStyle, cardTitleStyle, monoFont, mutedTextStyle } from '../../ui/public/styles.ts'
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
      <section mix={cardStyle} aria-labelledby="deployments-title">
        <div mix={headerStyle}>
          <h3 mix={cardTitleStyle} id="deployments-title">
            Deployments
          </h3>
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
        </div>
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
        <ul mix={listStyle}>
          {visible.map((deployment) => (
            <li key={deployment.id} mix={rowStyle}>
              <span
                aria-hidden="true"
                mix={dotStyle}
                style={{ background: statusColor[deployment.status] }}
              />
              <span mix={rowTextStyle}>
                <span mix={messageStyle}>{deployment.message}</span>
                <span mix={metaStyle}>
                  {deployment.branch} · {deployment.id}
                </span>
              </span>
              <span mix={metaStyle}>
                <span mix={srOnly}>{deployment.status}, </span>
                {deployment.age}
              </span>
            </li>
          ))}
          {visible.length === 0 ? <li mix={mutedTextStyle}>No deployments match.</li> : null}
        </ul>
        <p mix={mutedTextStyle} aria-live="polite">
          {lastAction ? `Selected: ${lastAction}` : 'Pick an action from the menu.'}
        </p>
      </section>
    )
  }
})

const headerStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens.space.md,
})

const listStyle = css({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
})

const rowStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.space.md,
  paddingBlock: '10px',
  borderBlockEnd: `1px solid ${tokens.colors.border.subtle}`,
  '&:last-child': { borderBlockEnd: 0 },
})

const dotStyle = css({
  flex: '0 0 8px',
  width: '8px',
  height: '8px',
  borderRadius: tokens.radius.full,
})

const rowTextStyle = css({
  display: 'grid',
  flex: '1 1 auto',
  minWidth: 0,
})

const messageStyle = css({
  fontSize: tokens.fontSize.sm,
  fontWeight: tokens.fontWeight.medium,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

const metaStyle = css({
  fontFamily: monoFont,
  fontSize: '11px',
  color: tokens.colors.text.muted,
  whiteSpace: 'nowrap',
})

const srOnly = css({
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
})
