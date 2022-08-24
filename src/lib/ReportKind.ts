
import { Formatter } from "../data/Formatter";
import { none, Option } from "../data/Option";
import { write } from "../write";
import { ColorFn } from "./Color";

/// A type that defines the kind of report being produced.

export class ReportKind {
  static displayName: string = ReportKind.name
  public color: Option<ColorFn> = none()
  constructor(...args: any[]) {}
  fmt(f: Formatter): any {
    if (this instanceof ReportKind.Error)
      return write(f.buf, "Error");
    if (this instanceof ReportKind.Warning)
      return write(f.buf, "Warning");
    if (this instanceof ReportKind.Advice)
      return write(f.buf, "Advice");
    if (this instanceof ReportKind._Custom)
      return write(f.buf, "{}", this.s);
    throw 'invalid ReportKind';
  }
  /// The report is an error and indicates a critical problem that prevents the program performing the requested
  /// action.
  static Error = class Error extends ReportKind { };
  /// The report is a warning and indicates a likely problem, but not to the extent that the requested action cannot
  /// be performed.
  static Warning = class Warning extends ReportKind { };
  /// The report is advice to the user about a potential anti-pattern of other benign issues.
  static Advice = class Advice extends ReportKind { };
  /// The report is of a kind not built into Ariadne.
  static Custom = (name: string, s?: any, color?: ColorFn) => {
    return class extends ReportKind._Custom {
      static displayName: string = name;
      static color: Option<ColorFn> = Option.from(color);
      constructor() {
        super(s, color);
      }
    }
  }
  static _Custom = class Custom extends ReportKind {
    static displayName = Custom.name;
    static color: Option<ColorFn> = none();
    constructor(
      public s: any,
      public color: any,
    ) {
      super()
    }
  };
}
