import { css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'

import { CheckIcon } from './icons.tsx'
import { componentStyleValues as tokens } from './tokens.ts'

const listReset = css({ margin: 0, padding: 0, listStyle: 'none', outline: 'none' })

const listBase = css({
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
  minHeight: 0,
  paddingBlock: tokens.space.xs,
  overflow: 'auto',
  overscrollBehavior: 'contain',
  userSelect: 'none',
  WebkitUserSelect: 'none',
})

// Highlight colors travel to every option as custom properties, so a list variant restyles
// its options without the options knowing which variant they are in.
const listVariants = {
  default: css({
    '--listbox-highlight-background': tokens.colors.action.primary.background,
    '--listbox-highlight-foreground': tokens.colors.action.primary.foreground,
  }),
  subtle: css({
    '--listbox-highlight-background': tokens.surface.lvl3,
    '--listbox-highlight-foreground': tokens.colors.text.primary,
  }),
}

const optionReset = css({
  margin: 0,
  padding: 0,
  border: 0,
  background: 'transparent',
  color: 'inherit',
  font: 'inherit',
  textAlign: 'left',
  outline: 'none',
})

const idle = ':not([data-highlighted="true"])'

const optionBase = css({
  '--listbox-indicator-opacity': '0',
  position: 'relative',
  isolation: 'isolate',
  display: 'flex',
  alignItems: 'center',
  gap: tokens.space.xs,
  boxSizing: 'border-box',
  width: '100%',
  minWidth: 0,
  minHeight: tokens.control.height.md,
  paddingInline: `calc(${tokens.space.sm} + ${tokens.space.xs})`,
  color: tokens.colors.text.primary,
  fontSize: tokens.fontSize.sm,
  lineHeight: '20px',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  scrollMarginBlock: tokens.space.xs,
  '&::before': {
    content: '""',
    position: 'absolute',
    insetBlock: 0,
    insetInline: tokens.space.xs,
    zIndex: -1,
    borderRadius: tokens.radius.md,
    pointerEvents: 'none',
  },
  '&[data-highlighted="true"]': { color: 'var(--listbox-highlight-foreground)' },
  '&[data-highlighted="true"]::before': { background: 'var(--listbox-highlight-background)' },
  [`&[aria-haspopup="menu"][aria-expanded="true"]${idle}::before, &[data-submenu-state="selecting"]::before, &[data-submenu-state="dismissing"]::before`]:
    { background: tokens.surface.lvl2 },
  '&[data-listbox-flash="true"], &[data-select-flash="true"], &[data-combobox-flash="true"], &[data-menu-flash="true"]':
    { color: tokens.colors.text.primary },
  '&[data-listbox-flash="true"]::before, &[data-select-flash="true"]::before, &[data-combobox-flash="true"]::before, &[data-menu-flash="true"]::before':
    { background: 'transparent' },
  '&[aria-selected="true"], &[aria-checked="true"]': { '--listbox-indicator-opacity': '1' },
  '&[aria-disabled="true"]': { opacity: 0.5 },
  '&[hidden]': { display: 'none' },
})

const indicator = css({
  display: 'inline-flex',
  flex: '0 0 14px',
  width: '14px',
  height: '14px',
  opacity: 'var(--listbox-indicator-opacity)',
  '& > svg': { display: 'block', width: '100%', height: '100%' },
})

const label = css({ display: 'inline-flex', alignItems: 'center', flex: '1 1 auto', minWidth: 0 })

const end = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexShrink: 0,
  minWidth: '14px',
  height: '14px',
  marginInlineStart: 'auto',
  whiteSpace: 'nowrap',
  '& > svg': { display: 'block', width: '14px', height: '14px' },
  })

export type ListboxListVariant = keyof typeof listVariants

export type ListboxListProps = Props<'div'> & { variant?: ListboxListVariant }

export type ListboxOptionProps = Props<'div'> & { end?: RemixNode }

// Pass the owning primitive's list mixin (select.list(), menu.list(), ...) through `mix`.
export function ListboxList(handle: Handle<ListboxListProps>): () => RemixNode {
  return () => {
    let { children, mix, variant = 'default', ...divProps } = handle.props

    return (
      <div {...divProps} mix={[listReset, listBase, listVariants[variant], mix]}>
        {children}
      </div>
    )
  }
}

// Pass the owning primitive's option mixin (select.option(...), menu.item(...), ...) through `mix`.
export function ListboxOption(handle: Handle<ListboxOptionProps>): () => RemixNode {
  return () => {
    let { children, end: endContent, mix, ...divProps } = handle.props

    return (
      <div {...divProps} mix={[optionReset, optionBase, mix]}>
        <span mix={indicator}>
          <CheckIcon />
        </span>
        <span mix={label}>{children}</span>
        {endContent ? <span mix={end}>{endContent}</span> : null}
      </div>
    )
  }
}
