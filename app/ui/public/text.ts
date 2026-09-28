import { css } from 'remix/ui'

import { componentStyleValues as tokens } from './tokens.ts'

// Each size step sets font size and its paired line height together so peers share a baseline grid.
export const fontXs = css({ fontSize: tokens.fontSize.xs, lineHeight: tokens.lineHeight.xs })
export const fontSm = css({ fontSize: tokens.fontSize.sm, lineHeight: tokens.lineHeight.sm })
export const fontMd = css({ fontSize: tokens.fontSize.md, lineHeight: tokens.lineHeight.md })
export const fontLg = css({ fontSize: tokens.fontSize.lg, lineHeight: tokens.lineHeight.lg })
export const fontXl = css({ fontSize: tokens.fontSize.xl, lineHeight: tokens.lineHeight.xl })
export const font2xl = css({
  fontSize: tokens.fontSize['2xl'],
  lineHeight: tokens.lineHeight['2xl'],
  letterSpacing: tokens.letterSpacing.tight,
})
export const fontDisplay = css({
  fontSize: tokens.fontSize.display,
  lineHeight: tokens.lineHeight.display,
  letterSpacing: tokens.letterSpacing.tighter,
})

export const fontMedium = css({ fontWeight: tokens.fontWeight.medium })
export const fontSemibold = css({ fontWeight: tokens.fontWeight.semibold })

export const fontMono = css({ fontFamily: tokens.fontFamily.mono })

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
