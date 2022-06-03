const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { putText, getText } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`http://${string}.tmweb.ru/client/index.php`, {
    setTimeout: 20000,
  });
});

When("User booking one seat", async function () {
  await clickElement(page, "[data-seance-start='1140']");
  await clickElement(page, ".buying-scheme__wrapper > div:nth-child(1) > span:nth-child(1)");
  await clickElement(page, ".acceptin-button");
});

When("User booking one VIP seat", async function () {
  await clickElement(page, "[data-seance-time-stamp='1654272000']");
  await clickElement(page, ".buying-scheme__wrapper > div:nth-child(1) > span.buying-scheme__chair.buying-scheme__chair_vip");
  await clickElement(page, ".acceptin-button");
});

When("User don't booking one seat", async function () {
  await clickElement(page, "[data-seance-id='93']");
  await clickElement(page, "div:nth-child(2) > span.buying-scheme__chair.buying-scheme__chair_standart.buying-scheme__chair_taken");

});

Then("user succsessfull booking", async function () {
  const actual = await getText(page, "h2.ticket__check-title");
  expect(actual).contain("Вы выбрали билеты:");
});

Then("user don't booking", async function () {
  const isDisabled = await page.$eval("button", (button) => button.disabled);
  expect(isDisabled).to.equal(true);
});


