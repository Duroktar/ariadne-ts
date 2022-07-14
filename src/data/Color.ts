import c from 'chalk'

export const colors = {
  blue:   c.blue,
  green:  c.green,
  red:    c.red,
  yellow: c.yellow,
}

export const bgColors = {
  blue:   c.bgBlue,
  green:  c.bgGreen,
  red:    c.bgRed,
  yellow: c.bgYellow,
}

export type Color = ((s: string) => string) | c.Chalk

export function Fixed(n: number) {
  return c.ansi256(n)
}
