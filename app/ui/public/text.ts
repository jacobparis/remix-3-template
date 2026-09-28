import { css } from 'remix/ui'

import { componentStyleValues as tokens } from './tokens.ts'

// Each size step fixes font size and line height together so peers share a baseline grid.
export const fontXs = css({ fontSize: tokens.fontSize.xs, lineHeight: '16px' })
export const fontSm = css({ fontSize: tokens.fontSize.sm, lineHeight: '20px' })
export const fontMd = css({ fontSize: tokens.fontSize.md, lineHeight: '22px' })
export const fontLg = css({ fontSize: '16px', lineHeight: '24px' })
export const fontXl = css({ fontSize: '20px', lineHeight: '28px' })
export const font2xl = css({ fontSize: '24px', lineHeight: '32px', letterSpacing: '-0.015em' })

export const fontMedium = css({ fontWeight: tokens.fontWeight.medium })
export const fontSemibold = css({ fontWeight: '600' })

export const fontMono = css({
  fontFamily:
    "'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
})

export const textPrimary = css({ color: tokens.colors.text.primary })
export const textSecondary = css({ color: tokens.colors.text.secondary })

export const truncate = css({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const visuallyHidden = css({
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
  border: 0,
})
