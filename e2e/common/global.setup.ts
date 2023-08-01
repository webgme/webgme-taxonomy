import { test as setup, expect, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
    console.log('setup..')
}

export default globalSetup;