import { css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'

import { fontLg, fontSemibold, fontSm, textPrimary, textSecondary } from './text.ts'
import { componentStyleValues as tokens } from './tokens.ts'

export function Card(handle: Handle<Props<'section'>>): () => RemixNode {
  return () => {
    let { children, mix, ...sectionProps } = handle.props

    return (
      <section
        {...sectionProps}
        data-slot="card"
        mix={[
          css({
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            minWidth: 0,
            paddingBlock: '20px',
            background: tokens.surface.lvl0,
            border: `1px solid ${tokens.colors.border.subtle}`,
            borderRadius: tokens.radius.xl,
          }),
          mix,
        ]}
      >
        {children}
      </section>
    )
  }
}

export function CardHeader(handle: Handle<Props<'div'>>): () => RemixNode {
  return () => {
    let { children, mix, ...divProps } = handle.props

    return (
      <div
        {...divProps}
        data-slot="card-header"
        mix={[
          css({
            display: 'grid',
            gridAutoRows: 'min-content',
            gridTemplateRows: 'auto auto',
            alignItems: 'start',
            gap: tokens.space.xs,
            paddingInline: '20px',
            '&:has([data-slot="card-action"])': {
              gridTemplateColumns: 'minmax(0, 1fr) auto',
              alignItems: 'center',
              columnGap: tokens.space.md,
            },
            '& > [data-slot="card-description"]': { gridColumn: '1' },
          }),
          mix,
        ]}
      >
        {children}
      </div>
    )
  }
}

export function CardTitle(handle: Handle<Props<'h3'>>): () => RemixNode {
  return () => {
    let { children, mix, ...headingProps } = handle.props

    return (
      <h3
        {...headingProps}
        data-slot="card-title"
        mix={[fontLg, fontSemibold, textPrimary, css({ margin: 0, textWrap: 'balance' }), mix]}
      >
        {children}
      </h3>
    )
  }
}

export function CardDescription(handle: Handle<Props<'p'>>): () => RemixNode {
  return () => {
    let { children, mix, ...paragraphProps } = handle.props

    return (
      <p
        {...paragraphProps}
        data-slot="card-description"
        mix={[fontSm, textSecondary, css({ margin: 0 }), mix]}
      >
        {children}
      </p>
    )
  }
}

export function CardAction(handle: Handle<Props<'div'>>): () => RemixNode {
  return () => {
    let { children, mix, ...divProps } = handle.props

    return (
      <div
        {...divProps}
        data-slot="card-action"
        mix={[
          css({
            display: 'flex',
            gridColumn: '2',
            gridRow: '1',
            justifySelf: 'end',
          }),
          mix,
        ]}
      >
        {children}
      </div>
    )
  }
}

export function CardContent(handle: Handle<Props<'div'>>): () => RemixNode {
  return () => {
    let { children, mix, ...divProps } = handle.props

    return (
      <div
        {...divProps}
        data-slot="card-content"
        mix={[css({ minWidth: 0, paddingInline: '20px' }), mix]}
      >
        {children}
      </div>
    )
  }
}

export type CardFooterProps = Props<'div'> & { bordered?: boolean }

export function CardFooter(handle: Handle<CardFooterProps>): () => RemixNode {
  return () => {
    let { bordered = false, children, mix, ...divProps } = handle.props

    return (
      <div
        {...divProps}
        data-slot="card-footer"
        mix={[
          css({
            display: 'flex',
            alignItems: 'center',
            gap: tokens.space.sm,
            paddingInline: '20px',
          }),
          bordered
            ? css({
                paddingBlockStart: '20px',
                borderBlockStart: `1px solid ${tokens.colors.border.subtle}`,
              })
            : undefined,
          mix,
        ]}
      >
        {children}
      </div>
    )
  }
}
