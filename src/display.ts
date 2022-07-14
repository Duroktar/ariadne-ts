
import { Formatter } from "./data/Formatter";
import { isDisplay } from "./data/Display";
import { range, write } from "./_utils";
import { isOption } from "./data/Option";
import { isResult } from "./data/Result";

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

// impl<T: Display> Display for Show<(T, usize)> {
//     fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
//         for _ in 0..self.0.1 {
//             write!(f, "{}", self.0.0)?;
//         }
//         Ok(())
//     }
// }

// impl<'a, T, F: Fn(&mut fmt::Formatter, &'a T) -> fmt::Result> Display for Show<(&'a [T], F)> {
//     fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
//         for x in self.0.0 {
//             (self.0.1)(f, x)?;
//         }
//         Ok(())
//     }
// }

// impl<T: Display> Display for Show<Option<T>> {
//     fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
//         match &self.0 {
//             Some(x) => write!(f, "{}", x),
//             None => Ok(()),
//         }
//     }
// }

export const isCallback = (
  maybeFunction: true | ((...args: any[]) => void),
): maybeFunction is (...args: any[]) => void =>
  typeof maybeFunction === 'function'
