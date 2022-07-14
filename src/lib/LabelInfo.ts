
import { Range } from "../data/Span";
import { Label } from "./Label";

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
