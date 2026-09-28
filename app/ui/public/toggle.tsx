import { css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'
import toggle from 'remix/ui/toggle'

import { componentStyleValues as tokens } from './tokens.ts'
import type { DistributiveOmit } from './types.ts'

export { ToggleChangeEvent, onToggleChange } from 'remix/ui/toggle'

const checked = '&:checked, &[aria-checked="true"], &[data-state="checked"]'
const checkedThumb =
  '&:checked::before, &[aria-checked="true"]::before, &[data-state="checked"]::before'

const [toggleDefaultAttrs] = toggle()

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
  '--toggle-inset': '2px',
  position: 'relative',
  display: 'inline-block',
  flex: 'none',
  width: 'var(--toggle-width)',
  height: 'var(--toggle-height)',
  borderRadius: tokens.radius.full,
  background: tokens.colors.control.track,
  cursor: 'pointer',
  verticalAlign: 'middle',
  transition: 'background-color 160ms ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 'var(--toggle-inset)',
    left: 'var(--toggle-inset)',
    width: 'calc(var(--toggle-height) - var(--toggle-inset) * 2)',
    height: 'calc(var(--toggle-height) - var(--toggle-inset) * 2)',
    borderRadius: tokens.radius.full,
    background: tokens.colors.control.thumb,
    boxShadow: tokens.shadow.thumb,
    transition: 'transform 160ms ease',
    pointerEvents: 'none',
  },
  [checked]: { background: tokens.colors.action.primary.background },
  [checkedThumb]: { transform: 'translateX(calc(var(--toggle-width) - var(--toggle-height)))' },
  '&:focus-visible': { outline: `2px solid ${tokens.colors.focus.ring}`, outlineOffset: '2px' },
  '&:disabled, &[aria-disabled="true"]': { cursor: 'not-allowed', opacity: 0.55 },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    '&::before': { transition: 'none' },
  },
})

const sizes = {
  default: css({ '--toggle-width': '32px', '--toggle-height': '18px' }),
  lg: css({ '--toggle-width': '40px', '--toggle-height': '22px' }),
}

export type ToggleSize = keyof typeof sizes

export type ToggleProps = DistributiveOmit<Props<'input'>, 'size'> & { size?: ToggleSize }

// Keeps only Remix's default-attrs mixin (checkbox input with role="switch"); every visual
// comes from the layers below.
export function Toggle(handle: Handle<ToggleProps>): () => RemixNode {
  return () => {
    let { mix, size = 'default', ...inputProps } = handle.props

    return <input {...inputProps} mix={[toggleDefaultAttrs, reset, base, sizes[size], mix]} />
  }
}
