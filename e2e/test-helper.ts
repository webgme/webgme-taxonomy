// TODO -- associate with correct Types

// TODO: it would be good to move these to a utils file or something
interface PollOptions {
  timeout?: number;
  interval?: number;
}

/*
 * Poll until function returns true
 */
export async function poll(
  fn: () => Promise<boolean>,
  opts?: PollOptions,
): Promise<boolean> {
  const maxDuration = opts?.timeout || 1000;
  const interval = opts?.interval || 10;

  let duration = 0;
  let isPassing = await fn();
  while (!isPassing && duration < maxDuration) {
    await sleep(interval);
    duration += interval;
    isPassing = await fn();
  }
  return isPassing;
}

export async function sleep(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}
