
const { test, expect } = require("@playwright/test");

test("ServiceFlow dashboard opens successfully", async ({ page }) => {
  await page.goto("/pages/dashboard.html");

  await expect(page).toHaveTitle(/ServiceFlow/i);

  await expect(
    page.getByRole("heading", { name: "Manage your leads." })
  ).toBeVisible();
});

test("dashboard displays the default leads and correct statistics", async ({ page }) => {
  // Start with a clean browser storage state.
  await page.goto("/pages/dashboard.html");
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // Confirm the three default demonstration leads.
  await expect(page.locator("#leadTableBody tr")).toHaveCount(3);

  await expect(page.locator("#leadTableBody")).toContainText("James Wilson");
  await expect(page.locator("#leadTableBody")).toContainText("Sarah Miller");
  await expect(page.locator("#leadTableBody")).toContainText("David Smith");

  // Confirm the dashboard statistics.
  await expect(page.locator("#totalLeads")).toHaveText("3");
  await expect(page.locator("#newLeads")).toHaveText("1");
  await expect(page.locator("#followUpLeads")).toHaveText("1");
  await expect(page.locator("#convertedLeads")).toHaveText("1");
});


test("search filters leads by customer name", async ({ page }) => {
  await page.goto("/pages/dashboard.html");

  // Start with the three default demonstration leads.
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // Search for one customer.
  await page.locator("#searchLeads").fill("Sarah Miller");

  // Only the matching lead should remain visible.
  await expect(page.locator("#leadTableBody tr")).toHaveCount(1);
  await expect(page.locator("#leadTableBody")).toContainText("Sarah Miller");

  // Other customers should not appear in the filtered table.
  await expect(page.locator("#leadTableBody")).not.toContainText("James Wilson");
  await expect(page.locator("#leadTableBody")).not.toContainText("David Smith");
});


test("status filter displays only matching leads", async ({ page }) => {
  await page.goto("/pages/dashboard.html");

  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await page.locator("#filterStatus").selectOption("follow-up");

  await expect(page.locator("#leadTableBody tr")).toHaveCount(1);
  await expect(page.locator("#leadTableBody")).toContainText("Sarah Miller");
  await expect(page.locator("#leadTableBody")).not.toContainText("James Wilson");
  await expect(page.locator("#leadTableBody")).not.toContainText("David Smith");
});


test("adding a lead updates the table and statistics", async ({ page }) => {
  await page.goto("/pages/dashboard.html");

  await page.evaluate(() => localStorage.clear());
  await page.reload();

  await page.locator("#addLeadButton").click();

  await page.locator("#leadName").fill("Taylor Example");
  await page.locator("#leadEmail").fill("taylor@example.com");
  await page.locator("#leadService").fill("Electrical");
  await page.locator("#leadStatus").selectOption("new");

  await page.locator("#leadForm button[type='submit']").click();

  await expect(page.locator("#leadTableBody")).toContainText("Taylor Example");
  await expect(page.locator("#totalLeads")).toHaveText("4");
  await expect(page.locator("#newLeads")).toHaveText("2");
  await expect(page.locator("#leadModal")).toHaveAttribute("aria-hidden", "true");
});
