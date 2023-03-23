export async function sleep(duration: number): Promise<void> {
  return new Promise((res) => setTimeout(res, duration));
}

export function range(start: number, end: number): number[]{
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
  }, <Array<O>>[]);
}

export function isString<T>(possibleStr: T): possibleStr is Extract<T, string> {
  return typeof possibleStr === 'string';
}
