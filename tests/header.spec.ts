import { ContactModal } from "../utils/page-objects/components/contact-modal";
import { SignUpModal } from "../utils/page-objects/components/signup-modal";
import { LoginModal } from "../utils/page-objects/components/login-modal";
import { HomePage } from "../utils/page-objects/product-page";
import { CartPage } from "../utils/page-objects/cart-page";
import { test, expect, Page } from "@playwright/test";

test.describe("Header", () => {
  let cartPage: CartPage;
  let homePage: HomePage;

  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    homePage = new HomePage(page);
    cartPage = new CartPage(page);

    await homePage.navigateToPage();
  });

  test("'Contact' header should pop up contact modal", async () => {
    await homePage.header.clickToContactHeader();

    const contactModal = new ContactModal(page);

    expect(await contactModal.getModalTitle()).toBeVisible();
    expect(await contactModal.getModalTitle()).toHaveText("New Message");

    await contactModal.close();
  });

  test("'Cart' header should redirect to Cart Page", async () => {
    await homePage.header.clickToCartHeader();

    expect(await cartPage.getPlaceOrderButton()).toBeVisible();
  });

  test("'Log in' header should pop up Log In modal", async () => {
    await cartPage.header.clickToLogInHeader();

    const loginModal = new LoginModal(page);

    expect(await loginModal.getModalTitle()).toBeVisible();
    expect(await loginModal.getModalTitle()).toHaveText("Log in");

    await loginModal.close();
  });

  test("'Sign up' header should pop up Sign Up modal", async () => {
    await cartPage.header.clickToSignUpHeader();

    const signUpModal = new SignUpModal(page);

    expect(await signUpModal.getModalTitle()).toBeVisible();
    expect(await signUpModal.getModalTitle()).toHaveText("Log in");

    await signUpModal.close();
  });

  test("'Home' header should redirect to Product Page", async () => {
    await cartPage.header.clickToHomeHeader();

    expect(await homePage.getFirstProductPrice()).not.toBe("");
  });
});
