import { test } from "@playwright/test";
import { signIn } from "../src/lib/playwright/commands";
import { resetTestUser } from "../src/lib/firebase/admin/test";

test.describe("Existing User", () => {
  test.beforeEach(async ({ page }) => {
    const resetResult = await resetTestUser();
    console.log(`Reset test user result: ${resetResult.result}`);
    await signIn(page);
  });

  test.afterEach(async () => {
    const resetResult = await resetTestUser();
    console.log(`Reset test user result: ${resetResult.result}`);
  });

  test("can update status", async ({ page }) => {
    await page
      .getByRole("heading", { name: "Your Current Status" })
      .isVisible();
    await page.getByText("😀").isVisible();
    await page.getByRole("button", { name: "Change" }).click();
    await page
      .getByRole("button", { name: "rolling on the floor laughing" })
      .click();
    await page.getByText("🤣").isVisible();
  });

  test("can update account settings", async ({ page }) => {
    await page.getByRole("button", { name: "Old Guy" }).click();
    await page.getByRole("menuitem", { name: "Account settings" }).click();
    await page.getByRole("heading", { name: "Manage Account" }).click();
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill("Old Guy1");
    await page.getByRole("button", { name: "Update Account" }).click();
    await page.getByText("✓ Account Updated").click();
    await page.getByRole("button", { name: "Old Guy1" }).isVisible();
  });

  test("can logout", async ({ page }) => {
    await page.getByRole("button", { name: "Old Guy" }).click();
    await page.getByRole("menuitem", { name: "Sign out" }).click();
    await page.getByRole("heading", { name: "Welcome!" }).isVisible();
    await page.getByRole("link", { name: "Sign In" }).click();
    await page.getByRole("heading", { name: "Sign In" }).isVisible();
  });
});
