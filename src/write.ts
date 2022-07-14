
import { Label } from "./lib/Label";
import { Span, Range } from "./data/Span";

export enum LabelKind {
  Inline = 'Inline',
  Multiline = 'Multiline',
}

export class LabelInfo<S extends Range> {
  constructor(
    public kind: LabelKind,
    public label: Label<S>,
  ) {}
}

export class SourceGroup<S extends Span> {
  constructor(
    public src_id: string,
    public span: Range,
    public labels: LabelInfo<S>[],
  ) {}
}
