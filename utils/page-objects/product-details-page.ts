import { expect } from "playwright/test";
import { Header } from "./components/header";
import { Page } from "playwright-core";

export class ProductDetailsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get header() {
    return new Header(this.page);
  }

  async getProductTitle() {
    await this.page.waitForSelector("div.product-deatil");
    return await this.page.locator("h2.name").innerText();
  }

  async getProductPrice() {
    await this.page.waitForSelector("div.product-deatil");
    return await this.page.locator("h3.price-container").innerText();
  }

  async addProductToCart() {
    await this.page.waitForSelector("div.product-deatil");
    await this.page.locator("a.btn-success").click({ force: true });
  }
}
