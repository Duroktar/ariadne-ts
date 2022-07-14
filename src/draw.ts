
import { Fixed } from "./data/Color"
import { clamp, range, wrapping_add } from "./_utils"

export interface iCharacters {
  hbar: string
  vbar: string
  xbar: string
  vbar_break: string
  vbar_gap: string

  uarrow: string
  rarrow: string

  ltop: string
  mtop: string
  rtop: string
  lbot: string
  rbot: string
  mbot: string

  lbox: string
  rbox: string

  lcross: string
  rcross: string

  underbar: string
  underline: string
}

export abstract class Characters {
  static unicode(): iCharacters {
    return {
      hbar: '─',
      vbar: '│',
      xbar: '┼',
      vbar_break: '·',
      vbar_gap: '⋮',
      uarrow: '▲',
      rarrow: '▶',
      ltop: '╭',
      mtop: '┬',
      rtop: '╮',
      lbot: '╰',
      mbot: '┴',
      rbot: '╯',
      lbox: '[',
      rbox: ']',
      lcross: '├',
      rcross: '┤',
      underbar: '┬',
      underline: '─',
    }
  }

  static ascii(): iCharacters {
    return {
      hbar: '-',
      vbar: '|',
      xbar: '+',
      vbar_break: '*',
      vbar_gap: ':',
      uarrow: '^',
      rarrow: '>',
      ltop: ',',
      mtop: 'v',
      rtop: '.',
      lbot: '`',
      mbot: '^',
      rbot: '\'',
      lbox: '[',
      rbox: ']',
      lcross: '|',
      rcross: '|',
      underbar: '|',
      underline: '^',
    }
  }
}

// /// A trait used to add formatting attributes to displayable items.
// ///
// /// Attributes specified through this trait are not composable (i.e: the behaviour of two nested attributes each with a
// /// conflicting attribute is left unspecified).
// pub trait Fmt: Sized {
//     /// Give this value the specified foreground colour
//     fn fg<C: Into<Option<Color>>>(self, color: C) -> Foreground<Self> {
//         Foreground(self, color.into())
//     }

//     /// Give this value the specified background colour
//     fn bg<C: Into<Option<Color>>>(self, color: C) -> Background<Self> {
//         Background(self, color.into())
//     }
// }
// impl<T: fmt::Display> Fmt for T {}

// export class Foreground<T> {
//   private data = []
//   fmt(f: Formatter): any /* -> fmt::Result */ {
//     const col = this.data[1]
//     if (col) {
//       write(f.buf, "{}", Paint.new(this.data[0]).fg(col))
//     } else {
//       write(f.buf, "{}", this.data[0])
//     }
//   }
// }

// export class Background<T> {
//   private data = []
//   fmt(f: Formatter): any/*  -> fmt::Result */ {
//     const col = this.data[1]
//     if (col) {
//       write(f.buf, "{}", Paint.new(this.data[0]).bg(col))
//     } else {
//       write(f.buf, "{}", this.data[0])
//     }
//   }
// }

/// A type that can generate distinct 8-bit colors.
export class ColorGenerator {
  constructor(
    public state: [number, number, number],
    public min_brightness: number,
  ) {}

  /// Create a new [`ColorGenerator`] with the given pre-chosen state.
  ///
  /// The minimum brightness can be used to control the colour brightness (0.0 - 1.0). The default is 0.5.
  static from_state(state: [number, number, number], min_brightness: number): ColorGenerator {
    return new ColorGenerator(state, clamp(min_brightness, 1.0, 0.0))
  }

  /// Create a new [`ColorGenerator`] with the default state.
  static new(): ColorGenerator {
    return ColorGenerator.default()
  }

  /// Generate the next colour in the sequence.
  next() {
    for (let i of range(0, 3)/* 0..3 */) {
      // magic constant, one of only two that have this property!
      this.state[i] = wrapping_add(this.state[i], 40503 * (i * 4 + 1130));
    }
    return Fixed(16
      + ((this.state[2] / 65535.0 * (1.0 - this.min_brightness) + this.min_brightness) * 5.0
       + (this.state[1] / 65535.0 * (1.0 - this.min_brightness) + this.min_brightness) * 30.0
       + (this.state[0] / 65535.0 * (1.0 - this.min_brightness) + this.min_brightness) * 180.0))
  }

  static default(): ColorGenerator {
    return new ColorGenerator([30000, 15000, 35000], 0.5)
  }
}
