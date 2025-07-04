import { none, type Option } from "./Option.js";
import { stdoutWriter, mkStringWriter, type Write } from "./Write.js";

export enum Alignment {
  Left = 'Left',
  Right = 'Right',
  Center = 'Center',
}

export interface Formatter {
  flags: number
  fill: string
  align: Alignment
  width: Option<number>
  precision: Option<number>
  buf: Write
}

export const formatter = new class implements Formatter {
  flags: number = 0;
  fill: string = '';
  align: Alignment = Alignment.Left;
  width: Option<number> = none();
  precision: Option<number> = none();
  buf: Write = stdoutWriter;
};

export const stringFormatter = () => new class implements Formatter {
  flags: number = 0;
  fill: string = '';
  align: Alignment = Alignment.Left;
  width: Option<number> = none();
  precision: Option<number> = none();
  buf = mkStringWriter();
  unwrap() { return this.buf.unwrap(); }
};
