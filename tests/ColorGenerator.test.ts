import { expect, test } from 'vitest';
import { ColorFn } from '../src/lib/Color';
import { ColorGenerator } from '../src/lib/ColorGenerator';

test("ColorGenerator", () => {

  let colors = ColorGenerator.new();

  let results: [number, ColorFn][] = []

  colors.next(results);
  colors.next(results);
  colors.next(results);

  colors.next(results);
  colors.next(results);
  colors.next(results);

  colors.next(results);
  colors.next(results);
  colors.next(results);

  colors.next(results);
  colors.next(results);
  colors.next(results);

  expect(results.map(o => o[0]))
    .toEqual([
      201, 155, 187,
      218, 158, 189,
      131, 175, 207,
      149, 181, 210,
    ])
})
