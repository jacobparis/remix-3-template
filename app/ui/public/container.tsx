import { css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'

const containerCss = css({
  width: '100%',
  maxWidth: '1120px',
  marginInline: 'auto',
  paddingInline: '24px',
  '@media (max-width: 640px)': { paddingInline: '16px' },
})

export function Container(handle: Handle<Props<'div'>>): () => RemixNode {
  return () => {
    let { children, mix, ...divProps } = handle.props

    return (
      <div {...divProps} mix={[containerCss, mix]}>
        {children}
      </div>
    )
  }
}
