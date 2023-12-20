import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,

  expect: {
    timeout: 15 * 1000,
  },

  retries: 1,
  workers: 1,
  reporter: 'html',
  maxFailures: 0,

  use: {
    headless: true,
    actionTimeout: 10 * 1000,
    navigationTimeout: 20 * 1000,
    baseURL: 'https://dev.omni-dispatch.com',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
