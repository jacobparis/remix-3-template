import { css } from 'remix/ui'
import type { Handle } from 'remix/ui'

import { cardStyle, cardTitleStyle, eyebrowStyle, monoFont } from './public/styles.ts'
import { componentStyleValues as tokens } from './public/tokens.ts'

const brandColors = [
  { name: 'Blue', value: '#20AAFF' },
  { name: 'Green', value: '#80E464' },
  { name: 'Yellow', value: '#FFDF5F' },
  { name: 'Pink', value: '#FF65DB' },
  { name: 'Red', value: '#FF5148' },
]

const surfaces = Object.entries(tokens.surface)
const actions = Object.entries(tokens.colors.action)
const textColors = Object.entries(tokens.colors.text)
const radii = Object.entries(tokens.radius)
const spaces = Object.entries(tokens.space).filter(([name]) => name !== 'none')

const typeScale = [
  { name: 'Display', size: '40px', weight: 700, sample: 'Build on the web' },
  { name: 'Heading', size: '20px', weight: 600, sample: 'Project settings' },
  { name: 'md · 14px', size: tokens.fontSize.md, weight: 400, sample: 'Body copy for pages.' },
  { name: 'sm · 13px', size: tokens.fontSize.sm, weight: 400, sample: 'Controls and menus.' },
  { name: 'xs · 12px', size: tokens.fontSize.xs, weight: 500, sample: 'Labels and buttons.' },
]

export function Foundations() {
  return () => (
    <div mix={gridStyle}>
      <div mix={[cardStyle, wideStyle]}>
        <h3 mix={cardTitleStyle}>Color</h3>
        <SwatchGroup label="Brand" items={brandColors} />
        <SwatchGroup
          label="Surface"
          items={surfaces.map(([name, value]) => ({ name, value }))}
          bordered
        />
        <SwatchGroup
          label="Action"
          items={actions.map(([name, value]) => ({ name, value: value.background }))}
        />
        <SwatchGroup
          label="Text"
          items={textColors.map(([name, value]) => ({ name, value }))}
        />
      </div>
      <div mix={cardStyle}>
        <h3 mix={cardTitleStyle}>Type</h3>
        <ul mix={stackStyle}>
          {typeScale.map((step) => (
            <li key={step.name} mix={typeRowStyle}>
              <span mix={eyebrowStyle}>{step.name}</span>
              <span
                mix={typeSampleStyle}
                style={{ fontSize: step.size, fontWeight: String(step.weight) }}
              >
                {step.sample}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div mix={cardStyle}>
        <h3 mix={cardTitleStyle}>Radius and space</h3>
        <div mix={rowWrapStyle}>
          {radii.map(([name, value]) => (
            <div key={name} mix={tokenTileStyle}>
              <span mix={radiusBoxStyle} style={{ borderRadius: value }} />
              <span mix={eyebrowStyle}>{name}</span>
            </div>
          ))}
        </div>
        <div mix={stackStyle}>
          {spaces.map(([name, value]) => (
            <div key={name} mix={spaceRowStyle}>
              <span mix={[eyebrowStyle, spaceLabelStyle]}>{name}</span>
              <span mix={spaceBarStyle} style={{ width: value }} />
              <span mix={valueStyle}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SwatchGroup(
  handle: Handle<{ label: string; items: { name: string; value: string }[]; bordered?: boolean }>,
) {
  return () => (
    <div mix={swatchGroupStyle}>
      <span mix={eyebrowStyle}>{handle.props.label}</span>
      <ul mix={swatchListStyle}>
        {handle.props.items.map((item) => (
          <li key={item.name} mix={swatchStyle}>
            <span
              mix={[swatchChipStyle, handle.props.bordered ? chipBorderStyle : null]}
              style={{ background: item.value }}
            />
            <span mix={swatchNameStyle}>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

const gridStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: tokens.space.lg,
  '@media (max-width: 860px)': { gridTemplateColumns: 'minmax(0, 1fr)' },
})

const wideStyle = css({ gridColumn: '1 / -1' })

const swatchGroupStyle = css({ display: 'grid', gap: tokens.space.sm })

const swatchListStyle = css({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
  gap: tokens.space.sm,
})

const swatchStyle = css({ display: 'grid', gap: '6px' })

const swatchChipStyle = css({
  height: '44px',
  borderRadius: tokens.radius.lg,
  boxShadow: 'inset 0 0 0 1px rgb(0 0 0 / 0.06)',
})

const chipBorderStyle = css({
  boxShadow: `inset 0 0 0 1px ${tokens.colors.border.default}`,
})

const swatchNameStyle = css({
  fontFamily: monoFont,
  fontSize: '11px',
  color: tokens.colors.text.secondary,
})

const stackStyle = css({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'grid',
  gap: tokens.space.md,
})

const typeRowStyle = css({
  display: 'grid',
  gap: '2px',
  paddingBlockEnd: tokens.space.md,
  borderBlockEnd: `1px solid ${tokens.colors.border.subtle}`,
  '&:last-child': { borderBlockEnd: 0, paddingBlockEnd: 0 },
})

const typeSampleStyle = css({
  lineHeight: 1.2,
  letterSpacing: '-0.01em',
  color: tokens.colors.text.primary,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

const rowWrapStyle = css({ display: 'flex', flexWrap: 'wrap', gap: tokens.space.md })

const tokenTileStyle = css({ display: 'grid', justifyItems: 'center', gap: '6px' })

const radiusBoxStyle = css({
  width: '52px',
  height: '52px',
  background: tokens.surface.lvl3,
  border: `1px solid ${tokens.colors.border.default}`,
})

const spaceRowStyle = css({ display: 'flex', alignItems: 'center', gap: tokens.space.md })

const spaceLabelStyle = css({ width: '24px' })

const spaceBarStyle = css({
  height: '12px',
  borderRadius: '3px',
  background: tokens.colors.focus.ring,
})

const valueStyle = css({
  fontFamily: monoFont,
  fontSize: '11px',
  color: tokens.colors.text.muted,
})
