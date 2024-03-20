// Scoped queue for async functions

const nop = () => { };

const lasts: { [name: string]: Promise<any> } = {};

/**
 * Helper for queuing (and running) async functions based on specific scopes.
 * If run in the same scope, functions will run serially. Different scopes
 * will run concurrently.
 */
export default class ScopedFnQueue {
  async run<T>(scope: string, fn: () => Promise<T>): Promise<T> {
    const last = lasts[scope] || Promise.resolve();
    const infallibleLast = last.catch(nop);
    const newLast = infallibleLast.then(fn);
    lasts[scope] = newLast;
    return await newLast;
  }
}
