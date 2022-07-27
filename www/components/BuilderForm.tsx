// Render Prop
import * as React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { builderFormSchema, BuilderForm as BuilderFormType, ErrorKind } from '../schema/builderForm';
import { buildReport } from '../utils/buildReport';
import { useStore } from '../store';
import { LabelForm } from './LabelForm';
import { builderFormDefaultValues, builderFormDevelopmentValues } from 'www/fixtures';
import { compileBuilder } from 'www/utils/compileBuilder';

export const BuilderForm = () => {
    const builderFormValues = React.useRef(builderFormDevelopmentValues)
    const formikRef = React.useRef<any>(null)
    const [labelIds, setLabelIds] = React.useState<number[]>([])
    const source = useStore(state => state.sourceString)
    const setOutputString = useStore(state => state.setOutputString)

    const compileForm = () => {
        setTimeout(() => {
            const form = formikRef.current?.values
            if (form) {
                try {
                    const output = compileBuilder(form, source)
                    navigator.clipboard.writeText(output)
                } finally {}
            }
        }, 5)
    }

    const updateForm = () => {
        setTimeout(() => {
            const form = formikRef.current?.values
            if (form) {
                try {
                    const output = buildReport(form, source)
                    setOutputString(output)
                } finally {}
            }
        }, 5)
    }

    React.useEffect(() => {
        setLabelIds(builderFormValues.current.labels.map((_, id) => id))
        updateForm()
    }, [])

    return (
        <Formik<BuilderFormType>
            initialValues={builderFormValues.current}
            validationSchema={builderFormSchema}
            innerRef={formikRef}
            onSubmit={updateForm}
        >
            {({ setFieldValue }) => (
                <Form onChange={updateForm}>
                    <article>
                        <label>
                            <span>Error Kind</span>
                            <Field as="select" name="errorKind">
                                {Object.values(ErrorKind).map(kind => (
                                    <option key={kind} value={kind}>{kind}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="errorKind" component="div" />
                        </label>
                        <label>
                            <span>Code?</span>
                            <Field type="number" name="code" />
                            <ErrorMessage name="code" component="div" />
                        </label>
                        <div className="formfield">
                            <label>
                                <span>Message</span>
                                <Field component="textarea" name="message" />
                                <ErrorMessage name="message" component="div" />
                            </label>
                        </div>
                        <label>
                            <span>SourceId</span>
                            <Field type="text" name="src_id" />
                            <ErrorMessage name="src_id" component="div" />
                        </label>
                        <label>
                            <span>Offset</span>
                            <Field type="number" name="offset" />
                            <ErrorMessage name="offset" component="div" />
                        </label>
                        <div className="formfield">
                            <label>
                                <span>Note?</span>
                                <Field component="textarea" name="note" />
                                <ErrorMessage name="note" component="div" />
                            </label>
                        </div>

                        <button
                            className="add-label"
                            onClick={e => {
                                e.preventDefault()
                                setLabelIds(ids => [...ids, ids.length])
                            }}
                        >
                            Add Label +
                        </button>

                        <button
                            className="compile"
                            onClick={e => {
                                e.preventDefault()
                                compileForm()
                            }}
                        >
                            Compile to Clipboard
                        </button>

                    </article>

                    {labelIds.map((id) => {

                        if (id === undefined)
                            return null

                        return (
                            <LabelForm
                                key={id}
                                namespace={id}
                                setFieldValue={(...args: [field: string, value: any, shouldValidate?: boolean | undefined]) => {
                                    setFieldValue(...args)
                                    updateForm()
                                }}
                                handleDelete={() => {
                                    setFieldValue(`labels[${id}]`, undefined)
                                    setLabelIds(state => state.map(idx => idx === id ? (undefined as any) : idx))
                                    updateForm()
                                }}
                            />
                        )
                    })}

                    <br />
                </Form>
            )}
        </Formik>
    )
};
