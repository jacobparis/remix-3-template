import { css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'
import { Checkbox } from './checkbox.tsx'
import type { CheckboxProps } from './checkbox.tsx'
import { Input } from './input.tsx'
import type { InputProps } from './input.tsx'
import { Radio } from './radio.tsx'
import type { RadioProps } from './radio.tsx'
import { Toggle } from './toggle.tsx'
import type { ToggleProps } from './toggle.tsx'
import { fontMedium, fontSm, fontXs, textPrimary, textSecondary } from './text.ts'
import { componentStyleValues as tokens } from './tokens.ts'

export type FieldProps = {
  label: RemixNode
  controlId?: string
  labelId?: string
  children: RemixNode
}

export type TextFieldProps = InputProps & { id: string; label: RemixNode }

export type FieldsetProps = { legend: RemixNode; children: RemixNode }

export type CheckboxFieldProps = CheckboxProps & { label: RemixNode }

export type RadioFieldProps = RadioProps & { label: RemixNode }

export type ToggleFieldProps = ToggleProps & { label: RemixNode; description?: RemixNode }

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
    let { id, label, ...inputProps } = handle.props

    return (
      <Field label={label} controlId={id}>
        <Input {...inputProps} id={id} />
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

export function CheckboxField(handle: Handle<CheckboxFieldProps>): () => RemixNode {
  return () => {
    let { label, ...inputProps } = handle.props

    return (
      <label
        mix={[
          fontSm,
          textPrimary,
          css({ display: 'flex', alignItems: 'center', gap: tokens.space.sm, cursor: 'pointer' }),
        ]}
      >
        <Checkbox {...inputProps} />
        {label}
      </label>
    )
  }
}

export function RadioField(handle: Handle<RadioFieldProps>): () => RemixNode {
  return () => {
    let { label, ...inputProps } = handle.props

    return (
      <label
        mix={[
          fontSm,
          textPrimary,
          css({ display: 'flex', alignItems: 'center', gap: tokens.space.sm, cursor: 'pointer' }),
        ]}
      >
        <Radio {...inputProps} />
        {label}
      </label>
    )
  }
}

export function ToggleField(handle: Handle<ToggleFieldProps>): () => RemixNode {
  return () => {
    let { label, description, ...inputProps } = handle.props

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
        <Toggle {...inputProps} />
      </label>
    )
  }
}
