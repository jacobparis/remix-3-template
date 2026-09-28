import { css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'
import checkbox from 'remix/ui/checkbox'
import input from 'remix/ui/input'
import radio from 'remix/ui/radio'
import toggle from 'remix/ui/toggle'

import { fontMedium, fontSm, fontXs, textPrimary, textSecondary } from './text.ts'
import { componentStyleValues as tokens } from './tokens.ts'

export type FieldProps = {
  label: RemixNode
  controlId?: string
  labelId?: string
  children: RemixNode
}

export type TextFieldProps = Props<'input'> & { id: string; label: RemixNode }

export type FieldsetProps = { legend: RemixNode; children: RemixNode }

export type ChoiceFieldProps = Props<'input'> & { label: RemixNode }

export type ToggleFieldProps = Props<'input'> & { label: RemixNode; description?: RemixNode }

export function Field(handle: Handle<FieldProps>): () => RemixNode {
  return () => {
    let { label, controlId, labelId, children } = handle.props

    return (
      <div mix={css({ display: 'grid', gap: '6px', minWidth: 0 })}>
        <label for={controlId} id={labelId} mix={[fontXs, fontMedium, textSecondary]}>
          {label}
        </label>
        {children}
      </div>
    )
  }
}

export function TextField(handle: Handle<TextFieldProps>): () => RemixNode {
  return () => {
    let { id, label, mix, ...inputProps } = handle.props

    return (
      <Field label={label} controlId={id}>
        <input {...inputProps} id={id} mix={[input(), mix]} />
      </Field>
    )
  }
}

export function Fieldset(handle: Handle<FieldsetProps>): () => RemixNode {
  return () => (
    <fieldset
      mix={css({
        display: 'grid',
        gap: tokens.space.sm,
        minWidth: 0,
        margin: 0,
        padding: 0,
        border: 0,
      })}
    >
      <legend mix={[fontXs, fontMedium, textSecondary, css({ padding: 0 })]}>
        {handle.props.legend}
      </legend>
      <div mix={css({ display: 'flex', flexWrap: 'wrap', gap: tokens.space.lg })}>
        {handle.props.children}
      </div>
    </fieldset>
  )
}

export function CheckboxField(handle: Handle<ChoiceFieldProps>): () => RemixNode {
  return () => {
    let { label, mix, ...inputProps } = handle.props

    return (
      <label
        mix={[
          fontSm,
          textPrimary,
          css({ display: 'flex', alignItems: 'center', gap: tokens.space.sm, cursor: 'pointer' }),
        ]}
      >
        <input {...inputProps} mix={[checkbox(), mix]} />
        {label}
      </label>
    )
  }
}

export function RadioField(handle: Handle<ChoiceFieldProps>): () => RemixNode {
  return () => {
    let { label, mix, ...inputProps } = handle.props

    return (
      <label
        mix={[
          fontSm,
          textPrimary,
          css({ display: 'flex', alignItems: 'center', gap: tokens.space.sm, cursor: 'pointer' }),
        ]}
      >
        <input {...inputProps} mix={[radio(), mix]} />
        {label}
      </label>
    )
  }
}

export function ToggleField(handle: Handle<ToggleFieldProps>): () => RemixNode {
  return () => {
    let { label, description, mix, ...inputProps } = handle.props

    return (
      <label
        mix={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: tokens.space.lg,
          cursor: 'pointer',
        })}
      >
        <span mix={css({ display: 'grid', gap: '2px' })}>
          <span mix={[fontSm, fontMedium, textPrimary]}>{label}</span>
          {description ? <span mix={[fontSm, textSecondary]}>{description}</span> : null}
        </span>
        <input {...inputProps} mix={[toggle(), mix]} />
      </label>
    )
  }
}
