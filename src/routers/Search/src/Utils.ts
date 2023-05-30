export async function sleep(duration: number): Promise<void> {
  return new Promise((res) => setTimeout(res, duration));
}

export function range(start: number, end: number): number[] {
  const len = end - start;
  return [...new Array(len)].map((_v, index) => start + index);
}

export function filterMap<I, O>(list: I[], fn: (x: I) => O | undefined): O[] {
  return list.reduce((items, input) => {
    const mapped = fn(input);
    if (mapped !== undefined) {
      items.push(mapped);
    }
    return items;
  }, <Array<O>> []);
}

export function isString<T>(possibleStr: T): possibleStr is Extract<T, string> {
  return typeof possibleStr === "string";
}

export function assert(cond: boolean, msg: string | Error) {
  if (!cond) {
    const error = msg instanceof Error ? msg : new Error(msg);
    throw error;
  }
}

/**
 * Given an object and a function, return a new object where the values are `fn(value)`.
 *
 * @param obj - The object to map over
 * @param fn - The function mapping the `obj` values to the output values
 * @returns A new object with the same keys but new values
 */
export function mapObject<T, O>(
  obj: { [key: string]: T },
  fn: (value: T, key: string) => O,
): { [key: string]: O } {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, fn(v, k)]),
  );
}

const defaultErrorFn = (key: string) => `Key not found: ${key}`;
export class StrictDict<V> {
  private readonly dict: { [key: string]: V };
  private readonly errorFn: (key: string) => string;

  constructor(dict: { [key: string]: V }, errorFn?: (k: string) => string) {
    this.dict = dict;
    this.errorFn = errorFn || defaultErrorFn;
  }

  get(key: string): V {
    if (this.dict.hasOwnProperty(key)) {
      return this.dict[key];
    }
    throw new Error(this.errorFn(key));
  }
}
