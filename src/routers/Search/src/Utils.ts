export async function sleep(duration: number): Promise<void> {
  return new Promise((res) => setTimeout(res, duration));
}

export function range(start: number, end: number): number[] {
  const len = end - start;
  return [...new Array(len)].map((_v, index) => start + index);
}

// A pathObj is an object eg, {vocab: {term: {value: "example"}}}
// to be merged with another eg, {vocab: {term2: {value2: "example"}}}
// to get an object with all the values
type StrObj = { [k: string]: any };
export function deepMerge(...pathObjs: object[]): object {
  const initValue: { [k: string]: any } = {};
  return pathObjs.reduce((obj: StrObj, keyObj) => {
    const entries = Object.entries(keyObj);
    const mergedEntries: [string, any][] = entries.map(
      ([k, v]: [string, any]) => {
        const existing: any = obj[k];
        if (isObject(existing) && isObject(v)) {
          return [k, deepMerge(existing, v)];
        } else {
          return [k, v];
        }
      },
    );

    mergedEntries.forEach(([k, v]: [string, any]) => obj[k] = v);

    return obj;
  }, initValue);
}

export function partition<T>(list: T[], fn: (i: T) => boolean): [T[], T[]] {
  const initValue: [T[], T[]] = [[], []];
  return list.reduce(([ifTrue, ifFalse], item) => {
    if (fn(item)) {
      ifTrue.push(item);
    } else {
      ifFalse.push(item);
    }
    return [ifTrue, ifFalse];
  }, initValue);
}

export function omit(dict: object, ...keys: string[]): object {
  const skipKeys = new Set(keys);
  const entries = Object.entries(dict)
    .filter(([k, _v]) => !skipKeys.has(k));

  return Object.fromEntries(entries);
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

export function isObject<T>(possibleObj: T): possibleObj is Extract<T, object> {
  return typeof possibleObj === "object";
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
