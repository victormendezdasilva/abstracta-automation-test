import { ProductDetailsPage } from "../utils/page-objects/product-details-page";
import { HomePage } from "../utils/page-objects/product-page";
import { OrderDetails } from "../utils/interfaces/orderDetails";
import { CartPage } from "../utils/page-objects/cart-page";
import { Page, expect, test } from "@playwright/test";

test.describe("Buy Flow", async () => {
  let homePage: HomePage;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    homePage = new HomePage(page);

    await homePage.navigateToPage();
  });

  test("Users should be able to buy product successfully", async () => {
    const firstProductTitle = await homePage.getFirstProductTitle();
    const firstProductPrice = await homePage.getFirstProductPrice();

    await homePage.selectFirstProduct();

    const productDetailsPage = new ProductDetailsPage(page);

    const productTitle = await productDetailsPage.getProductTitle();
    const productPrice = await productDetailsPage.getProductPrice();

    expect(productTitle).toBe(firstProductTitle);
    expect(productPrice).toContain(firstProductPrice);

    await productDetailsPage.addProductToCart();

    await productDetailsPage.header.clickToCartHeader();

    const cartPage = new CartPage(page);

    const totalCartPrice = await cartPage.getTotalPrice();

    expect(productPrice).toContain(totalCartPrice);

    const orderDetails: OrderDetails = {
      name: "name",
      country: "country",
      city: "city",
      creditCard: 1234567891234567,
      month: 1,
      year: 1234,
    };

    await cartPage.placeOrder(orderDetails);

    const successPurchaseModal = await cartPage.getSuccessPurchaseModal();

    const dateInstance = new Date();
    const currentDate = `${dateInstance.getDate()}/${
      dateInstance.getMonth() + 1
    }/${dateInstance.getFullYear()}`;

    expect(await successPurchaseModal.getTitle()).toBe(
      "Thank you for your purchase!"
    );
    expect(await successPurchaseModal.getModalText()).toContain("Id");
    expect(await successPurchaseModal.getModalText()).toContain(
      `${firstProductPrice.substring(1)}`
    );
    expect(await successPurchaseModal.getModalText()).toContain(
      `${orderDetails.creditCard}`
    );
    expect(await successPurchaseModal.getModalText()).toContain(
      `${orderDetails.name}`
    );
    expect(await successPurchaseModal.getModalText()).toContain(
      `${currentDate}`
    );
  });
});
