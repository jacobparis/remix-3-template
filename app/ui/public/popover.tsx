import { css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'

import { componentStyleValues as tokens } from './tokens.ts'

// Clears the user-agent [popover] box (inset, margin, border, padding, canvas colors) so the
// surface only adds what it wants.
const reset = css({
  inset: 'auto',
  margin: 0,
  padding: 0,
  border: 0,
  borderRadius: 0,
  background: 'transparent',
  boxShadow: 'none',
  color: 'inherit',
  font: 'inherit',
  overflow: 'visible',
})

const base = css({
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
  minWidth: '12rem',
  maxWidth: `min(24rem, calc(100vw - (${tokens.space.lg} * 2)))`,
  maxHeight: '50dvh',
  overflow: 'hidden',
  borderRadius: tokens.radius.lg,
  background: tokens.surface.lvl0,
  color: tokens.colors.text.primary,
  boxShadow: `0 0 0 1px ${tokens.colors.border.subtle}, ${tokens.shadow.xs}, ${tokens.shadow.md}`,
  opacity: 0,
  '&::backdrop': { background: 'transparent' },
  '&:popover-open': { opacity: 1 },
  '&:not(:popover-open)': {
    pointerEvents: 'none',
    transition: 'opacity 180ms ease-in, overlay 180ms ease-in, display 180ms ease-in',
    transitionBehavior: 'allow-discrete',
  },
})

export type PopoverSurfaceProps = Props<'div'>

// Pass the owning primitive's popover mixin (select.popover(), menu.popover(), ...) through `mix`.
export function PopoverSurface(handle: Handle<PopoverSurfaceProps>): () => RemixNode {
  return () => {
    let { children, mix, ...divProps } = handle.props

    return (
      <div {...divProps} mix={[reset, base, mix]}>
        {children}
      </div>
    )
  }
}
