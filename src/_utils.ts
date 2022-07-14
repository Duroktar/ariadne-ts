import { readFileSync } from 'fs';
import { join } from 'path';
import sf from 'string-format';
import { Display, isDisplay } from "./data/Display";
import { stringFormatter } from "./data/Formatter";
import { isOption, Option } from './data/Option';
import { err, isResult, ok, Result } from './data/Result';
import { Write } from './data/Write';
import { isShow, Show } from './display';

export function range(start: number, end: number) {
  let rv = [];
  while (start < end) {
    rv.push(start);
    start++;
  }
  return rv;
}

export function *rangeIter(start: number, end: number) {
  while (start < end) {
    yield start
    start++
  }
  return
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function wrapping_add_usize(self: number, rhs: number): number {
  // NOTE: this seems to work but is definitely wrong
  return (self + rhs)
}

export const max = (self: number[]) => {
  if (self.length === 0) return undefined
  return Math.max.apply(null, self);
};

export const min = (self: number[]) => {
  if (self.length === 0) return undefined
  return Math.min.apply(null, self);
};

export function write<W extends Write>(w: W, ...args: Displayable[]) {
  w.write_fmt(format(...args.map(fromRust)))
}

export type Displayable<T = any, E = any> = Display | Show | Option<T> | Result<T, E> | string | number

export function format(...args: Displayable[]): string {
  const [head, ...rest] = args.map(fromRust)
  return sf(head, ...rest);
}

const fromRust = (node: Displayable): string => {
  if (isDisplay(node)) {
    return node.display()
  }
  if (isShow(node)) {
    let f = stringFormatter()
    node.fmt(f)
    return f.unwrap()
  }
  if (isOption(node)) {
    return node.unwrap_or_else(() => '')
  }
  if (isResult(node)) {
    return node.unwrap_or_else(() => '<(Unwrap Err)>')
  }
  return node.toString()
}

export function writeln<W extends Write>(w: W, ...args: Displayable[]) {
  let val = format(...args.map(fromRust));
  w.write_fmt(val)
  w.write_fmt("\n")
}

export function eprintln(...args: Displayable[]): void {
  console.error(format(...args))
}

export function include_str(path: string): string {
  return readFileSync(join(process.cwd(), path)).toString()
}

export function binary_search_by_key<T>(arr: T[], x: any, fn: (o: T) => number): Result<number, number> {

  let start = 0, end = arr.length - 1, mid, val;

  // Iterate while start not meets end
  while (start < end){

    // Find the mid index
    mid = Math.floor((start + end)/2);

    val = fn(arr[mid]);

    // If element is present at mid, return True
    if (val === x) return ok(mid);

    // Else look in left or right half accordingly
    else if (val < x)
      start = mid + 1;
    else
      end = mid - 1;
  }

  return err(getSortedIndex(arr, x, fn));
}

function getSortedIndex(array: any[], x: any, fn: any) {
  let low = 0,
      high = array.length

  while (low < high) {
    let mid = (low + high) >>> 1;
    if (x > fn(array[mid])) low = mid + 1;
    else high = mid;
  }

  return low;
}

export function sort_by_key<T>(arr: T[], fn: (a: T) => number | string): void {
  arr.sort((a, b) => {
    return (fn(a) as any) - (fn(b) as any)
  })
}

export function min_by_key<T>(arr: T[], fn: (value: T) => number): Option<T> {
  let res: [number, T | null] = [Infinity, null]
  for (let val of arr) {
    if (fn(val) < res[0]) {
      res = [fn(val), val]
    }
  }
  return Option.from(res[1])
}

export const isString = (o: any): o is string => typeof o === "string"
export const isNumber = (n: any): n is number => typeof n === "number"
export const isBoolean = (n: any): n is boolean => typeof n === "boolean"

export const isCallback = (
  maybeFunction: true | ((...args: any[]) => void),
): maybeFunction is (...args: any[]) => void =>
  typeof maybeFunction === 'function'
