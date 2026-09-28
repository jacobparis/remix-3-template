import { css } from 'remix/ui'
import type { Handle, Props } from 'remix/ui'

import { Card, CardContent, CardHeader, CardTitle } from './public/card.tsx'
import {
  font2xl,
  fontDisplay,
  fontLg,
  fontMd,
  fontMedium,
  fontMono,
  fontSemibold,
  fontSm,
  fontXl,
  fontXs,
  textPrimary,
  textSecondary,
  truncate,
} from './public/text.ts'
import { componentStyleValues as tokens } from './public/tokens.ts'

const brandColors = Object.entries(tokens.colors.brand)
const statusColors = Object.entries(tokens.colors.status)
const surfaces = Object.entries(tokens.surface)
const actions = Object.entries(tokens.colors.action)
const textColors = Object.entries(tokens.colors.text)
const radii = Object.entries(tokens.radius)
const spaces = Object.entries(tokens.space).filter(([name]) => name !== 'none')

const typeScale: { token: string; mix: Props<'span'>['mix']; sample: string }[] = [
  { token: 'display', mix: [fontDisplay, fontSemibold], sample: 'Build on the web' },
  { token: '2xl', mix: [font2xl, fontSemibold], sample: 'Project settings' },
  { token: 'xl', mix: [fontXl, fontSemibold], sample: 'Deployments' },
  { token: 'lg', mix: [fontLg], sample: 'Lead paragraphs under a heading.' },
  { token: 'md', mix: [fontMd], sample: 'Body copy for pages.' },
  { token: 'sm', mix: [fontSm], sample: 'Controls and menus.' },
  { token: 'xs', mix: [fontXs, fontMedium], sample: 'Labels and captions.' },
  { token: 'mono', mix: [fontSm, fontMono], sample: 'dpl_6a9z main 3h' },
]

export function Foundations() {
  return () => (
    <div
      mix={css({
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: tokens.space.lg,
        '@media (max-width: 860px)': { gridTemplateColumns: 'minmax(0, 1fr)' },
      })}
    >
      <Card mix={css({ gridColumn: '1 / -1' })}>
        <CardHeader>
          <CardTitle>Colors switch with the page between light and dark</CardTitle>
        </CardHeader>
        <CardContent mix={css({ display: 'grid', gap: '20px' })}>
          <SwatchGroup label="Brand" items={brandColors.map(([name, value]) => ({ name, value }))} />
          <SwatchGroup
            label="Status"
            items={statusColors.map(([name, value]) => ({ name, value }))}
          />
          <SwatchGroup
            label="Surface"
            items={surfaces.map(([name, value]) => ({ name, value }))}
            bordered
          />
          <SwatchGroup
            label="Action"
            items={actions.map(([name, value]) => ({ name, value: value.background }))}
            bordered
          />
          <SwatchGroup label="Text" items={textColors.map(([name, value]) => ({ name, value }))} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Inter sets every size step, JetBrains Mono sets code</CardTitle>
        </CardHeader>
        <CardContent>
          <ul
            mix={css({
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'grid',
              gap: tokens.space.md,
            })}
          >
            {typeScale.map((step) => (
              <li
                key={step.token}
                mix={css({
                  display: 'grid',
                  gap: '2px',
                  paddingBlockEnd: tokens.space.md,
                  borderBlockEnd: `1px solid ${tokens.colors.border.subtle}`,
                  '&:last-child': { borderBlockEnd: 0, paddingBlockEnd: 0 },
                })}
              >
                <code mix={[fontXs, fontMono, textSecondary]}>{step.token}</code>
                <span mix={[step.mix, textPrimary, truncate]}>{step.sample}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Radius and spacing come in named steps</CardTitle>
        </CardHeader>
        <CardContent mix={css({ display: 'grid', gap: tokens.space.lg })}>
          <div mix={css({ display: 'flex', flexWrap: 'wrap', gap: tokens.space.md })}>
            {radii.map(([name, value]) => (
              <div
                key={name}
                mix={css({ display: 'grid', justifyItems: 'center', gap: '6px' })}
              >
                <span
                  mix={css({
                    width: '52px',
                    height: '52px',
                    background: tokens.surface.lvl3,
                    border: `1px solid ${tokens.colors.border.default}`,
                  })}
                  style={{ borderRadius: value }}
                />
                <span mix={[fontXs, fontMedium, textSecondary]}>{name}</span>
              </div>
            ))}
          </div>
          <div mix={css({ display: 'grid', gap: tokens.space.md })}>
            {spaces.map(([name, value]) => (
              <div
                key={name}
                mix={css({ display: 'flex', alignItems: 'center', gap: tokens.space.md })}
              >
                <span mix={[fontXs, fontMedium, textSecondary, css({ width: '24px' })]}>
                  {name}
                </span>
                <span
                  mix={css({
                    height: '12px',
                    borderRadius: '3px',
                    background: tokens.colors.focus.ring,
                  })}
                  style={{ width: value }}
                />
                <code mix={[fontXs, fontMono, textSecondary]}>{value}</code>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function SwatchGroup(
  handle: Handle<{ label: string; items: { name: string; value: string }[]; bordered?: boolean }>,
) {
  return () => (
    <div mix={css({ display: 'grid', gap: tokens.space.sm })}>
      <span mix={[fontXs, fontMedium, textSecondary]}>{handle.props.label}</span>
      <ul
        mix={css({
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
          gap: tokens.space.sm,
        })}
      >
        {handle.props.items.map((item) => (
          <li key={item.name} mix={css({ display: 'grid', gap: '6px' })}>
            <span
              mix={css({
                height: '44px',
                borderRadius: tokens.radius.lg,
                boxShadow: `inset 0 0 0 1px ${
                  handle.props.bordered ? tokens.colors.border.default : tokens.colors.border.subtle
                }`,
              })}
              style={{ background: item.value }}
            />
            <code mix={[fontXs, fontMono, textSecondary]}>{item.name}</code>
          </li>
        ))}
      </ul>
    </div>
  )
}
