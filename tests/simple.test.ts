import { expect, test } from 'vitest'
import { include_str, Label, Range, Report, ReportKind, Source } from '../src'
import { none } from '../src/data/Option'

test("simple test", () => {
  Report.build(ReportKind.Error, none(), 34)
    .with_message("Incompatible types")
    .with_label(new Label(new Range(32, 33)).with_message("This is of type Nat"))
    .with_label(new Label(new Range(42, 45)).with_message("This is of type Str"))
    .finish()
    .print(Source.from(include_str("examples/sample.tao")))

  // TODO
  expect(true).toEqual(true)
})
