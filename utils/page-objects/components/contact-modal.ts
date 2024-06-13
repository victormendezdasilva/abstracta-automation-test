import { Page } from "@playwright/test";

export class ContactModal {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getModalTitle() {
    await this.page.waitForSelector("#exampleModalLabel");
    return this.page.locator("#exampleModalLabel");
  }

  async close() {
    await this.page.waitForSelector("#exampleModalLabel");
    await this.page
      .locator("#exampleModalLabel")
      .locator("+ button[aria-label='Close']")
      .click();
  }
}
