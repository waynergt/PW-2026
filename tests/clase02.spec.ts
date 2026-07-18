import{test, expect} from '@playwright/test';

test('La barra de navegacion tiene los enlaces', async ({ page }) => {
    await page.goto('/');
    const navbar = page.locator('#navbarExample');
    await expect(navbar.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(navbar.getByRole('link', { name: 'Contact' })).toBeVisible();
    await expect(navbar.getByRole('link', { name: 'About us' })).toBeVisible();
    await expect(navbar.getByRole('link', { name: 'Cart' })).toBeVisible();
    await expect(navbar.getByRole('link', { name: 'Log in' })).toBeVisible();
    await expect(navbar.getByRole('link', { name: 'Sign up' })).toBeVisible();
  });