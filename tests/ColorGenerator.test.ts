import { expect, test } from 'vitest';
import { Color } from '../src/data/Color';
import { ColorGenerator } from '../src/draw';

test("ColorGenerator", () => {

  let colors = ColorGenerator.new();

  let results: [number, Color][] = []

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
