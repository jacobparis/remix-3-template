import { css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'
import * as combobox from 'remix/ui/combobox/primitives'

import { Input } from './input.tsx'
import type { InputSize, InputVariant } from './input.tsx'
import { ListboxList, ListboxOption } from './listbox.tsx'
import { PopoverSurface } from './popover.tsx'

type SearchValue = string | string[]

const surface = css({
  '&[data-show-reason="nav"]:not(:popover-open)': {
    transition: 'opacity 180ms ease-in, overlay 180ms ease-in, display 180ms ease-in',
    transitionBehavior: 'allow-discrete',
  },
  '&[data-show-reason="hint"]:not(:popover-open)': {
    transition: 'none',
    transitionBehavior: 'normal',
  },
})

export interface ComboboxProps extends Omit<Props<'div'>, 'children'> {
  children?: RemixNode
  defaultValue?: string | null
  disabled?: boolean
  inputId?: string
  name?: string
  placeholder?: string
  variant?: InputVariant
  size?: InputSize
}

export interface ComboboxOptionProps extends Omit<Props<'div'>, 'children'> {
  children?: RemixNode
  disabled?: boolean
  label: string
  searchValue?: SearchValue
  value: string
}

export function Combobox(handle: Handle<ComboboxProps>): () => RemixNode {
  return () => {
    let { children, defaultValue, disabled, inputId, name, placeholder, variant, size, ...divProps } =
      handle.props

    return (
      <combobox.Context defaultValue={defaultValue} disabled={disabled} name={name}>
        <div {...divProps}>
          <Input
            defaultValue={defaultValue ?? undefined}
            id={inputId}
            mix={combobox.input()}
            placeholder={placeholder}
            size={size}
            variant={variant}
          />
          <PopoverSurface mix={[surface, combobox.popover()]}>
            <ListboxList mix={combobox.list()}>{children}</ListboxList>
          </PopoverSurface>
          {name && <input mix={combobox.hiddenInput()} />}
        </div>
      </combobox.Context>
    )
  }
}

export function ComboboxOption(handle: Handle<ComboboxOptionProps>): () => RemixNode {
  return () => {
    let { children, disabled, label, mix, searchValue, value, ...divProps } = handle.props

    return (
      <ListboxOption
        {...divProps}
        mix={[combobox.option({ disabled, label, searchValue, value }), mix]}
      >
        {children ?? label}
      </ListboxOption>
    )
  }
}
