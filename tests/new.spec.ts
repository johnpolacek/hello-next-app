import { test } from "@playwright/test";
import { newUser } from "../src/lib/playwright/users";
import { deleteTestUser } from "../src/lib/firebase/admin/test";
import appConfig from "../src/app.config";

let newUserEmail: string;

test.describe("New User", () => {
  test.beforeEach(async () => {
    newUserEmail =
      "newuser" +
      Math.random().toString(36).substring(2, 10) +
      "@" +
      appConfig.url.replace("https://", "");
  });

  test.afterEach(async () => {
    const deleteResult = await deleteTestUser(newUserEmail);
    console.log(`Delete user result: ${deleteResult.result}`);
  });

  test("can sign up for new account", async ({ page }) => {
    await page.goto("http://localhost:3000/");
    await page.getByRole("link", { name: "Hello Next App" }).isVisible();
    await page.getByRole("heading", { name: "Welcome!" }).isVisible();
    await page.getByRole("link", { name: "Sign Up" }).click();
    await page.locator('input[name="name"]').click();
    await page.locator('input[name="name"]').fill(newUser.name);
    await page.locator('input[name="name"]').press("Tab");
    await page.locator('input[name="email"]').fill(newUserEmail);
    await page.locator('input[name="email"]').press("Tab");
    await page.locator('input[name="password"]').fill(newUser.password);
    await page.getByRole("button", { name: "Sign Up" }).click();
    await page.getByRole("button", { name: "New Guy" }).isVisible();
    await page.getByRole("heading", { name: "Welcome back!" }).click();
    await page
      .getByRole("heading", { name: "Your Current Status" })
      .isVisible();
    await page.getByText("😀").isVisible();
  });
});
