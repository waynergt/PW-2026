import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { MenuPage } from '../pages/MenuPage';

test.describe('Clase 06 - Page Object Model en Sauce Demo', () => {

  test('Login exitoso con POM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.expectToBeOnInventoryPage();
    
    await page.screenshot({ path: 'evidencias/clase06-login-exitoso.png' });
  });

  test('Login fallido con POM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('wrong_user', 'wrong_pass');
    await loginPage.expectLoginError('Username and password do not match');
    
    await page.screenshot({ path: 'evidencias/clase06-login-fallido.png' });
  });

  test('Flujo completo: login → agregar 2 productos → verificar carrito', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectToBeOnInventoryPage();
    
    await inventoryPage.addProductByName('Sauce Labs Backpack');
    await inventoryPage.addProductByName('Sauce Labs Bike Light');
    
    await expect(inventoryPage.cartBadge).toHaveText('2');
    
    await inventoryPage.goToCart();
    await cartPage.expectItemCount(2);
    
    await page.screenshot({ path: 'evidencias/clase06-flujo-completo-carrito.png' });
  });

  test('Verificar que el inventario tiene 6 productos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    const count = await inventoryPage.getProductCount();
    expect(count).toBe(6);

    await page.screenshot({ path: 'evidencias/clase06-inventario-6-productos.png' });
  });

  test('Ordenar productos de mayor a menor precio', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    
    await inventoryPage.sortBy('hilo');

    const precios = page.locator('.inventory_item_price');
    const todosLosPrecios = await precios.allTextContents();
    const numericos = todosLosPrecios.map(p => parseFloat(p.replace('$', '')));
    
    for (let i = 0; i < numericos.length - 1; i++) {
      expect(numericos[i]).toBeGreaterThanOrEqual(numericos[i + 1]);
    }

    await page.screenshot({ path: 'evidencias/clase06-orden-mayor-a-menor.png' });
  });

  // TESTS RETO

  test('Reto 1: Flujo de compra completo', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.addProductByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();

    await checkoutPage.startCheckout();
    await checkoutPage.fillInformation('Wayner', 'López', '01001');
    await checkoutPage.finishCheckout();
    await checkoutPage.expectCheckoutComplete();

    await page.screenshot({ path: 'evidencias/clase06-reto1-compra-completa.png' });
  });

  test('Reto 2: Flujo de logout desde el menú', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const menuPage = new MenuPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    await menuPage.openMenu();
    await menuPage.logout();

    await expect(page.locator('[data-test="login-button"]')).toBeVisible();

    await page.screenshot({ path: 'evidencias/clase06-reto2-logout-exitoso.png' });
  });

  test('Reto 3: Remover producto y verificar badge', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addProductByName('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.removeProductByName('Sauce Labs Backpack');
    await expect(inventoryPage.cartBadge).toBeHidden();

    await page.screenshot({ path: 'evidencias/clase06-reto3-producto-removido.png' });
  });
});