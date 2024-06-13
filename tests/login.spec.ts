import { test, expect, Page } from "@playwright/test";
import { LoginModal } from "../utils/page-objects/components/login-modal";
import { HomePage } from "../utils/page-objects/product-page";
import { generateRandomString, signUp } from "../utils/utils";

test.describe("Login", () => {
  let randomUsername = generateRandomString(8);
  let randomPassword = generateRandomString(5);

  let productPage: HomePage;
  let loginModal: LoginModal;

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();

    productPage = new HomePage(page);
    loginModal = new LoginModal(page);

    await signUp(randomUsername, randomPassword);

    await productPage.navigateToPage();
  });

  test.beforeEach(async () => {
    await productPage.header.clickToLogInHeader();
  });

  test.afterEach(async () => {
    await loginModal.clickClose();
  });

  test("should display login modal title", async () => {
    expect(await loginModal.getModalTitle()).toBeVisible();
    expect(await loginModal.getModalTitle()).toHaveText("Log in");
  });

  test("should allow entering username", async () => {
    await loginModal.enterUsername("testuser");
    expect(await loginModal.getUsernameInput()).toHaveValue("testuser");
  });

  test("should allow entering password", async () => {
    await loginModal.enterPassword("password123");
    expect(await loginModal.getPasswordInput()).toHaveValue("password123");
  });

  test("should close the login modal when close button is clicked", async () => {
    await loginModal.clickClose();
    expect(await loginModal.getModalTitle()).not.toBeVisible();
    await productPage.header.clickToLogInHeader();
    expect(await loginModal.getModalTitle()).toBeVisible();
  });

  test("should successfully log in with valid credentials", async () => {
    await loginModal.enterUsername(randomUsername);
    await loginModal.enterPassword("randomPassword");
    await loginModal.clickLogin();

    expect(await productPage.header.getWelcomeUserMessage()).toBe(
      `Welcome ${randomUsername}`
    );
  });
});
