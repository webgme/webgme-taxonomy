import type { ContentTypeConfiguration } from "../../../../common/SearchFilterDataExporter";
/**
 * A Result is the result from a request. Errors can be mapped (like
 * combinators). Unwrapping the result will either throw an error (if an error
 * occurred) or return the parsed result from the request.
 */
export class Result<V, E> {
  _value: V | null;
  _error: E | null;

  constructor(value: V, error: E) {
    this._value = value;
    this._error = error;
  }

  map<V2>(fn: (item: V) => V2): Result<V2, E> {
    if (this._error) {
      return new Result(null, this._error);
    } else {
      const result = fn(this._value);
      return new Result(result, null);
    }
  }

  mapError<E2>(errFn: (err: E) => E2): Result<V, E2> {
    if (this._error) {
      const result = errFn(this._error);
      return new Result(null, result);
    } else {
      return new Result(this._value, null);
    }
  }

  unwrap() {
    if (this._error) {
      throw this._error;
    } else {
      return this._value;
    }
  }
}

/**
 * Returns whether the two arrays are equal.
 *
 * @template T The type of the array elements.
 * @param array1 The first array to compare.
 * @param array2 The second array to compare.
 * @param [options] Options for the comparison. If `ignoreOrder` is `true`, then both arrays are sorted before comparison.
 * @return `true` if the arrays are equal, `false` otherwise.
 */
export function arraysEqual<T>(
  array1: T[],
  array2: T[],
  options?: { ignoreOrder?: boolean; equals?: (a: T, b: T) => boolean },
) {
  if (array1 === array2) return true;
  if (array1.length !== array2.length) return false;

  const [arr1, arr2] = options?.ignoreOrder
    ? [[...array1].sort(), [...array2].sort()]
    : [array1, array2];

  const equals = options?.equals ?? Object.is;
  return !arr1.some((elem, index) => !equals(elem, arr2[index]));
}

export function assert(cond: boolean, err: Error) {
  if (!cond) {
    throw err;
  }
}

// FIXME: we need to combine Artifact.js (in the router directory) w/ a TS
// definition and share the generated code across the client and server. This
// method should be available on the ArtifactSet class instead of here
export function getLatestArtifact(artifactSet: any): any {
  artifactSet.children.sort((i1, i2) => {
    if (i1.time === i2.time) {
      return i1.displayName < i2.displayName ? -1 : 1;
    }
    return i1.time < i2.time ? -1 : 1;
  });

  return artifactSet.children[artifactSet.children.length - 1];
}

export function capitalize(word: string): string {
  return word[0].toUpperCase() + word.substring(1);
}

export function openUrl(url: string) {
  return window.open(url, "_blank");
}

export function encodeQueryParams(dict: { [key: string]: string }) {
  return Object.entries(dict)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
}

export function isObject<T>(
  thing: T,
): thing is Exclude<
  T,
  undefined | string | number | boolean | Array<any> | Function
> {
  return typeof thing === "object" && !Array.isArray(thing);
}

export function isDefined<T>(thing: T): thing is Exclude<T, undefined> {
  return (thing != null) || (thing === null);
}

export async function readFile(file: File) {
  return new Promise<string>((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.error) {
        console.log("error:", reader.error);
        return rej(reader.error);
      } else {
        return res(reader.result as string);
      }
    };
    reader.readAsText(file);
  });
}

export function filterMap<I, O>(list: I[], fn: (x: I) => O | undefined): O[] {
  return list.reduce((items, input) => {
    const mapped = fn(input);
    if (isDefined(mapped)) {
      items.push(mapped);
    }
    return items;
  }, <Array<O>> []);
}

export function getNestedValue(
  obj: { [key: string]: any },
  keys: string[],
): any {
  const key = keys.unshift();
  const value = obj[key];

  if (keys.length === 0) {
    return value;
  }

  if (typeof value === "object") {
    return getNestedValue(value, keys);
  } else {
    return undefined;
  }
}

export function downloadJSON(name: string, object: any) {
  const dataStr = "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(object));
  const element = document.createElement("a");
  element.setAttribute("href", dataStr);
  element.setAttribute("download", name + ".json");
  document.body.appendChild(element);
  element.click();
  element.remove();
}

// TODO: combine logic with the other utils in the server code
export async function sleep(duration: number): Promise<void> {
  return new Promise((res) => setTimeout(res, duration));
}

export function getTagValue(tags: any, ...fqn: string[]) {
  return fqn.reduce((tagData, name) => tagData && tagData[name], tags);
}

export function getDefaultContentType(name: string): ContentTypeConfiguration {
  return {
    name,
    nodePath: '',
    vocabularies: []
  };
}
