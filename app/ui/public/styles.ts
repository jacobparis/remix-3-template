import { css } from 'remix/ui'

import { componentStyleValues as tokens } from './tokens.ts'

export const monoFont =
  "'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace"

export const containerStyle = css({
  width: '100%',
  maxWidth: '1120px',
  marginInline: 'auto',
  paddingInline: '24px',
  '@media (max-width: 640px)': { paddingInline: '16px' },
})

export const cardStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.lg,
  minWidth: 0,
  padding: '20px',
  background: tokens.surface.lvl0,
  border: `1px solid ${tokens.colors.border.subtle}`,
  borderRadius: tokens.radius.xl,
})

export const captionStyle = css({
  margin: 0,
  fontSize: tokens.fontSize.xs,
  fontWeight: tokens.fontWeight.medium,
  lineHeight: tokens.lineHeight.normal,
  color: tokens.colors.text.secondary,
})

export const cardTitleStyle = css({
  margin: 0,
  fontSize: '15px',
  fontWeight: 600,
  lineHeight: '22px',
  color: tokens.colors.text.primary,
})

export const mutedTextStyle = css({
  margin: 0,
  fontSize: tokens.fontSize.sm,
  lineHeight: tokens.lineHeight.relaxed,
  color: tokens.colors.text.secondary,
})

export const fieldStyle = css({
  display: 'grid',
  gap: '6px',
  minWidth: 0,
})

export const labelStyle = css({
  fontSize: tokens.fontSize.xs,
  fontWeight: tokens.fontWeight.medium,
  color: tokens.colors.text.secondary,
})

export const inlineLabelStyle = css({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.space.sm,
  fontSize: tokens.fontSize.sm,
  color: tokens.colors.text.primary,
  cursor: 'pointer',
})

export const dividerStyle = css({
  margin: 0,
  border: 0,
  borderBlockStart: `1px solid ${tokens.colors.border.subtle}`,
})
