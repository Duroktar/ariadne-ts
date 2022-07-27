import { ErrorMessage, Field } from 'formik'
import * as React from 'react'
import { RangeForm } from './RangeForm'

export type LabelType = {
    range: [number, number]
    message?: string
}

export type LabelFormProps = {
    namespace: number
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
    handleDelete: () => void
}

export const LabelForm = (props: LabelFormProps) => {
    const range = withNamespace(props.namespace, 'range')
    const message = withNamespace(props.namespace, 'message')
    return (
        <article className="label-form-part">
            <div className="formfield">
                <label>
                    <span>Range</span>
                    <span className="range-form-container">
                        <RangeForm
                            setFieldValue={props.setFieldValue}
                            namespace={range}
                        />
                    </span>
                </label>
            </div>
            <div className="formfield">
                <label>
                    <span>Message</span>
                    <Field component="textarea" name={message} />
                    <ErrorMessage name={message} component="div" />
                </label>
            </div>
            <button onClick={props.handleDelete}>Delete -</button>
        </article>
    )
}

function withNamespace(namespace: number, fieldName: string) {
    return `labels[${namespace}].${fieldName}`
}
