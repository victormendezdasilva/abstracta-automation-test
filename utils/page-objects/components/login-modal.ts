import { Page, expect } from "@playwright/test";

export class LoginModal {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getModalTitle() {
    await this.page.waitForSelector("#logInModalLabel");
    return this.page.locator("#logInModalLabel");
  }

  async getUsernameInput() {
    await this.page.waitForSelector("#logInModalLabel");
    return this.page.locator("#loginusername");
  }

  async getPasswordInput() {
    await this.page.waitForSelector("#logInModalLabel");
    return this.page.locator("#loginpassword");
  }

  async enterUsername(username: string) {
    await this.page.waitForSelector("#logInModalLabel");
    await this.page.locator("#loginusername").fill(username);
  }

  async enterPassword(password: string) {
    await this.page.waitForSelector("#logInModalLabel");
    await this.page.locator("#loginpassword").fill(password);
  }

  async clickLogin() {
    expect(
      await this.page
        .locator("button.btn-primary")
        .getByText("Log in")
        .getAttribute("onclick")
    ).toBe("logIn()");

    await this.page.locator("button.btn-primary").getByText("Log in").click();

    await this.page.reload();
  }

  async clickClose() {
    await this.page.waitForSelector("#logInModalLabel");
    await this.page
      .locator("#logInModalLabel")
      .locator("+ button[aria-label='Close']")
      .click();
  }
}

const API_URL = "https://api.demoblaze.com";
const token = "";
