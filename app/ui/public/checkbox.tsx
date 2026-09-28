import { css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'
import checkbox from 'remix/ui/checkbox'
import type { CheckboxState } from 'remix/ui/checkbox'

import { componentStyleValues as tokens } from './tokens.ts'
import type { DistributiveOmit } from './types.ts'

const checked = '&:checked, &[aria-checked="true"], &[data-state="checked"]'
const mixed = '&:indeterminate, &[aria-checked="mixed"], &[data-state="mixed"]'
const checkedMark =
  '&:checked::before, &[aria-checked="true"]::before, &[data-state="checked"]::before'
const mixedMark =
  '&:indeterminate::before, &[aria-checked="mixed"]::before, &[data-state="mixed"]::before'
const checkMask =
  "url(\"data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.75 5.76562L5.10156 8.25L9.23438 1.75' stroke='black' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")"

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
  width: 'var(--checkbox-size)',
  height: 'var(--checkbox-size)',
  borderRadius: 'var(--checkbox-radius)',
  background: tokens.surface.lvl0,
  boxShadow: `inset 0 0 0 1px ${tokens.colors.border.default}, ${tokens.shadow.xs}`,
  color: tokens.colors.action.primary.foreground,
  cursor: 'pointer',
  verticalAlign: 'middle',
  transition: 'background-color 120ms, box-shadow 120ms',
  '&::before': { content: '""', opacity: 0, pointerEvents: 'none' },
  [`${checked}, ${mixed}`]: {
    background: tokens.colors.action.primary.background,
    boxShadow: 'none',
  },
  [checkedMark]: {
    opacity: 1,
    width: '75%',
    height: '75%',
    background: 'currentColor',
    mask: `${checkMask} center / contain no-repeat`,
  },
  [mixedMark]: { opacity: 1, width: '50%', height: '1.5px', borderRadius: '1px', background: 'currentColor' },
  '&:focus-visible': { outline: `2px solid ${tokens.colors.focus.ring}`, outlineOffset: '2px' },
  '&:disabled, &[aria-disabled="true"]': { cursor: 'not-allowed', opacity: 0.55 },
})

const sizes = {
  default: css({ '--checkbox-size': '16px', '--checkbox-radius': '4px' }),
  lg: css({ '--checkbox-size': '20px', '--checkbox-radius': '5px' }),
}

export type CheckboxSize = keyof typeof sizes

export type CheckboxProps = DistributiveOmit<Props<'input'>, 'size'> & {
  size?: CheckboxSize
  state?: CheckboxState
}

// Keeps only Remix's default-attrs mixin (type="checkbox", aria-checked for `state`); every
// visual comes from the layers below.
export function Checkbox(handle: Handle<CheckboxProps>): () => RemixNode {
  return () => {
    let { mix, size = 'default', state, ...inputProps } = handle.props
    let [checkboxDefaultAttrs] = checkbox({ state })

    return <input {...inputProps} mix={[checkboxDefaultAttrs, reset, base, sizes[size], mix]} />
  }
}
