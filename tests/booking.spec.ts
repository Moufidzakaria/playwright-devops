import { test, expect, chromium } from '@playwright/test';
import fs from 'fs';

test('Scrape Booking hotels safely', async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
  });
  const page = await context.newPage();

  const city = "Marrakech";
  const url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(city)}`;
  
  console.log("🌐 Going to:", url);

  try {
    await page.goto(url, { timeout: 90000, waitUntil: "domcontentloaded" });

    console.log("⌛ Waiting for hotels to load...");
    await page.waitForSelector("div[data-testid='property-card']", { timeout: 30000 });

    const hotels = await page.$$eval("div[data-testid='property-card']", (cards) => {
      return cards.map(card => {
        const name = card.querySelector("h3[data-testid='title']")?.innerText;
        const price = card.querySelector("span[data-testid='price-and-discounted-price']")?.innerText;
        const rating = card.querySelector("div[aria-label*='Scored']")?.innerText;
        return { name, price, rating };
      });
    });

    console.log("✅ Hotels scrapped:", hotels.length);
    fs.writeFileSync("hotels.json", JSON.stringify(hotels, null, 2));
    expect(hotels.length).toBeGreaterThan(0);

  } catch (error) {
    console.error("❌ Error scraping:", error.message);
  } finally {
    await browser.close();
    console.log("🚪 Browser closed");
  }
});
