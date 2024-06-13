import { OrderDetails } from "../interfaces/orderDetails";
import { Locator, Page } from "playwright-core";
import { Header } from "./components/header";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get header() {
    return new Header(this.page);
  }

  async getTotalPrice() {
    await this.page.waitForSelector("tr.success");
    return await this.page.locator("h3#totalp").innerText();
  }

  async getSuccessPurchaseModal() {
    const modalSelector = "div.sweet-alert.showSweetAlert.visible";
    await this.page.waitForSelector(modalSelector);
    return new SuccessPurchaseModal(this.page.locator(modalSelector));
  }

  async getPlaceOrderButton() {
    await this.page.waitForSelector("button[data-target='#orderModal']");
    return this.page.locator("button[data-target='#orderModal']");
  }

  async placeOrder(orderDetails: OrderDetails) {
    await this.page.locator("button[data-target='#orderModal']").click();

    await this.page.waitForSelector(
      "#orderModal > div.modal-dialog > div.modal-content"
    );

    await this.page.locator("input#name").fill(orderDetails.name);
    await this.page.fill("input#country", orderDetails.country);
    await this.page.fill("input#city", orderDetails.city);
    await this.page.fill("input#card", `${orderDetails.creditCard}`);
    await this.page.fill("input#month", `${orderDetails.month}`);
    await this.page.fill("input#year", `${orderDetails.year}`);

    await this.page.click("button[onclick='purchaseOrder()']");
  }
}

class SuccessPurchaseModal {
  readonly modalLocator: Locator;

  constructor(modalLocator) {
    this.modalLocator = modalLocator;
  }

  async getTitle() {
    return await this.modalLocator.locator("h2").innerText();
  }

  async getModalText() {
    return await this.modalLocator.locator(`p`).innerText();
  }
}
