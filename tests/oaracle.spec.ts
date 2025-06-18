import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://docs.oracle.com/en/java/');
  await page.getByRole('link', { name: 'Big Data' }).click();
  await page.getByRole('link', { name: 'Big Data' }).press('WakeUp');
  await page.getByRole('link', { name: 'Oracle Big Data Appliance' }).click();
  await page.getByRole('link', { name: 'Oracle Big Data Appliance' }).press('WakeUp');
  await page.getByRole('link', { name: 'Configure Oracle Big Data' }).press('WakeUp');
});