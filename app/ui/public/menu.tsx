import { css, ref } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'
import * as menu from 'remix/ui/menu/primitives'

import { buttonVariants } from './button.tsx'
import type { ButtonVariantOptions } from './button.tsx'
import { ChevronDownIcon, ChevronRightIcon } from './icons.tsx'
import { ListboxList, ListboxOption } from './listbox.tsx'
import type { ListboxListVariant } from './listbox.tsx'
import { PopoverSurface } from './popover.tsx'
import { componentStyleValues as tokens } from './tokens.ts'

export { MenuSelectEvent, onMenuSelect } from 'remix/ui/menu/primitives'

type SearchValue = string | string[]

const surface = css({
  '&[data-menu-submenu="true"][data-anchor-placement^="right"]': {
    marginLeft: `calc(${tokens.space.xs} * -1)`,
  },
  '&[data-menu-submenu="true"][data-anchor-placement^="left"]': { marginLeft: tokens.space.xs },
  '&[data-close-animation="none"]:not(:popover-open)': {
    transition: 'none',
    transitionBehavior: 'normal',
  },
})

const triggerLabel = css({ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis' })

export interface MenuListProps extends Props<'div'> {
  variant?: ListboxListVariant
}

type MenuListChildProps = Omit<MenuListProps, 'children'>

export interface MenuProps extends Omit<Props<'button'>, 'children'>, ButtonVariantOptions {
  children?: RemixNode
  label: RemixNode
  menuLabel?: string
}

export interface MenuItemProps extends Omit<Props<'div'>, 'children' | 'name' | 'type' | 'value'> {
  checked?: boolean
  children?: RemixNode
  disabled?: boolean
  label?: string
  name: string
  searchValue?: SearchValue
  type?: 'checkbox' | 'radio'
  value?: string
}

export interface SubmenuProps extends Omit<Props<'div'>, 'children' | 'name' | 'type' | 'value'> {
  children?: RemixNode
  disabled?: boolean
  label: RemixNode
  listProps?: MenuListChildProps
  menuLabel?: string
  searchValue?: SearchValue
  value?: string
}

// The trigger is a Button, so it takes the same `variant` and `size` props.
export function Menu(handle: Handle<MenuProps>): () => RemixNode {
  let buttonRef: HTMLButtonElement | undefined

  return () => {
    let { children, label, menuLabel, mix, type, variant = 'outline', size, ...buttonProps } =
      handle.props

    return (
      <menu.Context label={menuLabel}>
        <button
          {...buttonProps}
          type={type ?? 'button'}
          mix={[
            ...buttonVariants({ variant, size }),
            menu.trigger(),
            ref((node: HTMLButtonElement, signal) => {
              buttonRef = node
              signal.addEventListener('abort', () => {
                if (buttonRef === node) buttonRef = undefined
              })
            }),
            mix,
          ]}
        >
          <span mix={triggerLabel}>{label}</span>
          <ChevronDownIcon />
        </button>
        <MenuList
          mix={menu.onMenuSelect((event) => {
            if (!buttonRef) return
            event.stopPropagation()
            buttonRef.dispatchEvent(new menu.MenuSelectEvent(event.item))
          })}
        >
          {children}
        </MenuList>
      </menu.Context>
    )
  }
}

export function MenuList(handle: Handle<MenuListProps>): () => RemixNode {
  return () => {
    let { children, mix, variant, ...divProps } = handle.props

    return (
      <PopoverSurface mix={[surface, menu.popover()]}>
        <ListboxList {...divProps} variant={variant} mix={[menu.list(), mix]}>
          {children}
        </ListboxList>
      </PopoverSurface>
    )
  }
}

export function MenuItem(handle: Handle<MenuItemProps>): () => RemixNode {
  return () => {
    let { checked, children, disabled, label, mix, name, searchValue, type, value, ...divProps } =
      handle.props

    return (
      <ListboxOption
        {...divProps}
        mix={[menu.item({ checked, disabled, label, name, searchValue, type, value }), mix]}
      >
        {children ?? label}
      </ListboxOption>
    )
  }
}

export function Submenu(handle: Handle<SubmenuProps>): () => RemixNode {
  return () => {
    let { children, disabled, label, listProps, menuLabel, mix, searchValue, value, ...divProps } =
      handle.props

    return (
      <menu.Context label={menuLabel}>
        <ListboxOption
          {...divProps}
          end={<ChevronRightIcon />}
          mix={[menu.submenuTrigger({ disabled, searchValue, value }), mix]}
        >
          {label}
        </ListboxOption>
        <MenuList {...listProps}>{children}</MenuList>
      </menu.Context>
    )
  }
}
