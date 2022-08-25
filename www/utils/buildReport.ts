import { Label, mkStringWriter, Range, Report, ReportKind, Source } from "@ariadne-ts/browser"
import { ErrorKind } from "../schema/builderForm"
import { BuilderState } from "../types"

export function buildReport(state: BuilderState, source: string): string {

  const writer = mkStringWriter();

  const reportKind = getReportKind(state.errorKind);

  let builder = Report.build(reportKind, state.src_id, state.offset)
    .with_message(state.message)

  state.labels.forEach(data => {
    if (data !== undefined && data.range) {
      if (state.src_id) {
        let label = Label.from([state.src_id, Range.new(...data.range)])
        if (data.message) {
          label = label.with_message(data.message)
        }
        builder = builder.with_label(label)
      }
      else {
        let label = Label.from(data.range)
        if (data.message) {
          label = label.with_message(data.message)
        }
        builder = builder.with_label(label)
      }
    }
  })

  if (state.code)
    builder = builder.with_code(state.code)

  if (state.note)
    builder = builder.with_note(state.note)

  let report = builder.finish()

  if (state.src_id)
    report.printTo([state.src_id, Source.from(source)], writer)
  else
    report.printTo(Source.from(source), writer)

  return writer.unwrap()
}

function getReportKind(reportKind: ErrorKind): typeof ReportKind {
  switch(reportKind) {
    case ErrorKind.Advice: return ReportKind.Advice
    case ErrorKind.Custom: return ReportKind._Custom
    case ErrorKind.Error: return ReportKind.Error
    case ErrorKind.Warning: return ReportKind.Warning
    default:
      throw new Error('Unknown report kind: ' + reportKind)
  }
}
