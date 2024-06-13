import { HomePage } from "../utils/page-objects/product-page";
import { test } from "@playwright/test";
import fs from "fs";

test("Return title, link and price for each Product", async ({ page }) => {
  const homePage = new HomePage(page);
  let report = "";

  await homePage.navigateToPage();

  const cardsFromPageOne = await homePage.getAllProductsFromActivePage();

  for (const card of cardsFromPageOne) {
    const cardTitle = card.locator("h4.card-title a").innerText();
    const cardPrice = card.locator("h5").innerText();
    const cardLink = card.locator("h4.card-title a").getAttribute("href");

    let cardInformation = `Product No. ${
      cardsFromPageOne.indexOf(card) + 1
    }: ${await cardTitle}, ${await cardPrice}, demoblaze.com/${await cardLink}\n`;

    report = report + cardInformation;
  }

  await homePage.goToNextProductPage();

  const cardsFromPageTwo = await homePage.getAllProductsFromActivePage();

  for (const card of cardsFromPageTwo) {
    const cardTitle = card.locator("h4.card-title a").innerText();
    const cardPrice = card.locator("h5").innerText();
    const cardLink = card.locator("h4.card-title a").getAttribute("href");

    let cardInformation = `Product No. ${
      cardsFromPageTwo.indexOf(card) + 10
    }: ${await cardTitle}, ${await cardPrice}, demoblaze.com/${await cardLink}\n`;

    report = report + cardInformation;
  }

  fs.writeFileSync("products.txt", report);
});
