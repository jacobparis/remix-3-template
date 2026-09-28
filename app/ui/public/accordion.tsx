import { createElement, css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'
import * as accordion from 'remix/ui/accordion/primitives'
import { spring } from 'remix/ui/animation'

import { ChevronDownIcon } from './icons.tsx'
import { componentStyleValues as tokens } from './tokens.ts'

export { AccordionChangeEvent, onAccordionChange } from 'remix/ui/accordion/primitives'

const transition = spring()

const root = css({ display: 'flex', flexDirection: 'column', minWidth: 0 })

// Item dividers are custom properties so a root variant can change them for every item.
const variants = {
  default: css({ '--accordion-divider': `1px solid ${tokens.colors.border.subtle}` }),
  plain: css({ '--accordion-divider': '0 solid transparent' }),
}

const item = css({
  minWidth: 0,
  borderBlockEnd: 'var(--accordion-divider)',
  '&:last-child': { borderBlockEnd: 0 },
})

const heading = css({ margin: 0, minWidth: 0, font: 'inherit' })

const triggerReset = css({
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
  textAlign: 'left',
})

const trigger = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens.space.md,
  width: '100%',
  paddingBlock: tokens.space.md,
  color: tokens.colors.text.primary,
  fontSize: tokens.fontSize.sm,
  lineHeight: '20px',
  fontWeight: tokens.fontWeight.medium,
  cursor: 'pointer',
  '&:hover:not(:disabled) > span:first-child': { textDecorationLine: 'underline' },
  '&:focus-visible': {
    outline: `2px solid ${tokens.colors.focus.ring}`,
    outlineOffset: '2px',
    borderRadius: tokens.radius.md,
  },
  '&:disabled': { cursor: 'not-allowed', opacity: 0.55 },
  '& > span:first-child': { minWidth: 0 },
})

const indicator = css({
  display: 'inline-flex',
  flexShrink: 0,
  width: '14px',
  height: '14px',
  color: tokens.colors.text.muted,
  transition: `transform ${transition}`,
  '& > svg': { display: 'block', width: '100%', height: '100%' },
  '&[data-state="open"]': { transform: 'rotate(180deg)' },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
})

const panel = css({
  display: 'grid',
  gridTemplateRows: '0fr',
  transition: `grid-template-rows ${transition}`,
  '&[data-state="open"]': { gridTemplateRows: '1fr' },
  '&[data-state="closed"]': { pointerEvents: 'none' },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
})

const panelClip = css({ minHeight: 0, overflow: 'hidden' })

const body = css({
  display: 'flow-root',
  paddingBlockEnd: tokens.space.md,
  color: tokens.colors.text.secondary,
  fontSize: tokens.fontSize.sm,
  lineHeight: tokens.lineHeight.relaxed,
  '& > :first-child': { marginTop: 0 },
  '& > :last-child': { marginBottom: 0 },
})

export type AccordionVariant = keyof typeof variants

type AccordionBaseProps = Omit<Props<'div'>, 'children'> & {
  children?: RemixNode
  disabled?: boolean
  headingLevel?: accordion.AccordionHeadingLevel
  variant?: AccordionVariant
}

export type AccordionSingleProps = AccordionBaseProps & {
  type?: 'single'
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  collapsible?: boolean
}

export type AccordionMultipleProps = AccordionBaseProps & {
  type: 'multiple'
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps

export type AccordionItemProps = Omit<Props<'div'>, 'children'> & {
  children?: RemixNode
  disabled?: boolean
  value: string
}

export type AccordionTriggerProps = Omit<Props<'button'>, 'children' | 'type'> & {
  children?: RemixNode
  indicator?: RemixNode | null
  type?: 'button' | 'submit' | 'reset'
}

export type AccordionContentProps = Omit<Props<'div'>, 'children'> & { children?: RemixNode }

export function Accordion(handle: Handle<AccordionProps>): () => RemixNode {
  return () => {
    if (handle.props.type === 'multiple') {
      let { children, defaultValue, disabled, headingLevel, mix, onValueChange, type, value, variant = 'default', ...divProps } =
        handle.props

      return (
        <accordion.Context
          defaultValue={defaultValue}
          disabled={disabled}
          headingLevel={headingLevel}
          onValueChange={onValueChange}
          type={type}
          value={value}
        >
          <div {...divProps} mix={[root, variants[variant], accordion.root(), mix]}>
            {children}
          </div>
        </accordion.Context>
      )
    }

    let {
      children,
      collapsible,
      defaultValue,
      disabled,
      headingLevel,
      mix,
      onValueChange,
      type,
      value,
      variant = 'default',
      ...divProps
    } = handle.props

    return (
      <accordion.Context
        collapsible={collapsible}
        defaultValue={defaultValue}
        disabled={disabled}
        headingLevel={headingLevel}
        onValueChange={onValueChange}
        type={type}
        value={value}
      >
        <div {...divProps} mix={[root, variants[variant], accordion.root(), mix]}>
          {children}
        </div>
      </accordion.Context>
    )
  }
}

export function AccordionItem(handle: Handle<AccordionItemProps>): () => RemixNode {
  return () => {
    let { children, disabled, mix, value, ...divProps } = handle.props

    return (
      <accordion.ItemContext disabled={disabled} value={value}>
        <div {...divProps} mix={[item, accordion.item(), mix]}>
          {children}
        </div>
      </accordion.ItemContext>
    )
  }
}

export function AccordionTrigger(handle: Handle<AccordionTriggerProps>): () => RemixNode {
  return () => {
    let context = handle.context.get(accordion.ItemContext)
    let headingTag = `h${context.headingLevel}` as keyof JSX.IntrinsicElements
    let { children, disabled, indicator: indicatorContent, mix, type, ...buttonProps } = handle.props

    let button = (
      <button
        {...buttonProps}
        mix={[triggerReset, trigger, accordion.trigger({ disabled }), mix]}
        type={type ?? 'button'}
      >
        <span>{children}</span>
        {indicatorContent === null ? null : (
          <span data-state={context.open ? 'open' : 'closed'} mix={indicator}>
            {indicatorContent ?? <ChevronDownIcon />}
          </span>
        )}
      </button>
    )

    return createElement(headingTag, { mix: heading }, button)
  }
}

export function AccordionContent(handle: Handle<AccordionContentProps>): () => RemixNode {
  return () => {
    let { children, mix, ...panelProps } = handle.props

    return (
      <div {...panelProps} mix={[panel, accordion.content(), mix]}>
        <div mix={panelClip}>
          <div mix={body}>{children}</div>
        </div>
      </div>
    )
  }
}
