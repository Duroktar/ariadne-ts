import { Label, Report, ReportKind, Source, include_str } from '../src'
import { none } from '../src/data/Option'

Report.build(ReportKind.Error, none(), 34)
  .with_code(3)
  .with_message("Incompatible types")
  .with_label(Label.new([32, 33]).with_message("This is of type Nat"))
  .with_label(Label.new([42, 45]).with_message("This is of type Str"))
  .finish()
  .print(Source.from(include_str("examples/sample.tao")))
