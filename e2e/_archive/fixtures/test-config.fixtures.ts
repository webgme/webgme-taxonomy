import { test as base } from "@playwright/test";

type NonNegativeNumber<T extends number> = number extends T
  ? never
  : `${T}` extends `-${string}` | `${string}.${string}`
  ? never
  : T;

export interface ITestConfiguration {
  on_submit_wait_timeout_ms: NonNegativeNumber<number>;
}

export class TestConfigurationImpl implements ITestConfiguration {
  on_submit_wait_timeout_ms: NonNegativeNumber<number>;
}

export interface ITestConfig {
  test_configuration: ITestConfiguration;
}

export class TestConfigImpl implements ITestConfig {
  test_configuration: ITestConfiguration;
  constructor(test_configuration) {
    this.test_configuration = test_configuration;
  }
}

export const configured_test = base.extend<ITestConfig>({
  test_configuration: async ({}, use) => {
    return new TestConfigurationImpl();
  },
});
