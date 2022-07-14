import { isCallback } from "../display";
import { Color } from "./Color";
import { isOption, Option } from "./Option";

export interface Display {
  fg(color: Option<Color>): any;
  bg(color: Option<Color>): any;
  chars(): string;
  map(fn: (d: any) => any): this;
  display(): string;
  unwrap_or_else(d: () => string): string;
}

export class Display implements Display {
  public value: string
  constructor(value: string | Display) {
    this.value = typeof value === "string" ? value : value.value
  }
  fg(color: Option<Color> | Color): this {
    if (isOption(color)) {
      let func = (color.is_some() ? color.unwrap() : (a: any) => a) as any
      this.value = func(this.value)
    } else if (isCallback(color)) {
      this.value = color(this.value)
    }
    return this
  };
  bg(color: Option<Color> | Color): this {
    if (isOption(color)) {
      let func = (color.is_some() ? color.unwrap() : (a: any) => a) as any
      this.value = func(this.value)
    } else if (isCallback(color)) {
      this.value = color(this.value)
    }
    return this
  };
  chars(): string {
    return this.value
  };
  map(fn: (d: string) => string): Display {
    return new Display(fn(this.value))
  };
  display(): string {
    return this.value
  };
  toString(): string {
    return this.value
  }
  unwrap_or_else(d: () => string): string {
    return this.value ?? d()
  };

  static is = (o: any): o is Display => o instanceof Display
}

export const isDisplay = Display.is;
