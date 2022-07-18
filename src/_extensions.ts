
interface Array<T> {
  enumerate(): [number, T][]
  filter_map<B>(fn: (value: T, index: number) => B | null): B[]
  max_by_key(fn: (value: T, index: number) => any): T
  chain(arg: any): this
}

Array.prototype.enumerate = function<A, B>(): [number, B][] {
  let i = 0
  let rv: [number, B][] = []
  for (let item of this)
    rv.push([i++, item]);
  return rv
};

Array.prototype.filter_map = function<B>(this, fn: (value: typeof this, index: number) => B | null): B[] {
  return this.map(fn).filter(n => n !== null) as B[]
};

Array.prototype.max_by_key = function(this, fn: (value: typeof this, index: number) => number): typeof this {
  const max = (self: number[]) => {
    return Math.max.apply(null, self);
  };

  return max(this.map(fn)) as any
};

Array.prototype.chain = function(this, that) {
  return this.concat(that)
}


interface Number {
  saturating_sub(n: number): number
  max(n: number): number
  min(n: number): number
}

Number.prototype.saturating_sub = function(n: number): number {
  return this.valueOf() - n
};

Number.prototype.max = function(n: number): number {
  return Math.max(this.valueOf(), n)
};

Number.prototype.min = function(n: number): number {
  return Math.min(this.valueOf(), n)
};
