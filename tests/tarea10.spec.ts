import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/auth';

test.describe('Tests Reto - Clase 10 (Sauce Demo)', () => {

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'standard_user');
    await expect(page).toHaveURL(/inventory/);
  });

  // Reto 1: Tags múltiples + --grep-invert
  // Este test tiene múltiples tags y se puede excluir usando: npx playwright test --grep-invert "@ui"
  test('Validar título y subtítulo con tags múltiples', { tag: ['@regression', '@ui'] }, async ({ page }) => {
    await expect(page.locator('.app_logo')).toHaveText('Swag Labs');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  // Reto 2: expect.soft()
  // Verifica varios atributos de un producto sin detenerse en el primer fallo; reporta todos al final.
  test('Validación soft de los elementos del primer producto', { tag: '@regression' }, async ({ page }) => {
    const primerItem = page.locator('.inventory_item').first();
    
    // Todas estas son soft assertions: si una falla, la prueba continúa y registra el error al final
    await expect.soft(primerItem.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    await expect.soft(primerItem.locator('.inventory_item_price')).toHaveText('$29.99');
    await expect.soft(primerItem.locator('.btn_inventory')).toHaveText('Add to cart');
  });

  // Reto 3: fixture browserName
  // Ajusta una aserción según el motor real (chromium/firefox/webkit) en lugar de usar test.skip()
  test('Ajustar validación según el motor del navegador (browserName)', { tag: '@regression' }, async ({ page }, testInfo) => {
    const navegador = testInfo.project.use.browserName;
    console.log(`Ejecutando en el motor: ${navegador}`);

    // Ejemplo práctico de adaptación según el navegador/motor
    if (navegador === 'firefox') {
      // Comportamiento específico o validación adaptada para Firefox
      await expect(page.locator('.app_logo')).toBeVisible();
    } else {
      // Comportamiento para Chromium o WebKit
      await expect(page.locator('.app_logo')).toBeVisible();
    }
  });

});