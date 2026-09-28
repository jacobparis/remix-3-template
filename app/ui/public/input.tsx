import { css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'

import { componentStyleValues as tokens } from './tokens.ts'
import type { DistributiveOmit } from './types.ts'

const focusRing = `inset 0 0 0 1px ${tokens.colors.focus.ring}, 0 0 0 3px ${tokens.colors.focus.halo}`
const invalidRing = `inset 0 0 0 1px ${tokens.colors.action.danger.background}, 0 0 0 3px ${tokens.colors.focus.haloDanger}`

// Clear every property a variant or size could decide, including the native field chrome.
const reset = css({
  appearance: 'none',
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  border: 0,
  borderRadius: 0,
  background: 'transparent',
  boxShadow: 'none',
  outline: 'none',
  color: 'inherit',
  font: 'inherit',
  letterSpacing: 'inherit',
})

const base = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  width: '100%',
  minWidth: 0,
  borderRadius: tokens.radius.md,
  color: tokens.colors.text.primary,
  fontSize: tokens.fontSize.sm,
  lineHeight: tokens.lineHeight.sm,
  transition: 'box-shadow 120ms, background-color 120ms',
  '&::placeholder, & input::placeholder': { color: tokens.colors.text.muted, opacity: 1 },
  '&:focus-visible, &:focus-within': { boxShadow: focusRing },
  '&[aria-invalid="true"], &:has([aria-invalid="true"])': { boxShadow: invalidRing },
  '&:disabled, &:has(input:disabled)': { cursor: 'not-allowed', opacity: 0.55 },
  '& > svg': { flexShrink: 0, width: '14px', height: '14px', color: tokens.colors.text.muted },
})

const variants = {
  default: css({
    background: tokens.surface.lvl0,
    boxShadow: `inset 0 0 0 1px ${tokens.colors.border.default}, ${tokens.shadow.xs}`,
  }),
  filled: css({
    background: tokens.surface.lvl3,
    '&:hover:not(:focus-visible):not(:focus-within)': { background: tokens.surface.lvl4 },
  }),
}

const sizes = {
  sm: css({ height: tokens.control.height.sm, paddingInline: tokens.space.sm }),
  default: css({ height: tokens.control.height.md, paddingInline: '10px' }),
  lg: css({ height: tokens.control.height.lg, paddingInline: tokens.space.md }),
}

const groupField = css({ flex: '1 1 auto', alignSelf: 'stretch' })

export type InputVariant = keyof typeof variants
export type InputSize = keyof typeof sizes

export type InputVariantOptions = { variant?: InputVariant; size?: InputSize }

export function inputVariants({ variant = 'default', size = 'default' }: InputVariantOptions = {}) {
  return [reset, base, variants[variant], sizes[size]] as const
}

export type InputProps = DistributiveOmit<Props<'input'>, 'size'> & InputVariantOptions

export type InputGroupProps = Props<'div'> & InputVariantOptions

export type InputGroupInputProps = DistributiveOmit<Props<'input'>, 'size'>

export function Input(handle: Handle<InputProps>): () => RemixNode {
  return () => {
    let { mix, variant, size, ...inputProps } = handle.props

    return <input {...inputProps} mix={[...inputVariants({ variant, size }), mix]} />
  }
}

// A field frame that holds an icon or affix next to an InputGroupInput.
export function InputGroup(handle: Handle<InputGroupProps>): () => RemixNode {
  return () => {
    let { children, mix, variant, size, ...divProps } = handle.props

    return (
      <div {...divProps} mix={[...inputVariants({ variant, size }), mix]}>
        {children}
      </div>
    )
  }
}

export function InputGroupInput(handle: Handle<InputGroupInputProps>): () => RemixNode {
  return () => {
    let { mix, ...inputProps } = handle.props

    return <input {...inputProps} mix={[reset, groupField, mix]} />
  }
}
