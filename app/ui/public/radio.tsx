import { css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'
import radio from 'remix/ui/radio'

import { componentStyleValues as tokens } from './tokens.ts'
import type { DistributiveOmit } from './types.ts'

const checked = '&:checked, &[aria-checked="true"], &[data-state="checked"]'
const checkedDot =
  '&:checked::before, &[aria-checked="true"]::before, &[data-state="checked"]::before'

const [radioDefaultAttrs] = radio()

const reset = css({
  appearance: 'none',
  WebkitAppearance: 'none',
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  border: 0,
  borderRadius: 0,
  background: 'transparent',
  boxShadow: 'none',
  outline: 'none',
  color: 'inherit',
})

const base = css({
  position: 'relative',
  display: 'inline-grid',
  placeItems: 'center',
  flex: 'none',
  width: 'var(--radio-size)',
  height: 'var(--radio-size)',
  borderRadius: tokens.radius.full,
  background: tokens.surface.lvl0,
  boxShadow: `inset 0 0 0 1px ${tokens.colors.border.default}, ${tokens.shadow.xs}`,
  cursor: 'pointer',
  verticalAlign: 'middle',
  transition: 'background-color 120ms, box-shadow 120ms',
  '&::before': {
    content: '""',
    width: 'var(--radio-dot)',
    height: 'var(--radio-dot)',
    borderRadius: tokens.radius.full,
    background: tokens.colors.action.primary.foreground,
    opacity: 0,
    pointerEvents: 'none',
  },
  [checked]: { background: tokens.colors.action.primary.background, boxShadow: 'none' },
  [checkedDot]: { opacity: 1 },
  '&:focus-visible': { outline: `2px solid ${tokens.colors.focus.ring}`, outlineOffset: '2px' },
  '&:disabled, &[aria-disabled="true"]': { cursor: 'not-allowed', opacity: 0.55 },
})

const sizes = {
  default: css({ '--radio-size': '16px', '--radio-dot': '6px' }),
  lg: css({ '--radio-size': '20px', '--radio-dot': '8px' }),
}

export type RadioSize = keyof typeof sizes

export type RadioProps = DistributiveOmit<Props<'input'>, 'size'> & { size?: RadioSize }

// Keeps only Remix's default-attrs mixin (type="radio"); every visual comes from the layers below.
export function Radio(handle: Handle<RadioProps>): () => RemixNode {
  return () => {
    let { mix, size = 'default', ...inputProps } = handle.props

    return <input {...inputProps} mix={[radioDefaultAttrs, reset, base, sizes[size], mix]} />
  }
}
