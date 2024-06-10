import { ProductPage } from "../page-objects/product-page";
import { test } from "@playwright/test";
import fs from "fs";

test("Return title, link and price for each Product", async ({ page }) => {
  const productPage = new ProductPage(page);
  let report = "";

  await productPage.navigateToPage();

  const cardsFromPageOne = await productPage.getAllProductsFromActivePage();

  for (const card of cardsFromPageOne) {
    const cardTitle = card.locator("h4.card-title a").innerText();
    const cardPrice = card.locator("h5").innerText();
    const cardLink = card.locator("h4.card-title a").getAttribute("href");

    let cardInformation = `Product No. ${
      cardsFromPageOne.indexOf(card) + 1
    }: ${await cardTitle}, ${await cardPrice}, demoblaze.com/${await cardLink}\n`;

    report = report + cardInformation;
  }

  await productPage.goToNextProductPage();

  const cardsFromPageTwo = await productPage.getAllProductsFromActivePage();

  for (const card of cardsFromPageTwo) {
    const cardTitle = card.locator("h4.card-title a").innerText();
    const cardPrice = card.locator("h5").innerText();
    const cardLink = card.locator("h4.card-title a").getAttribute("href");

    let cardInformation = `Product No. ${
      cardsFromPageTwo.indexOf(card) + 10
    }: ${await cardTitle}, ${await cardPrice}, demoblaze.com/${await cardLink}\n`;

    report = report + cardInformation;
  }

  fs.writeFileSync("products.text", report);
});
