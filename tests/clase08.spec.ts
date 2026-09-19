import { test, expect, type Page } from '@playwright/test';
import { loginAs } from '../helpers/auth';

test.describe('Clase 08 - Suite de inventario con hooks', () => {
  test.describe.configure({ mode: 'parallel' });

  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'standard_user');
    await expect(page).toHaveURL(/inventory/);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const nombreSeguro = testInfo.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      try {
        await page.screenshot({
          path: `./evidencias/fallo-${nombreSeguro}.png`,
          fullPage: true
        });
        console.log(`Test fallido: ${testInfo.title} - Screenshot guardado`);
      } catch (e) {
        console.log('No se pudo capturar screenshot:', e);
      }
    }
  });

  test('El inventario muestra 6 productos', async ({ page }) => {
    const items = page.locator('.inventory_item');
    await expect(items).toHaveCount(6);
  });

  test('Todos los productos tienen precio visible', async ({ page }) => {
    const precios = page.locator('.inventory_item_price');
    const cantidad = await precios.count();
    for (let i = 0; i < cantidad; i++) {
      const precio = precios.nth(i);
      await expect(precio).toBeVisible();
      const textoPrecio = await precio.textContent();
      expect(textoPrecio).toMatch(/^\$\d+\.\d{2}$/); 
    }
  });

  test('Todos los productos tienen imagen visible', async ({ page }) => {
    const imagenes = page.locator('.inventory_item img');
    const cantidad = await imagenes.count();
    for (let i = 0; i < cantidad; i++) {
      await expect(imagenes.nth(i)).toBeVisible();
      const src = await imagenes.nth(i).getAttribute('src');
      expect(src).not.toBeNull();
    }
  });

  test('El menú de hamburguesa funciona', async ({ page }) => {
    await page.locator('#react-burger-menu-btn').click();
    await page.waitForSelector('.bm-menu', { state: 'visible' });
    await expect(page.getByText('All Items')).toBeVisible();
    await expect(page.getByText('About')).toBeVisible();
    await expect(page.getByText('Logout')).toBeVisible();
    await expect(page.getByText('Reset App State')).toBeVisible();
    await page.locator('#react-burger-cross-btn').click();
    await page.waitForSelector('.bm-menu', { state: 'hidden' });
  });

  test('Logout funciona correctamente', async ({ page }) => {
    await page.locator('#react-burger-menu-btn').click();
    await page.getByText('Logout').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('#login-button')).toBeVisible();
  });
});

// ----------- SUITE SEPARADA: Comportamiento con diferentes usuarios -----------
test.describe('Clase 08 - Comportamiento por tipo de usuario', () => {
  test.describe.configure({ mode: 'parallel' });

  test('Usuario estándar puede completar el checkout', async ({ page }) => {
    await loginAs(page, 'standard_user');
    await page.locator('.btn_inventory').first().click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test('Usuario de rendimiento degrado experimenta lentitud', async ({ page }) => {
    // Reto 2: test.slow() para triplicar el timeout
    test.slow(); 
    const inicio = Date.now();
    await loginAs(page, 'performance_glitch_user');
    const tiempoLogin = Date.now() - inicio;
    console.log(`Tiempo de login (glitch user): ${tiempoLogin}ms`);
    expect(tiempoLogin).toBeGreaterThan(0);
    await expect(page).toHaveURL(/inventory/);
  });
});

// ----------- RETO 1: Suite serial con página compartida -----------
test.describe('Reto 1 - Suite serial con página compartida', () => {
  // Configuración en modo serial
  test.describe.configure({ mode: 'serial' });

  let sharedPage: Page;

  test.beforeAll(async ({ browser }) => {
    // Se crea una única página compartida entre los tests de esta suite
    sharedPage = await browser.newPage();
    await loginAs(sharedPage, 'standard_user');
  });

  test.afterAll(async () => {
    await sharedPage.close();
  });

  test('Paso 1: Agregar producto al carrito en página compartida', async () => {
    await sharedPage.locator('.btn_inventory').first().click();
    await expect(sharedPage.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('Paso 2: La misma página mantiene la sesión y el carrito', async () => {
    await sharedPage.locator('.shopping_cart_link').click();
    await expect(sharedPage.locator('.cart_item')).toBeVisible();
  });
});

// ----------- RETO 3: test.skip() dinámico -----------
test('Reto 3 - test.skip() dinámico evaluado en tiempo de ejecución', async ({ page }) => {
  // Condición dinámica: Omitir si estamos en fin de semana
  const diaDeLaSemana = new Date().getDay();
  const esFinDeSemana = diaDeLaSemana === 0 || diaDeLaSemana === 6;

  if (esFinDeSemana) {
    test.skip(true, 'No se ejecutan pruebas de estrés los fines de semana');
  }

  await loginAs(page, 'standard_user');
  await expect(page).toHaveURL(/inventory/);
});