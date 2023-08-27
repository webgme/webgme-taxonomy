import { Err, None, Ok, Option, Result, Some } from "oxide.ts";

export async function sleep(duration: number): Promise<void> {
  return new Promise((res) => setTimeout(res, duration));
}

export function range(start: number, end: number, step: number = 1): number[] {
  const len = Math.ceil((end - start) / step);
  return [...new Array(len)].map((_v, index) => start + step * index);
}

export async function retry<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 2,
): Promise<T> {
  const initError: Result<T, Error> = Err(
    new Error("Cannot retry w/o any attempts."),
  );
  const result = await range(0, maxAttempts)
    .reduce(
      async (
        prevAttempt: Promise<Result<T, Error>>,
        _: number,
      ): Promise<Result<T, Error>> => {
        const prevResult: Result<T, Error> = await prevAttempt;

        if (prevResult.isOk()) {
          return prevResult;
        } else {
          try {
            return Ok(await fn());
          } catch (errThing) {
            const error: Error = errThing instanceof Error
              ? errThing
              : new Error(
                errThing?.toString() || "Error occurred during retry attempt.",
              );
            return Err(error);
          }
        }
      },
      Promise.resolve(initError),
    );

  return result.unwrap();
}

/**
 * Split the values between start, end into intervals with the given max size.
 *
 * Note: this returns [start, length] *not* [start, end]
 */
export function intervals(
  start: number,
  end: number,
  maxSize = 20,
): [number, number][] {
  return range(start, end, maxSize)
    .map((start) => [start, Math.min(end - start, maxSize)]);
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
export class OptionDict<V> {
  private readonly dict: { [key: string]: V };

  constructor(dict: { [key: string]: V }) {
    this.dict = dict;
  }

  get(key: string): Option<V> {
    console.log("getting", key, ". Exists?", this.dict.hasOwnProperty(key));
    if (this.dict.hasOwnProperty(key)) {
      return Some(this.dict[key]);
    }
    return None;
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
    return `(${patterns.join("|")})`;
  }

  export function exact(pattern: string): string {
    return `^${pattern}$`;
  }

  const IP_ADDRESS = "[0-9]{3}\.[0-9]+\.[0-9]+\.[0-9]+";
  const DOMAIN_NAME = "[a-zA-Z_\.-]+";
  const PORT = ":[0-9]+";
  export const URL = `(${anyIn(DOMAIN_NAME, IP_ADDRESS)})(${PORT})?`;
}
