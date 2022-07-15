import { Report, ReportKind, Label, Range, include_str } from "../src";
import { Display } from "../src/data/Display";
import { ColorGenerator } from "../src/draw";
import { sources } from "../src/lib/Source";
import { format } from "../src/_utils";

let colors = ColorGenerator.new();

// Generate some colours for each of our elements
let a = colors.next();
let b = colors.next();
let c = colors.next();

Report.build(ReportKind.Error, "b.tao", 10)
    .with_code(3)
    .with_message(format!("Cannot add types Nat and Str"))
    .with_label(Label.new(["b.tao", new Range(10, 14)])
        .with_message(format!("This is of type {}", new Display("Nat").fg(a)))
        .with_color(a))
    .with_label(Label.new(["b.tao", new Range(17, 20)])
        .with_message(format!("This is of type {}", new Display("Str").fg(b)))
        .with_color(b))
    .with_label(Label.new(["b.tao", new Range(15, 16)])
        .with_message(format!(" {} and {} undergo addition here", new Display("Nat").fg(a), new Display("Str").fg(b)))
        .with_color(c)
        .with_order(10))
    .with_label(Label.new(["a.tao", new Range(4, 8)])
        .with_message(format!("Original definition of {} is here", new Display("five").fg(a)))
        .with_color(a))
    .with_note(format!("{} is a number and can only be added to other numbers", new Display("Nat").fg(a)))
    .finish()
    .print(sources([
        ["a.tao", include_str("examples/a.tao")],
        ["b.tao", include_str("examples/b.tao")],
    ]))
