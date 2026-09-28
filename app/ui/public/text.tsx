import { css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'

import { componentStyleValues as tokens } from './tokens.ts'

const textCss = css({
  margin: 0,
  fontSize: tokens.fontSize.sm,
  lineHeight: tokens.lineHeight.relaxed,
  color: tokens.colors.text.secondary,
})

const captionCss = css({
  fontSize: tokens.fontSize.xs,
  fontWeight: tokens.fontWeight.medium,
  lineHeight: tokens.lineHeight.normal,
  color: tokens.colors.text.secondary,
})

const codeCss = css({
  fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
  fontSize: tokens.fontSize.xs,
  color: tokens.colors.text.secondary,
  whiteSpace: 'nowrap',
})

const visuallyHiddenCss = css({
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
})

export function Text(handle: Handle<Props<'p'>>): () => RemixNode {
  return () => {
    let { children, mix, ...paragraphProps } = handle.props

    return (
      <p {...paragraphProps} mix={[textCss, mix]}>
        {children}
      </p>
    )
  }
}

export function Caption(handle: Handle<Props<'span'>>): () => RemixNode {
  return () => {
    let { children, mix, ...spanProps } = handle.props

    return (
      <span {...spanProps} mix={[captionCss, mix]}>
        {children}
      </span>
    )
  }
}

export function Code(handle: Handle<Props<'code'>>): () => RemixNode {
  return () => {
    let { children, mix, ...codeProps } = handle.props

    return (
      <code {...codeProps} mix={[codeCss, mix]}>
        {children}
      </code>
    )
  }
}

export function VisuallyHidden(handle: Handle<Props<'span'>>): () => RemixNode {
  return () => {
    let { children, mix, ...spanProps } = handle.props

    return (
      <span {...spanProps} mix={[visuallyHiddenCss, mix]}>
        {children}
      </span>
    )
  }
}
