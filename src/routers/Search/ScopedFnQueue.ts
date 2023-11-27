// Scoped queue for async functions

const nop = () => {};
/**
 * Helper for queuing (and running) async functions based on specific scopes.
 * If run in the same scope, functions will run serially. Different scopes
 * will run concurrently.
 */
export default class ScopedFnQueue {
  private last: { [name: string]: Promise<any> };

  constructor() {
    this.last = {};
  }

  async run<T>(scope: string, fn: () => Promise<T>): Promise<T> {
    const last = this.last[scope] || Promise.resolve();
    const infallibleLast = last.catch(nop);
    const newLast = infallibleLast.then(fn);
    this.last[scope] = newLast;
    return await newLast;
  }
}
