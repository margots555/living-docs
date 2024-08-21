import { test, expect } from '@playwright/test';

test('Search/General', async ({ page }) => {
  test.slow();
  await page.goto('/');
  await page.getByPlaceholder('Search Wikipedia').fill('Playwright');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.locator('figcaption').filter({ hasText: 'Ben Jonson coined the term "' })).toBeVisible();
});