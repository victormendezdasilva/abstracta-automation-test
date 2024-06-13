import { HomePage } from "../utils/page-objects/product-page";
import { test, expect, Page } from "@playwright/test";

test.describe("Header", () => {
  let homePage: HomePage;

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    homePage = new HomePage(page);
    await homePage.navigateToPage();
  });

  test("'Contact' header should pop up contact modal", async ({ page }) => {
    homePage.header.clickToContactHeader;

    expect(await loginModal.getModalTitle()).toBeVisible();
    expect(await loginModal.getModalTitle()).toHaveText("Log in");
  });

  test("'About us' header should pop up about us modal", async () => {
    await loginModal.enterUsername("testuser");
    expect(await loginModal.getUsernameInput()).toHaveValue("testuser");
  });

  test("'Cart' header should redirect to Cart Page", async () => {
    await loginModal.enterPassword("password123");
    expect(await loginModal.getPasswordInput()).toHaveValue("password123");
  });

  test("'Log in' header should pop up Log In modal", async () => {
    await loginModal.clickClose();
    expect(await loginModal.getModalTitle()).not.toBeVisible();
    await homePage.header.clickToLogInHeader();
    expect(await loginModal.getModalTitle()).toBeVisible();
  });

  test("'Sign up' header should pop up Sign Up modal", async () => {
    await loginModal.enterUsername(randomUsername);
    await loginModal.enterPassword("randomPassword");
    await loginModal.clickLogin();

    expect(await homePage.header.getWelcomeUserMessage()).toBe(
      `Welcome ${randomUsername}`
    );
  });

  test("'Home' header should redirect to Product Page", async () => {
    await loginModal.enterUsername(randomUsername);
    await loginModal.enterPassword("randomPassword");
    await loginModal.clickLogin();

    expect(await homePage.header.getWelcomeUserMessage()).toBe(
      `Welcome ${randomUsername}`
    );
  });
});
