import { Range, Span } from "../data/Span";
import { LabelInfo } from "./LabelInfo";

export class SourceGroup<S extends Span> {
  constructor(
    public src_id: string,
    public span: Range,
    public labels: LabelInfo<S>[]
  ) { }
}
