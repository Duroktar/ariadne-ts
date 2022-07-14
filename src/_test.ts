import "./_extension"
import { Label } from "./lib/Label";
import { Report } from "./lib/Report";
import { ReportKind } from "./lib/ReportKind";
import { Source } from "./source";
import { format, include_str } from "./_utils";
import { Display } from "./data/Display";
import { Fixed } from "./data/Color";
import { Range } from "./data/Span";

let out = Fixed(81);

Report.build(ReportKind.Error, "sample.tao", 12)
  .with_code(3)
  .with_message("Incompatible types")
  .with_label(new Label(new Range(32, 33)).with_message("This is of type Nat"))
  .with_label(new Label(new Range(42, 45)).with_message("This is of type Str"))
  .with_note(format("Outputs of {} expressions must coerce to the same type", new Display("match").fg(out)))
  .finish()
  .print(Source.from(include_str("examples/sample.tao")))
