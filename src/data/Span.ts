import { isNumber, isString, range } from "../_utils";

// impl Span for Range<usize> {
//     type SourceId = ();
//     fn source(&self) -> &Self::SourceId { &() }
//     fn start(&self) -> usize { self.start }
//     fn end(&self) -> usize { self.end }
// }
// impl<Id: fmt::Debug + Hash + PartialEq + Eq + ToOwned> Span for (Id, Range<usize>) {
//     type SourceId = Id;
//     fn source(&self) -> &Self::SourceId { &self.0 }
//     fn start(&self) -> usize { self.1.start }
//     fn end(&self) -> usize { self.1.end }
// }

export type SpanInit = [src: string, range: Range] | [start: number, end: number];

export class Span {
  constructor(
    private _start: number,
    private _end: number,
  ) {}
  /// The identifier used to uniquely refer to a source. In most cases, this is the fully-qualified path of the file.
  SourceId: any;

  /// Get the identifier of the source that this span refers to.
  source() { return this.SourceId }

  set start(value: number) { this._start = value };
  get start(): number { return this._start };
  set end(value: number) { this._end = value };
  get end(): number { return this._end };

  /// Get the length of this span (difference between the start of the span and the end of the span).
  len(): number {
    return this.end.saturating_sub(this.start)
  };

  /// Determine whether the span contains the given offset.
  contains(offset: number): boolean {
    // TODO: check 2 dots inclusivity -> this.start()..this.end()
    return range(this.start, this.end).includes(offset);
  };

  static is = (o: any): o is Span => o instanceof Span

  static from(o: SpanInit) {
    if (isNumber(o[0]) && isNumber(o[1]))
      return new Span(o[0], o[1])

    if (isString(o[0]) && Range.is(o[1])) {
      const s = new Span(o[1].start, o[1].end);
      s.SourceId = o[0]
      return s
    }

    throw new Error(`Invalid SpanInit`)
  }
}

export const isSpan = Span.is

export class Range extends Span {
  public SourceId: any

  public source(): any {
    return this.SourceId
  }

  public len(): number {
    return Math.abs(this.start - this.end);
  }
  public contains(item: any): boolean {
    return item >= this.start && item < this.end
  }

  static is = (o: any): o is Range => {
    return o instanceof Range
  }

  static from(o: SpanInit) {
    if (isNumber(o[0]) && isNumber(o[1]))
      return new Span(o[0], o[1])

    if (isString(o[0]) && Range.is(o[1])) {
      const s = new Range(o[1].start, o[1].end);
      s.SourceId = o[0]
      return s
    }

    throw new Error(`Invalid SpanInit`)
  }
}
