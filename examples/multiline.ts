import { Label, Range, Report, ReportKind, Source, include_str } from '../src'
import { Fixed } from '../src/data/Color';
import { Display } from '../src/data/Display';
import { ColorGenerator } from '../src/draw';
import { format } from '../src/_utils';

let colors = ColorGenerator.new();

// Generate & choose some colours for each of our elements
let a = colors.next();
let b = colors.next();
let out = Fixed(81);
let out2= colors.next();

Report.build(ReportKind.Error, "sample.tao", 12)
    .with_code(3)
    .with_message("Incompatible types")
    .with_label(Label.from(["sample.tao", new Range(32, 33)])
        .with_message(format("This is of type {}", new Display("Nat").fg(a)))
        .with_color(a))
    .with_label(Label.from(["sample.tao", new Range(42, 45)])
        .with_message(format("This is of type {}", new Display("Str").fg(b)))
        .with_color(b))
    .with_label(Label.from(["sample.tao", new Range(11, 48)])
        .with_message(format(
            "The values are outputs of this {} expression",
            new Display("match").fg(out),
        ))
        .with_color(out))
    .with_label(Label.from(["sample.tao", new Range(0, 48)])
        .with_message(format(
            "The {} has a problem",
            new Display("definition").fg(out2),
        ))
        .with_color(out2))
    .with_label(Label.from(["sample.tao", new Range(50, 76)])
        .with_message(format(
            "Usage of {} here",
            new Display("definition").fg(out2),
        ))
        .with_color(out2))
    .with_note(format("Outputs of {} expressions must coerce to the same type", new Display("match").fg(out)))
    .finish()
    .print(["sample.tao", Source.from(include_str("examples/sample.tao"))])
