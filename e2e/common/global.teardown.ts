import { test as teardown, expect, FullConfig } from '@playwright/test';


async function globalTeardown(config: FullConfig) {
    console.log('teardown..')
}

export default globalTeardown;
