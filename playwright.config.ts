import { TraceMode, defineConfig, devices } from "@playwright/test";

const FULLY_PARALLEL: boolean = false;
const DEBUG_TIMEOUT_MS = 300000
const DEFAULT_HOST: string = "127.0.0.1";
const DEFAULT_PORT: string = "8080";
const BASE_URL = `http://${DEFAULT_HOST}:${DEFAULT_PORT}/`;
// process.env.DEBUG = "*"

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  timeout: DEBUG_TIMEOUT_MS,

  testDir: "e2e",
  // testIgnore: 'test-*.spec-ts',
  testMatch: "*.spec.ts",
  /* Run tests in files in parallel */
  fullyParallel: FULLY_PARALLEL,

  globalSetup: require.resolve("./e2e/global.setup"),

  globalTeardown: require.resolve("./e2e/global.teardown"),

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: get_trace_mode(),
    // screenshot: "only-on-failure",
    // video: {
    //   mode: "on",
    //   size: { width: 1920, height: 1080 },
    // },
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // bypassCSP: true,
        // launchOptions: {
        //   args: ['--disable-web-security']
        // }
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],


  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run start",
    url: BASE_URL,
    // reuseExistingServer: !process.env.CI, # Hard set for testing
    reuseExistingServer: true,
    stdout: "ignore", // default
    stderr: "pipe", // default
    timeout: 120 * 1000,
  },
});


/**
 * Get the trace mode
 * 
 * Wrapped in function call to permit abstraction in case of different contexts
 *
 * 'on-first-retry' - Record a trace only when retrying a test for the first time.
 * 'on-all-retries' - Record traces for all test retries.
 * 'off' - Do not record a trace.
 * 'on' - Record a trace for each test. (not recommended as it's performance heavy)
 * 'retain-on-failure' - Record a trace for each test, but remove it from successful test runs.
 * @return {*} 
 */
function get_trace_mode() : TraceMode  {
  return "on";
}

