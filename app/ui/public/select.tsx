import { css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'
import * as popover from 'remix/ui/popover'
import * as select from 'remix/ui/select/primitives'

import { ChevronVerticalIcon } from './icons.tsx'
import { ListboxList, ListboxOption } from './listbox.tsx'
import { PopoverSurface } from './popover.tsx'
import { componentStyleValues as tokens } from './tokens.ts'

type SearchValue = string | string[]

const enabled = ':not(:disabled):not([aria-disabled="true"])'
const focusRing = `inset 0 0 0 1px ${tokens.colors.focus.ring}, 0 0 0 3px light-dark(rgb(26 114 255 / 0.16), rgb(110 170 255 / 0.22))`

const reset = css({
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
  textShadow: 'none',
})

const base = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  width: '100%',
  minWidth: 0,
  paddingInlineEnd: tokens.space.sm,
  borderRadius: tokens.radius.md,
  color: tokens.colors.text.primary,
  fontSize: tokens.fontSize.sm,
  lineHeight: '20px',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  transition: 'background-color 120ms, box-shadow 120ms',
  '&:focus-visible, &[aria-expanded="true"]': { boxShadow: focusRing },
  '&:disabled': { cursor: 'not-allowed', opacity: 0.55 },
})

const variants = {
  default: css({
    background: tokens.surface.lvl0,
    boxShadow: `inset 0 0 0 1px ${tokens.colors.border.default}, ${tokens.shadow.xs}`,
    [`&:hover${enabled}`]: { background: tokens.colors.action.secondary.backgroundHover },
  }),
  ghost: css({
    [`&:hover${enabled}`]: { background: 'light-dark(rgb(16 16 16 / 0.05), rgb(236 236 236 / 0.1))' },
  }),
}

const sizes = {
  sm: css({ height: tokens.control.height.sm, paddingInlineStart: '10px' }),
  default: css({ height: tokens.control.height.md, paddingInlineStart: tokens.space.md }),
  lg: css({ height: tokens.control.height.lg, paddingInlineStart: '14px' }),
}

const label = css({ flex: '1 1 auto', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' })

const icon = css({ flex: 'none', width: '16px', height: '16px', color: tokens.colors.text.muted })

export type SelectVariant = keyof typeof variants
export type SelectSize = keyof typeof sizes

export interface SelectProps extends Omit<Props<'button'>, 'children' | 'name'> {
  children?: RemixNode
  defaultLabel: string
  defaultValue?: string | null
  disabled?: boolean
  name?: string
  variant?: SelectVariant
  size?: SelectSize
}

export type SelectOptionProps = Props<'div'> & {
  children?: RemixNode
  disabled?: boolean
  label: string
  textValue?: SearchValue
  value: string
}

function SelectLabel(handle: Handle): () => RemixNode {
  let context = handle.context.get(select.Context)

  return () => <span mix={label}>{context.displayedLabel}</span>
}

export function Select(handle: Handle<SelectProps>): () => RemixNode {
  return () => {
    let { children, defaultLabel, defaultValue, disabled, name, mix, variant = 'default', size = 'default', ...buttonProps } =
      handle.props

    return (
      <select.Context defaultLabel={defaultLabel} defaultValue={defaultValue} disabled={disabled} name={name}>
        <button
          type="button"
          {...buttonProps}
          mix={[reset, base, variants[variant], sizes[size], select.trigger(), mix]}
        >
          <SelectLabel />
          <ChevronVerticalIcon mix={icon} />
        </button>
        <popover.Context>
          <PopoverSurface mix={select.popover()}>
            <ListboxList mix={select.list()}>{children}</ListboxList>
          </PopoverSurface>
        </popover.Context>
        {name && <input mix={select.hiddenInput()} />}
      </select.Context>
    )
  }
}

export function SelectOption(handle: Handle<SelectOptionProps>): () => RemixNode {
  return () => {
    let { label: optionLabel, value, disabled, textValue, children, mix, ...divProps } = handle.props

    return (
      <ListboxOption
        {...divProps}
        mix={[select.option({ value, label: optionLabel, disabled, textValue }), mix]}
      >
        {children ?? optionLabel}
      </ListboxOption>
    )
  }
}
