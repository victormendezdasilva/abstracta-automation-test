import { Header } from "./components/header";
import { Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get header() {
    return new Header(this.page);
  }

  async getAllProductsFromActivePage() {
    await this.page.waitForSelector("div.card-block");
    return await this.page.locator("div.card-block").all();
  }

  async getFirstProductTitle() {
    await this.page.waitForSelector("div.card-block");
    return await this.page
      .locator("div.card-block")
      .first()
      .locator("h4.card-title")
      .innerText();
  }

  async getFirstProductPrice() {
    await this.page.waitForSelector("div.card-block");
    return await this.page
      .locator("div.card-block")
      .first()
      .locator("h5")
      .innerText();
  }

  async navigateToPage() {
    await this.page.goto("/");
  }

  async goToNextProductPage() {
    await this.page.locator("#next2").locator("..").click();
    await this.page.waitForResponse(
      (response) =>
        response.url().includes("/pagination") && response.status() === 200
    );
  }

  async selectFirstProduct() {
    await this.page.waitForSelector("div.card-block");
    await this.page
      .locator("div.card-block")
      .first()
      .locator("h4.card-title a")
      .click();
  }
}
