import { css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'

import { componentStyleValues as tokens } from './tokens.ts'

const dividerCss = css({
  margin: 0,
  border: 0,
  borderBlockStart: `1px solid ${tokens.colors.border.subtle}`,
})

export function Divider(handle: Handle<Props<'hr'>>): () => RemixNode {
  return () => {
    let { mix, ...hrProps } = handle.props

    return <hr {...hrProps} mix={[dividerCss, mix]} />
  }
}
