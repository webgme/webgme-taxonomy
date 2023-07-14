import { test as teardown, expect } from '@playwright/test';

teardown("Teardown...", (args, testInfo) => {
    console.log('Teardown...')
});

