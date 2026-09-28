import { css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'
import button from 'remix/ui/button'

import { componentStyleValues as tokens } from './tokens.ts'

// Keep only Remix's default-attrs behavior (type="button" on <button>). Its style layers
// hardcode their own font, radius, and focus color, so every style here comes from tokens.
let [buttonDefaultAttrs] = button()

const hover = '&:hover:not(:disabled):not([aria-disabled="true"])'
const active = '&:active:not(:disabled):not([aria-disabled="true"])'

// Clear every property a variant or size could have an opinion about, so each variant
// only adds the styles it wants.
const reset = css({
  appearance: 'none',
  boxSizing: 'border-box',
  height: 'auto',
  minHeight: 0,
  margin: 0,
  padding: 0,
  border: 0,
  borderRadius: 0,
  background: 'transparent',
  boxShadow: 'none',
  color: 'inherit',
  font: 'inherit',
  letterSpacing: 'inherit',
  textShadow: 'none',
  textDecoration: 'none',
  transform: 'none',
})

const base = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  cursor: 'pointer',
  '&:focus-visible': { outline: `2px solid ${tokens.colors.focus.ring}`, outlineOffset: '2px' },
  '&:disabled, &[aria-disabled="true"]': { cursor: 'not-allowed', opacity: 0.55 },
  gap: tokens.space.sm,
  borderRadius: tokens.radius.md,
  fontSize: tokens.fontSize.sm,
  fontWeight: tokens.fontWeight.medium,
  lineHeight: '20px',
  transition: 'background-color 120ms, border-color 120ms, color 120ms',
  '& svg': { flexShrink: 0, width: '14px', height: '14px' },
})

const variants = {
  default: css({
    background: tokens.colors.action.primary.background,
    color: tokens.colors.action.primary.foreground,
    [hover]: { background: tokens.colors.action.primary.backgroundHover },
    [active]: { background: tokens.colors.action.primary.backgroundActive },
  }),
  secondary: css({
    background: tokens.surface.lvl3,
    color: tokens.colors.text.primary,
    [hover]: { background: tokens.colors.action.secondary.backgroundActive },
  }),
  outline: css({
    background: tokens.colors.action.secondary.background,
    color: tokens.colors.action.secondary.foreground,
    boxShadow: `inset 0 0 0 1px ${tokens.colors.action.secondary.border}`,
    [hover]: { background: tokens.colors.action.secondary.backgroundHover },
    [active]: { background: tokens.colors.action.secondary.backgroundActive },
  }),
  ghost: css({
    color: tokens.colors.text.primary,
    [hover]: { background: 'light-dark(rgb(16 16 16 / 0.05), rgb(236 236 236 / 0.1))' },
    [active]: { background: 'light-dark(rgb(16 16 16 / 0.08), rgb(236 236 236 / 0.14))' },
  }),
  destructive: css({
    background: tokens.colors.action.danger.background,
    color: tokens.colors.action.danger.foreground,
    [hover]: { background: tokens.colors.action.danger.backgroundHover },
    [active]: { background: tokens.colors.action.danger.backgroundActive },
  }),
  link: css({
    color: tokens.colors.focus.ring,
    textUnderlineOffset: '4px',
    [hover]: { textDecoration: 'underline' },
  }),
}

const sizes = {
  sm: css({ height: tokens.control.height.sm, paddingInline: '10px' }),
  default: css({ height: tokens.control.height.md, paddingInline: '12px' }),
  lg: css({ height: tokens.control.height.lg, paddingInline: '16px' }),
  icon: css({ width: tokens.control.height.md, height: tokens.control.height.md }),
}

export type ButtonVariant = keyof typeof variants
export type ButtonSize = keyof typeof sizes

export type ButtonVariantOptions = { variant?: ButtonVariant; size?: ButtonSize }

export function buttonVariants({ variant = 'default', size = 'default' }: ButtonVariantOptions = {}) {
  return [buttonDefaultAttrs, reset, base, variants[variant], sizes[size]] as const
}

export type ButtonProps = Props<'button'> & ButtonVariantOptions

export type LinkButtonProps = Props<'a'> & ButtonVariantOptions

export function Button(handle: Handle<ButtonProps>): () => RemixNode {
  return () => {
    let { children, mix, variant, size, ...buttonProps } = handle.props

    return (
      <button {...buttonProps} mix={[...buttonVariants({ variant, size }), mix]}>
        {children}
      </button>
    )
  }
}

export function LinkButton(handle: Handle<LinkButtonProps>): () => RemixNode {
  return () => {
    let { children, mix, variant, size, ...anchorProps } = handle.props

    return (
      <a {...anchorProps} mix={[...buttonVariants({ variant, size }), mix]}>
        {children}
      </a>
    )
  }
}
