import { Page } from "@playwright/test";

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getAllProductsFromActivePage() {
    await this.page.waitForSelector("div.card-block");
    return await this.page.locator("div.card-block").all();
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
}
