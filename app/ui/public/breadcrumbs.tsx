import { css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'

import { ChevronRightIcon } from './icons.tsx'
import { componentStyleValues as tokens } from './tokens.ts'

const root = css({ minWidth: 0 })

const listReset = css({ margin: 0, padding: 0, listStyle: 'none' })

const list = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: `${tokens.space.xs} 6px`,
  minWidth: 0,
  fontSize: tokens.fontSize.sm,
  lineHeight: tokens.lineHeight.sm,
})

const item = css({ display: 'inline-flex', alignItems: 'center', minWidth: 0 })

const separatorStyle = css({
  display: 'inline-flex',
  flexShrink: 0,
  width: '14px',
  height: '14px',
  color: tokens.colors.text.muted,
  '& > svg': { display: 'block', width: '100%', height: '100%' },
})

const linkReset = css({ color: 'inherit', font: 'inherit', textDecoration: 'none' })

const link = css({
  color: tokens.colors.text.secondary,
  whiteSpace: 'nowrap',
  borderRadius: '4px',
  transition: 'color 120ms',
  '&:hover': { color: tokens.colors.text.primary },
  '&:focus-visible': { outline: `2px solid ${tokens.colors.focus.ring}`, outlineOffset: '2px' },
})

const text = css({ color: tokens.colors.text.secondary, whiteSpace: 'nowrap' })

const current = css({
  color: tokens.colors.text.primary,
  fontWeight: tokens.fontWeight.medium,
  whiteSpace: 'nowrap',
})

export type BreadcrumbItem = {
  current?: boolean
  href?: string
  label: RemixNode
}

export type BreadcrumbsProps = Omit<Props<'nav'>, 'children'> & {
  items: BreadcrumbItem[]
  separator?: RemixNode
}

export function Breadcrumbs(handle: Handle<BreadcrumbsProps>): () => RemixNode {
  return () => {
    let { 'aria-label': ariaLabel, items, separator, mix, ...navProps } = handle.props
    let currentIndex = items.findIndex((entry) => entry.current)
    if (currentIndex === -1) currentIndex = Math.max(0, items.length - 1)

    return (
      <nav aria-label={ariaLabel ?? 'Breadcrumb'} {...navProps} mix={[root, mix]}>
        <ol mix={[listReset, list]}>
          {items.flatMap((entry, index) => {
            let content =
              index === currentIndex ? (
                <span aria-current="page" mix={current}>
                  {entry.label}
                </span>
              ) : entry.href ? (
                <a href={entry.href} mix={[linkReset, link]}>
                  {entry.label}
                </a>
              ) : (
                <span mix={text}>{entry.label}</span>
              )

            let nodes: RemixNode[] = [
              <li key={`item-${index}`} mix={item}>
                {content}
              </li>,
            ]

            if (index < items.length - 1) {
              nodes.push(
                <li key={`separator-${index}`} aria-hidden="true" mix={separatorStyle}>
                  {separator ?? <ChevronRightIcon />}
                </li>,
              )
            }

            return nodes
          })}
        </ol>
      </nav>
    )
  }
}
