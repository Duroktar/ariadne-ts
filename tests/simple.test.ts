import { expect, test } from 'vitest'
import { Label, Range, Report, ReportKind, Source, include_str } from '../src'
import { none } from '../src/data/Option'

/*
  use ariadne::{Report, ReportKind, Label, Source};

  fn main() {
      Report::build(ReportKind::Error, (), 34)
          .with_message("Incompatible types")
          .with_label(Label::new(32..33).with_message("This is of type Nat"))
          .with_label(Label::new(42..45).with_message("This is of type Str"))
          .finish()
          .print(Source::from(include_str!("sample.tao")))
          .unwrap();
  }
*/

test("simple test", () => {
  Report.build(ReportKind.Error, none(), 34)
    .with_message("Incompatible types")
    .with_label(new Label(new Range(32, 33)).with_message("This is of type Nat"))
    .with_label(new Label(new Range(42, 45)).with_message("This is of type Str"))
    .finish()
    .print(Source.from(include_str("examples/sample.tao")))

  expect(true).toEqual(true)
})
