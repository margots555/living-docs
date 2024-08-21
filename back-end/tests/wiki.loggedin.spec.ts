import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Profile_test', async ({ page }) => {
  test.slow();
  //continue from setup
  // await page.goto('https://en.wikipedia.org/wiki/Main_Page');
  await page.getByRole('link', { name: 'Margots555' }).click();
  await expect(page.getByRole('heading', { name: 'Hello, ‪Margots555‬!' })).toBeVisible();
})

test('Logs Out Test', async ({ page }) => {
  test.slow();
  //continue from setup
  // await page.goto('https://en.wikipedia.org/wiki/Main_Page');
  await page.getByRole('button', { name: 'Personal tools' }).check();
  await page.getByRole('link', { name: 'Log out' }).click();
  await await expect(page.getByRole('heading', { name: 'Log out' })).toBeVisible();;
})