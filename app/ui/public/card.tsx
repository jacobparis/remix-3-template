import { css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'

import { componentStyleValues as tokens } from './tokens.ts'

export type CardHeaderProps = {
  title: RemixNode
  titleId?: string
  description?: RemixNode
  actions?: RemixNode
}

const cardCss = css({
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.space.lg,
  minWidth: 0,
  padding: '20px',
  background: tokens.surface.lvl0,
  border: `1px solid ${tokens.colors.border.subtle}`,
  borderRadius: tokens.radius.xl,
})

const headerCss = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens.space.md,
})

const headingGroupCss = css({ display: 'grid', gap: '2px', minWidth: 0 })

const titleCss = css({
  margin: 0,
  fontSize: '15px',
  fontWeight: 600,
  lineHeight: '22px',
  color: tokens.colors.text.primary,
})

const descriptionCss = css({
  margin: 0,
  fontSize: tokens.fontSize.sm,
  lineHeight: tokens.lineHeight.relaxed,
  color: tokens.colors.text.secondary,
})

const footerCss = css({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: tokens.space.sm,
  paddingBlockStart: tokens.space.lg,
  borderBlockStart: `1px solid ${tokens.colors.border.subtle}`,
})

export function Card(handle: Handle<Props<'section'>>): () => RemixNode {
  return () => {
    let { children, mix, ...sectionProps } = handle.props

    return (
      <section {...sectionProps} mix={[cardCss, mix]}>
        {children}
      </section>
    )
  }
}

export function CardHeader(handle: Handle<CardHeaderProps>): () => RemixNode {
  return () => {
    let { title, titleId, description, actions } = handle.props

    return (
      <div mix={headerCss}>
        <div mix={headingGroupCss}>
          <h3 id={titleId} mix={titleCss}>
            {title}
          </h3>
          {description ? <p mix={descriptionCss}>{description}</p> : null}
        </div>
        {actions}
      </div>
    )
  }
}

export function CardFooter(handle: Handle<Props<'div'>>): () => RemixNode {
  return () => {
    let { children, mix, ...divProps } = handle.props

    return (
      <div {...divProps} mix={[footerCss, mix]}>
        {children}
      </div>
    )
  }
}
