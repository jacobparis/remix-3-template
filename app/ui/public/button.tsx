import type { Handle, Props, RemixNode } from 'remix/ui'
import button from 'remix/ui/button'
import type { ButtonOptions } from 'remix/ui/button'

export type ButtonProps = Props<'button'> & ButtonOptions

export type LinkButtonProps = Props<'a'> & ButtonOptions

export function Button(handle: Handle<ButtonProps>): () => RemixNode {
  return () => {
    let { children, mix, size, tone, type, ...buttonProps } = handle.props

    return (
      <button {...buttonProps} type={type ?? 'button'} mix={[button({ size, tone }), mix]}>
        {children}
      </button>
    )
  }
}

export function LinkButton(handle: Handle<LinkButtonProps>): () => RemixNode {
  return () => {
    let { children, mix, size, tone, ...anchorProps } = handle.props

    return (
      <a {...anchorProps} mix={[button({ size, tone }), mix]}>
        {children}
      </a>
    )
  }
}
