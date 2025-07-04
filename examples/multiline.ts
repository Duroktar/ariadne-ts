import { Fixed, Label, Range, Report, ReportKind, Source, include_str, ColorGenerator, Display, format, Config } from '../src'

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
    .with_label(Label.from(["sample.tao", new Range(11, 49)])
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
    .with_label(Label.from(["sample.tao", new Range(50, 75)])
        .with_message(format(
            "Usage of {} inside here",
            new Display("definition").fg(out2),
        )))
    .with_label(Label.from(["sample.tao", new Range(64, 68)])
        .with_message(format(
            "Usage of {} here",
            new Display("definition").fg(out2),
        ))
        .with_color(out2))
    .with_note(format("Outputs of {} expressions must coerce to the same type", new Display("match").fg(out)))
    .with_config(Config.default()
        // .with_cross_gap(false)
        // .with_compact(true)
        // .with_underlines(false)
        // .with_multiline_arrows(false)
        .with_tab_width(4))
    .finish()
    .print(["sample.tao", Source.from(include_str("examples/sample.tao"))])
