import { css } from 'remix/ui'
import type { Handle, Props, RemixNode } from 'remix/ui'
import checkbox from 'remix/ui/checkbox'
import input from 'remix/ui/input'
import radio from 'remix/ui/radio'
import toggle from 'remix/ui/toggle'

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

const fieldCss = css({ display: 'grid', gap: '6px', minWidth: 0 })

const labelCss = css({
  fontSize: tokens.fontSize.xs,
  fontWeight: tokens.fontWeight.medium,
  color: tokens.colors.text.secondary,
})

const fieldsetCss = css({
  display: 'grid',
  gap: tokens.space.sm,
  minWidth: 0,
  margin: 0,
  padding: 0,
  border: 0,
})

const choicesCss = css({ display: 'flex', flexWrap: 'wrap', gap: tokens.space.lg })

const choiceCss = css({
  display: 'flex',
  alignItems: 'center',
  gap: tokens.space.sm,
  fontSize: tokens.fontSize.sm,
  color: tokens.colors.text.primary,
  cursor: 'pointer',
})

const toggleRowCss = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens.space.lg,
  cursor: 'pointer',
})

const toggleTextCss = css({ display: 'grid', gap: '2px' })

const toggleLabelCss = css({
  fontSize: tokens.fontSize.sm,
  fontWeight: tokens.fontWeight.medium,
  color: tokens.colors.text.primary,
})

const toggleDescriptionCss = css({
  fontSize: tokens.fontSize.sm,
  lineHeight: tokens.lineHeight.relaxed,
  color: tokens.colors.text.secondary,
})

export function Field(handle: Handle<FieldProps>): () => RemixNode {
  return () => {
    let { label, controlId, labelId, children } = handle.props

    return (
      <div mix={fieldCss}>
        <label for={controlId} id={labelId} mix={labelCss}>
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
    <fieldset mix={fieldsetCss}>
      <legend mix={labelCss}>{handle.props.legend}</legend>
      <div mix={choicesCss}>{handle.props.children}</div>
    </fieldset>
  )
}

export function CheckboxField(handle: Handle<ChoiceFieldProps>): () => RemixNode {
  return () => {
    let { label, mix, ...inputProps } = handle.props

    return (
      <label mix={choiceCss}>
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
      <label mix={choiceCss}>
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
      <label mix={toggleRowCss}>
        <span mix={toggleTextCss}>
          <span mix={toggleLabelCss}>{label}</span>
          {description ? <span mix={toggleDescriptionCss}>{description}</span> : null}
        </span>
        <input {...inputProps} mix={[toggle(), mix]} />
      </label>
    )
  }
}
