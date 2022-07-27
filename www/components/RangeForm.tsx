import { ErrorMessage, Field } from 'formik'
import * as React from 'react'
import { useStore } from 'www/store'

export type LabelType = {
    range: [number, number]
    message?: string
}

export type LabelRangeFormProps = {
    namespace: string
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export const RangeForm = (props: LabelRangeFormProps) => {
    const selection = useStore(state => state.selection)
    const rangeStart = withNamespace(props.namespace, 0)
    const rangeEnd = withNamespace(props.namespace, 1)
    const handleClick: React.MouseEventHandler = e => {
        e.preventDefault()
        if (selection) {
            const selected = [selection.start, selection.end]
            props.setFieldValue(props.namespace, selected)
        }
    }
    return (
        <React.Fragment>
            <label>
                <span>Start</span>
                <Field type="number" name={rangeStart} />
                <ErrorMessage name={rangeStart} component="div" />
            </label>
            <label>
                <span>End</span>
                <Field type="number" name={rangeEnd} />
                <ErrorMessage name={rangeEnd} component="div" />
            </label>
            <button onClick={handleClick}>From Selection</button>
        </React.Fragment>
    )
}

function withNamespace(namespace: string, idx: number) {
    return `${namespace}[${idx}]`
}
