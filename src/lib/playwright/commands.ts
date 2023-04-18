import { Page } from "@playwright/test";
import { existingUser } from "./users";

export const signIn = async (page: Page) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.locator('input[name="email"]').fill(existingUser.email);
  await page.locator('input[name="email"]').press("Tab");
  await page.locator('input[name="password"]').fill(existingUser.password);
  await page.getByRole("button", { name: "Sign In", exact: true }).click();
  await page.getByRole("heading", { name: "Welcome back!" }).isVisible();
};
