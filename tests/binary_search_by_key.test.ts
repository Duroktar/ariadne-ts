import { expect, test } from 'vitest'
import { binary_search_by_key } from '../src/_utils'

let s = [[0, 0], [2, 1], [4, 1], [5, 1], [3, 1],
  [1, 2], [2, 3], [4, 5], [5, 8], [3, 13],
  [1, 21], [2, 34], [4, 55]];

test("binary_search_by_key", () => {
  let result

  result = binary_search_by_key(s, 13, ([a, b]) => b)
  expect(result.is_ok()).toEqual(true)
  expect(result.unwrap()).toEqual(9)

  result = binary_search_by_key(s, 4, ([a, b]) => b);
  expect(result.is_err()).toEqual(true)
  expect(result.unwrap()).toEqual(7)

  result = binary_search_by_key(s, 1, ([a, b]) => b);
  expect(result.is_ok()).toEqual(true)
  expect([1, 2, 3, 4].includes(result.unwrap())).toEqual(true)
})
