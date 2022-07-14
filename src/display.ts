
import { Formatter } from "./data/Formatter";
import { isOption } from "./data/Option";
import { isResult } from "./data/Result";
import { isCallback, range, write } from "./_utils";

export class Show {
  constructor(public self: any) {}
  fmt(f: Formatter): void {

    if (isOption<string>(this.self)) {
      this.self.map(x => new Show(x).fmt(f))
      return
    }
    if (isResult(this.self)) {
      this.self.map(x => new Show(x).fmt(f))
      return
    }
    if (typeof this.self === "string") {
      write(f.buf, "{}", this.self)
      return
    }
    // TODO: this is all probably wrong
    if (Array.isArray(this.self) && this.self.length === 2) {
      if (isCallback(this.self[1])) {
        for (let x of this.self[0]) {
          const func = this.self[1];
          func(f, x)
        }
      } else {
        for (let _ of range(0, this.self[1])) {
          write(f.buf, "{}", this.self[0])
        }
      }
    }
    else {
      const x = this.self[0];
      write(f.buf, "{}", x)
      return
    }
  }

  static is = (o: any): o is Show => o instanceof Show
}

export const isShow = Show.is
