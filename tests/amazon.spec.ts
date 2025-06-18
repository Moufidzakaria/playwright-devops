import { test, expect, chromium } from '@playwright/test';

test('scrape amazon products', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const searchTerm = "laptop";
  const url = `https://www.amazon.com/s?k=${encodeURIComponent(searchTerm)}`;

  await page.goto(url, { waitUntil: "domcontentloaded" });

  await page.waitForSelector("div.s-main-slot div[data-component-type='s-search-result']");

  const products = await page.$$eval("div.s-main-slot div[data-component-type='s-search-result']", items => {
    return items.slice(0, 10).map(item => {
      const title = item.querySelector("h2 a span")?.innerText || null;
      const priceWhole = item.querySelector(".a-price-whole")?.innerText || "";
      const priceFraction = item.querySelector(".a-price-fraction")?.innerText || "";
      const price = priceWhole ? priceWhole + priceFraction : null;
      const rating = item.querySelector(".a-icon-alt")?.innerText || null;
      return { title, price, rating };
    });
  });

  console.log(products);
  await browser.close();

  expect(products.length).toBeGreaterThan(0); // assertion pour test
});
