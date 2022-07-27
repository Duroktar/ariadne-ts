import chalk from 'chalk'

const options: any = {enabled: true, level: 2};
const c = new chalk.Instance(options);

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

export type ColorFn = ((s: string) => string) | chalk.Chalk

export abstract class Color {
  static Fixed = Fixed
}

export function Fixed(n: number) {
  return c.ansi256(n)
}
