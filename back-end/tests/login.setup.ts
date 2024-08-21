import { test as setup, expect } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';


setup('Loggin_test', async ({ page }) => {
    setup.slow();
    await page.goto('https://wikipedia.org');
    let firstWikiPage = page.getByRole('link', { name: 'English 6,847,000+ articles' });
    await firstWikiPage.highlight();
    await firstWikiPage.blur();
    await firstWikiPage.hover();
    await firstWikiPage.screenshot({ animations: 'disabled', path: 'link.png' });
    await firstWikiPage.click();
    // let login = page.getByRole('link', { name: 'Log in', exact: true});
    let login = page.getByRole('link', { name: 'Log in', exact: true }).first();

    await login.highlight();
    await login.blur();
    await login.hover();
    await login.screenshot({ animations: 'disabled', path: 'loginLink.png' });
    await login.click();
    // await page.getByPlaceholder('Enter your username').fill('Margots555');
    await page.getByPlaceholder('Enter your username').fill(process.env.USER_NAME!);
    await page.getByPlaceholder('Enter your password').click();
    // await page.getByPlaceholder('Enter your password').fill('38394815');
    await page.getByPlaceholder('Enter your password').fill(process.env.PASSWORD!);
    await page.getByRole('button', { name: 'Log in' }).click();

    await page.context().storageState({ path: STORAGE_STATE });
});