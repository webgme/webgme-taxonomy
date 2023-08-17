export async function sleep(duration: number): Promise<void> {
  return new Promise((res) => setTimeout(res, duration));
}

export function range(start: number, end: number): number[] {
  const len = end - start;
  return [...new Array(len)].map((_v, index) => start + index);
}

// FIXME: it would be nice to specify ...lists as the input where each has a different type
// but I am not sure how to specify variadic generic types
export function zip<A, B>(l1: A[], l2: B[]): [A, B][] {
  const maxIndex = Math.min(
    l1.length,
    l2.length,
  );
  return range(0, maxIndex).map((i) => [l1[i], l2[i]]);
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
/**
 * A dictionary that throws an error if a key is not found.
 */
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

export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

export namespace Pattern {
  /*
   * Combine a list of JSON schema patterns into a single pattern that
   * combines them all in an "or" (ie, checking that the text matches
   * any of the input patterns).
   */
  export function anyIn(...patterns: string[]): string {
    return `\\(${patterns.join("|")}\\)`;
  }

  export const URL = "[a-zA-Z_\.-]+(:\d+)?";
}
