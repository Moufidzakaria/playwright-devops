import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://freelance-learn-automation.vercel.app/login');
  await page.getByRole('textbox', { name: 'Enter Email' }).click();
  
  await page.getByRole('textbox', { name: 'Enter Email' }).fill('admin@email.com');
  await page.getByRole('textbox', { name: 'Enter Password' }).click();
  await page.getByRole('textbox', { name: 'Enter Password' }).fill('admin@123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Add to Cart right arrow' }).first().click();
  await page.getByText('Manage', { exact: true }).click();
  await page.getByRole('button', { name: 'Cart 1' }).click();
  await page.getByRole('button', { name: 'Enroll Now' }).click();
  await page.locator('#address').click();
  await page.locator('#address').fill('1231123');
  await page.locator('#phone').click();
  await page.locator('#phone').fill('12313');
  await page.getByRole('dialog').getByRole('button', { name: 'Enroll Now' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();
});