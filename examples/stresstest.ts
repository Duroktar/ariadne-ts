import { Config, Color, Report, ReportKind, Label, Range, Source, include_str, ColorGenerator, format } from "../src";

const colors = ColorGenerator.new();

Report.build(ReportKind.Error, "stresstest.tao", 13)
  .with_code(3)
  .with_message(format("Incompatible types"))
  .with_label(Label.new(["stresstest.tao", Range.new(0, 1)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(1, 2)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(2, 3)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(3, 4)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(4, 5)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(5, 6)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(6, 7)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(7, 8)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(8, 9)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(9, 10)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(10, 11)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(11, 12)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(12, 13)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(13, 14)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(14, 15)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(15, 16)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(16, 17)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(17, 18)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(18, 19)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(19, 20)]).with_message("Color").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(20, 21)]).with_message("Color").with_color(colors.next()))

  .with_label(Label.new(["stresstest.tao", Range.new(18, 19)]).with_message("This is of type Nat").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(13, 16)]).with_message("This is of type Str").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(40, 41)]).with_message("This is of type Nat").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(43, 47)]).with_message("This is of type Bool").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(49, 51)]).with_message("This is of type ()").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(53, 55)]).with_message("This is of type [_]").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(25, 78)]).with_message("This is of type Str").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(81, 124)]).with_message("This is of type Nat").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(100, 126)]).with_message("This is an inner multi-line").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(106, 120)]).with_message("This is another inner multi-line").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(108, 122)]).with_message("This is *really* nested multi-line").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(110, 111)]).with_message("This is an inline within the nesting!").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(111, 112)]).with_message("And another!").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(103, 123)]).with_message("This is *really* nested multi-line").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(105, 125)]).with_message("This is *really* nested multi-line").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(112, 116)]).with_message("This is *really* nested multi-line").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(26, 100)]).with_message("Hahaha!").with_color(Color.Fixed(75)))
  .with_label(Label.new(["stresstest.tao", Range.new(85, 110)]).with_message("Oh god, no more 1").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(84, 114)]).with_message("Oh god, no more 2").with_color(colors.next()))
  .with_label(Label.new(["stresstest.tao", Range.new(89, 113)]).with_message("Oh god, no more 3").with_color(colors.next()))
  .with_config(Config.default()
    .with_cross_gap(false)
    .with_compact(true)
    .with_underlines(true)
    .with_tab_width(4))
  .finish()
  .print(["stresstest.tao", Source.from(include_str("examples/stresstest.tao"))])
