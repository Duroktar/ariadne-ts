import { Config } from "./Config";
import { Label, ToString } from "./Label";
import { iReport, Report } from "./Report";
import { ReportKind } from "./ReportKind";
import { Span } from "../data/Span";
import { Option, some } from "../data/Option";

/// A type used to build a [`Report`].
// pub struct ReportBuilder<S: Span> {

export interface iReportBuilder<S extends Span> {
  kind: ReportKind;
  code: string;
  msg: string;
  note: string;
  help: string;
  location: [S['SourceId'] /* ::Owned */, number];
  labels: Label<S>[];
  config: Config;
}

export class ReportBuilder<S extends Span> {
  constructor(
    private kind: typeof ReportKind,
    private code: Option<string>,
    private msg: Option<string>,
    private note: Option<string>,
    private help: Option<string>,
    private location: [S['SourceId'], number],
    private labels: Label<S>[],
    private config: Config
  ) { }
  /// Give this report a numerical code that may be used to more precisely look up the error in documentation.
  with_code(code: ToString): this {
    this.code = some(code.toString().padStart(2, '0'));
    return this;
  }

  /// Set the message of this report.
  set_message(msg: ToString) {
    this.msg = some(msg.toString());
  }

  /// Add a message to this report.
  with_message(msg: ToString): this {
    this.msg = some(msg.toString());
    return this;
  }

  /// Set the note of this report.
  set_note(note: ToString) {
    this.note = some(note.toString());
  }

  /// Set the note of this report.
  with_note(note: ToString): this {
    this.set_note(note);
    return this;
  }

  /// Set the help message of this report.
  set_help(note: ToString) {
    this.help = some(note.toString());
  }

  /// Set the help message of this report.
  with_help(note: ToString): this {
    this.set_help(note);
    return this;
  }

  /// Add a label to the report.
  add_label(label: Label<S>) {
    this.labels.push(label);
  }

  /// Add multiple labels to the report.
  add_labels(labels: Label<S>[]) {
    this.labels.push(...labels);
  }

  /// Add a label to the report.
  with_label(label: Label<S>): this {
    this.add_label(label);
    return this;
  }

  /// Use the given [`Config`] to determine diagnostic attributes.
  with_config(config: Config): this {
    this.config = config;
    return this;
  }

  /// Finish building the [`Report`].
  finish(): iReport<S> {
    const r = new Report<S>(
      this.kind,
      this.code,
      this.msg,
      this.note,
      this.help,
      this.location,
      this.labels,
      this.config
    );
    return r;
  }
}
