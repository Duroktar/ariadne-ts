import { BuilderForm, ErrorKind } from "./schema/builderForm";

export const defaultEditorSourceContent = ""

export const defaultEditorSourceDevelopmentContent = `def five = match () in {
	() => 5,
	() => "5",
}

def six =
    five
    + 1`

export const builderFormDefaultValues: BuilderForm = {
    errorKind: ErrorKind.Error,
    code: 0,
    message: '',
    note: '',
    offset: 34,
    src_id: '',
    labels: [],
};

export const builderFormDevelopmentValues: BuilderForm = {
    errorKind: ErrorKind.Error,
    code: 3,
    message: 'Incompatible types',
    note: 'Outputs of match expressions must coerce to the same type',
    offset: 34,
    src_id: 'sample.tao',
    labels: [
      {range: [32, 33], message: "This is of type Nat"},
      {range: [42, 45], message: "This is of type Str"},
    ],
};
