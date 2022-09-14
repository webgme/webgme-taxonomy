
/**
 * A Result is the result from a request. Errors can be mapped (like
 * combinators). Unwrapping the result will either throw an error (if an error
 * occurred) or return the parsed result from the request.
 */
export class Result<V, E> {
  _value: V|null;
  _error: E|null;

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

export function filterMap<I, O>(list: I[], fn: (x: I) => O): O[] {
  return list.reduce((items, input) => {
    const mapped = fn(input);
    if (mapped !== undefined) {
      items.push(mapped);
    }
    return items;
  }, []);
}

export function assert(cond: boolean, err: Error) {
  if (!cond) {
    throw err;
  }
}

// FIXME: we need to combine Artifact.js (in the router directory) w/ a TS definition and
// share the generated code across the client and server. This method should be available
// on the ArtifactSet class instead of here
export function getLatestArtifact(artifactSet: any): any {
    artifactSet.children
      .sort((i1, i2) => (i1.time < i2.time ? -1 : 1));

    return artifactSet.children[artifactSet.children.length - 1];
}

