import type {
  ArtifactMetadata,
  ArtifactMetadatav2,
} from "./adapters/common/types";
import { Err, None, Ok, Option, Result, Some } from "oxide.ts";

export async function sleep(duration: number): Promise<void> {
  return new Promise((res) => setTimeout(res, duration));
}

export function range(start: number, end: number, step: number = 1): number[] {
  const len = Math.ceil((end - start) / step);
  return [...new Array(len)].map((_v, index) => start + step * index);
}

export function groupBy<T>(
  items: T[],
  fn: (item: T) => string,
): { [key: string]: T[] } {
  const groups: { [k: string]: T[] } = {};

  items.forEach((item: T) => {
    const key = fn(item);
    if (!groups.hasOwnProperty(key)) {
      groups[key] = [];
    }

    groups[key].push(item);
  });

  return groups;
}

/**
 * Mutable takeWhile.
 */
export function shiftWhile<T>(items: T[], fn: (item: T) => boolean): T[] {
  const result: T[] = [];
  while (items.length && fn(items[0])) {
    const item = items.shift();
    // Unfortunately, I am ignoring the next line since item is guaranteed to be T
    // and checking if the item is undefined would change the behavior in the (admittedly
    // a bit trivial) case where undefined is an item in the list
    // @ts-ignore
    result.push(item);
  }
  return result;
}

/**
 * Convert from a result into "regular TS error handling".
 *
 * Unfortunately, Result.unwrap() throws an opaque error.
 * This is really a workaround for that...
 */
export function fromResult<T, E>(result: Result<T, E>): T {
  if (result.isOk()) {
    return result.unwrap();
  } else {
    throw result.unwrapErr();
  }
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
                // FIXME: do this the right way...
                // @ts-ignore
                errThing?.toString() || "Error occurred during retry attempt.",
              );
            return Err(error);
          }
        }
      },
      Promise.resolve(initError),
    );

  return fromResult(result);
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

export function uniqWithKey<T, K>(arr: T[], key: (item: T) => K): T[] {
  const contents: K[] = [];
  return arr.reduce((result: T[], nextItem: T) => {
    const itemKey = key(nextItem);
    if (!contents.includes(itemKey)) {
      result.push(nextItem);
      contents.push(itemKey);
    }
    return result;
  }, []);
}

export namespace DateTimeIter {
  function interval(start: Date, ms: number): Generator<Date> {
    return lazy.iter(start, (d) => new Date(+d + ms));
  }

  export function minutes(start: Date): Generator<Date> {
    const minute = 1000 * 60;
    return interval(start, minute);
  }

  export function hours(start: Date): Generator<Date> {
    const hour = 1000 * 60 * 60;
    return interval(start, hour);
  }

  export function days(start: Date): Generator<Date> {
    const day = 1000 * 60 * 60 * 24;
    return interval(start, day);
  }

  export function weeks(start: Date): Generator<Date> {
    const day = 1000 * 60 * 60 * 24;
    return interval(start, 7 * day);
  }

  export function months(start: Date): Generator<Date> {
    return lazy.iter(start, (d) => {
      const newDate = new Date(d);
      newDate.setMonth(d.getMonth() + 1);
      return newDate;
    });
  }

  export function years(start: Date, delta: number = 1): Generator<Date> {
    return lazy.iter(start, (d) => {
      const newDate = new Date(d);
      newDate.setFullYear(d.getFullYear() + delta);
      return newDate;
    });
  }
}

export namespace lazy {
  export function* iter<T>(start: T, nextFn: (i: T) => T): Generator<T> {
    let i = start;
    while (true) {
      yield i;
      i = nextFn(i);
    }
  }

  export function* chain<T>(...generators: Generator<T>[]): Generator<T> {
    for (const gen of generators) {
      for (const i of gen) {
        yield i;
      }
    }
  }

  export function takeWhile<T>(
    gen: Generator<T>,
    fn: (item: T) => boolean,
  ): T[] {
    const results: T[] = [];
    for (const item of gen) {
      if (fn(item)) {
        results.push(item);
      } else {
        return results;
      }
    }

    return results;
  }

  export function* map<T, O>(
    gen: Generator<T>,
    fn: (item: T) => O,
  ): Generator<O> {
    for (const item of gen) {
      yield fn(item);
    }
  }

  export function find<T>(
    gen: Generator<T>,
    fn: (item: T) => boolean,
  ): T | undefined {
    for (const item of gen) {
      if (fn(item)) {
        return item;
      }
    }
  }

  export function* fromArray<T>(array: T[]): Generator<T> {
    for (const item of array) {
      yield item;
    }
  }
}

export enum DateTimeInterval {
  Minute = 0,
  Hour = 1,
  Day = 2,
  Week = 3,
  Month = 4,
  Year = 5,
  Decade = 6,
  Century = 7,
  Millenium = 8,
}

export function getTimepoints(
  timeDates: Date[],
  maxTicks = 100,
): [DateTimeInterval, Date[]] {
  const startTime = () => new Date(timeDates[0]);

  const iters: Generator<[DateTimeInterval, Generator<Date>]> = lazy.fromArray([
    [DateTimeInterval.Minute, DateTimeIter.minutes(startTime())],
    [DateTimeInterval.Hour, DateTimeIter.hours(startTime())],
    [DateTimeInterval.Day, DateTimeIter.days(startTime())],
    [DateTimeInterval.Week, DateTimeIter.weeks(startTime())],
    [DateTimeInterval.Month, DateTimeIter.months(startTime())],
    [DateTimeInterval.Year, DateTimeIter.years(startTime())],
    [DateTimeInterval.Decade, DateTimeIter.years(startTime(), 10)],
    [DateTimeInterval.Century, DateTimeIter.years(startTime(), 100)],
    [DateTimeInterval.Millenium, DateTimeIter.years(startTime(), 1000)], // :)
  ]);

  const endTime = timeDates[timeDates.length - 1];
  const pointsForEachInterval: Generator<[DateTimeInterval, Date[]]> = lazy.map(
    iters,
    ([interval, iter]) => {
      let numPoints = 0;
      const points = lazy.takeWhile(
        iter,
        // Allow it to collect up to one extra so we know it has too many
        // but don't waste time computing a ton of extraneous points
        (d: Date) => ++numPoints < (maxTicks + 1) && d < endTime,
      );
      if (points[points.length - 1] !== endTime) {
        points.push(endTime);
      }
      return [interval, points];
    },
  );

  const points = lazy.find(
    pointsForEachInterval,
    ([_interval, points]) => points.length < maxTicks,
  ) || [DateTimeInterval.Millenium, timeDates];

  return points;
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

export function toArtifactMetadatav2(
  metadata: ArtifactMetadata,
): ArtifactMetadatav2 {
  let tags;
  if ("tags" in metadata) { // updated metadata
    tags = metadata.tags;
  } else {
    // Update the old format to the new one
    const taxonomyTags = metadata.taxonomyTags || [];
    tags = deepMerge(...taxonomyTags);
  }

  return {
    tags,
    displayName: metadata.displayName,
    taxonomyVersion: metadata.taxonomyVersion,
    time: metadata.time,
  };
}
