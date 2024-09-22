import { test, expect } from "@playwright/test";

const id = Math.floor(Math.random() * 1000);

test("new Device added", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.waitForTimeout(2000);

  await page.getByRole("button", { name: "Add Device" }).click();

  await page.locator("#system_name").fill(`Test Device ${id}`);
  await page.locator("#type").selectOption("MAC");
  await page.locator("#hdd_capacity").fill("100");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText(`Test Device ${id}`)).toBeVisible();
});

test("edit Device", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.waitForTimeout(2000);

  await page.locator("#dropdownMenuButton").last().click();

  await page.getByRole("button", { name: "Edit" }).click();

  await page.locator("#system_name").fill("Test Device Edit");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Test Device Edit")).toBeVisible();
});

test("delete Device", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.waitForTimeout(2000);

  await page.getByRole("button", { name: "Add Device" }).click();

  await page.locator("#system_name").fill(`Test Device ${id}`);
  await page.locator("#type").selectOption("MAC");
  await page.locator("#hdd_capacity").fill("100");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText(`Test Device ${id}`)).toBeVisible();

  await page.locator("#dropdownMenuButton").last().click();

  await page.getByRole("button", { name: "Delete" }).click();

  await page.locator('#modal-delete-button').click();

  await expect(page.getByText(`Delete device`)).not.toBeVisible();

  await expect(page.getByRole("paragraph", { name: "Test Device ${id}" })).not.toBeVisible();
});

test("search Device", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.waitForTimeout(2000);

  await page.getByRole("button", { name: "Add Device" }).click();

  await page.locator("#system_name").fill(`Test Device ${id}`);
  await page.locator("#type").selectOption("MAC");
  await page.locator("#hdd_capacity").fill("100");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText(`Test Device ${id}`)).toBeVisible();

  await page.locator("#search").fill("Test Device");

  await expect(page.getByText("Test Device")).toBeVisible();
});