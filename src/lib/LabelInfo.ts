
import { Range } from "../data/Range.js";
import { Label } from "./Label.js";

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
