import { css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'
import * as tabs from 'remix/ui/tabs/primitives'

import { componentStyleValues as tokens } from './tokens.ts'

export { TabsChangeEvent, onTabsChange } from 'remix/ui/tabs/primitives'

const enabled = ':not(:disabled):not([aria-disabled="true"])'

const root = css({ display: 'grid', gap: 'var(--tabs-gap)', minWidth: 0 })

const sizes = {
  sm: css({ '--tabs-height': '28px', '--tabs-tab-padding': '10px', '--tabs-font-size': tokens.fontSize.xs, '--tabs-gap': tokens.space.sm }),
  default: css({ '--tabs-height': '32px', '--tabs-tab-padding': '12px', '--tabs-font-size': tokens.fontSize.sm, '--tabs-gap': tokens.space.md }),
  lg: css({ '--tabs-height': '36px', '--tabs-tab-padding': '14px', '--tabs-font-size': tokens.fontSize.md, '--tabs-gap': tokens.space.md }),
}

const listReset = css({
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  border: 0,
  borderRadius: 0,
  background: 'transparent',
  boxShadow: 'none',
})

const listBase = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '2px',
  width: 'max-content',
  maxWidth: '100%',
  minHeight: 'var(--tabs-height)',
  overflowX: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
  '&[aria-disabled="true"]': { opacity: 0.55 },
})

// A list variant styles itself and hands its tabs their look through custom properties, so a
// Tab never needs its own variant prop.
const listVariants = {
  default: css({
    '--tabs-inset': '3px',
    '--tabs-tab-radius': '6px',
    '--tabs-active-background': tokens.surface.lvl0,
    '--tabs-active-shadow': `0 0 0 0.5px ${tokens.colors.border.subtle}, ${tokens.shadow.sm}`,
    padding: 'var(--tabs-inset)',
    borderRadius: tokens.radius.md,
    background: tokens.surface.lvl3,
  }),
  underline: css({
    '--tabs-inset': '0px',
    '--tabs-tab-radius': '0px',
    '--tabs-active-background': 'transparent',
    '--tabs-active-shadow': `inset 0 -2px 0 ${tokens.colors.text.primary}`,
    gap: tokens.space.md,
    width: '100%',
    boxShadow: `inset 0 -1px 0 ${tokens.colors.border.subtle}`,
  }),
}

const tabReset = css({
  appearance: 'none',
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  border: 0,
  borderRadius: 0,
  background: 'transparent',
  boxShadow: 'none',
  outline: 'none',
  color: 'inherit',
  font: 'inherit',
  letterSpacing: 'inherit',
  textDecoration: 'none',
})

const tab = css({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: tokens.space.xs,
  height: 'calc(var(--tabs-height) - var(--tabs-inset) * 2)',
  paddingInline: 'var(--tabs-tab-padding)',
  borderRadius: 'var(--tabs-tab-radius)',
  color: tokens.colors.text.secondary,
  fontSize: 'var(--tabs-font-size)',
  lineHeight: '20px',
  fontWeight: tokens.fontWeight.medium,
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'color 120ms, background-color 120ms, box-shadow 120ms',
  [`&[data-state="inactive"]:hover${enabled}`]: { color: tokens.colors.text.primary },
  '&[data-state="active"]': {
    background: 'var(--tabs-active-background)',
    boxShadow: 'var(--tabs-active-shadow)',
    color: tokens.colors.text.primary,
  },
  '&:focus-visible': { outline: `2px solid ${tokens.colors.focus.ring}`, outlineOffset: '1px' },
  '&:disabled, &[aria-disabled="true"]': { cursor: 'not-allowed', opacity: 0.55 },
  '& svg': { flexShrink: 0, width: '14px', height: '14px' },
})

const panel = css({
  minWidth: 0,
  color: tokens.colors.text.primary,
  fontSize: tokens.fontSize.sm,
  lineHeight: '20px',
  '&:focus-visible': { outline: `2px solid ${tokens.colors.focus.ring}`, outlineOffset: '2px' },
  '&[hidden]': { display: 'none' },
})

export type TabsSize = keyof typeof sizes
export type TabListVariant = keyof typeof listVariants

export interface TabsProps extends Omit<Props<'div'>, 'children'> {
  activeTab?: string
  children?: RemixNode
  defaultActiveTab?: string
  disabled?: boolean
  onActiveTabChange?: (activeTab: string) => void
  size?: TabsSize
}

export interface TabListProps extends Omit<Props<'div'>, 'children'> {
  children?: RemixNode
  variant?: TabListVariant
}

export interface TabProps extends Omit<Props<'button'>, 'children' | 'type'> {
  children?: RemixNode
  disabled?: boolean
  name: string
  type?: 'button' | 'submit' | 'reset'
}

export interface TabPanelProps extends Omit<Props<'div'>, 'children'> {
  children?: RemixNode
  name: string
}

export function Tabs(handle: Handle<TabsProps>): () => RemixNode {
  return () => {
    let { activeTab, children, defaultActiveTab, disabled, mix, onActiveTabChange, size = 'default', ...divProps } =
      handle.props

    return (
      <tabs.Context
        activeTab={activeTab}
        defaultActiveTab={defaultActiveTab}
        disabled={disabled}
        onActiveTabChange={onActiveTabChange}
      >
        <div {...divProps} mix={[root, sizes[size], tabs.root(), mix]}>
          {children}
        </div>
      </tabs.Context>
    )
  }
}

export function TabList(handle: Handle<TabListProps>): () => RemixNode {
  return () => {
    let { children, mix, variant = 'default', ...divProps } = handle.props

    return (
      <div {...divProps} mix={[listReset, listBase, listVariants[variant], tabs.list(), mix]}>
        {children}
      </div>
    )
  }
}

export function Tab(handle: Handle<TabProps>): () => RemixNode {
  return () => {
    let { children, disabled, mix, name, type, ...buttonProps } = handle.props

    return (
      <button
        {...buttonProps}
        mix={[tabReset, tab, tabs.tab({ disabled, name }), mix]}
        type={type ?? 'button'}
      >
        {children}
      </button>
    )
  }
}

export function TabPanel(handle: Handle<TabPanelProps>): () => RemixNode {
  return () => {
    let { children, mix, name, ...divProps } = handle.props

    return (
      <div {...divProps} mix={[panel, tabs.panel({ name }), mix]}>
        {children}
      </div>
    )
  }
}
