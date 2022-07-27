import { mkStringWriter } from "@ariadne-ts/browser";
import { BuilderState } from "../types";

export function compileBuilder(state: BuilderState, source: string): string {

  const writer = mkStringWriter();

  writer.write_str('import { Fixed, Label, Range, Report, ReportKind, Source, ColorGenerator, Display, format, include_str } from "@ariadne-ts"')
  writer.write_char("\n")
  writer.write_char("\n")

  writer.write_fmt('Report.build(ReportKind.{}, {}, {})', state.errorKind, state.src_id ? `"${state.src_id}"` : "null", state.offset)
  writer.write_char("\n")

  if (state.code) {
    writer.write_fmt("  .with_code({})", state.code)
    writer.write_char("\n")
  }

  if (state.message) {
    writer.write_fmt('  .with_message("{}")', state.message)
    writer.write_char("\n")
  }

  state.labels.forEach(data => {
    if (data !== undefined && data.range) {
      let label = state.src_id
        ? `Label.from(["${state.src_id}", Range.new(${data.range[0]}, ${data.range[1]})])`
        : `Label.from([${data.range[0]}, ${data.range[1]}])`
      if (data.message) {
        label += `.with_message("${data.message}")`
      }
      writer.write_fmt("  .with_label({})", label)
      writer.write_char("\n")
    }
  })

  if (state.note) {
    writer.write_fmt('  .with_note("{}")', state.note)
    writer.write_char("\n")
  }

  writer.write_fmt("  .finish()", state.note)
  writer.write_char("\n")

  if (state.src_id) {
    writer.write_fmt('  .print(["{0}", Source.from(include_str("{0}"))])', state.src_id)
    writer.write_char("\n")
  } else {
    writer.write_fmt(`  .print(Source.from(include_str("{}")))`, state.src_id)
    writer.write_char("\n")
  }

  return writer.unwrap()
}
