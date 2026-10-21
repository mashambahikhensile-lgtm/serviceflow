
const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  reporter: "list",

  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "npx.cmd http-server . -p 4173 -c-1",
    url: "http://127.0.0.1:4173/pages/dashboard.html",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
