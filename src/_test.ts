import "./_extension";
import { Range } from "./data/Span";
import { Label } from "./lib/Label";
import { Report } from "./lib/Report";
import { ReportKind } from "./lib/ReportKind";
import { Source } from "./lib/Source";
import { include_str } from "./_utils";
import { none } from "./data/Option";

Report.build(ReportKind.Error, none(), 12)
  .with_code(3)
  .with_message("Incompatible types")
  .with_label(new Label(new Range(32, 33)).with_message("This is of type Nat"))
  .with_label(new Label(new Range(42, 45)).with_message("This is of type Str"))
  .finish()
  .print(Source.from(include_str("examples/sample.tao")))
