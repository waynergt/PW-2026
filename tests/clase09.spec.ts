import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

// 1. Definir los tipos para fixtures de test y de worker
type AppFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  cronometro: void;
};

type WorkerFixtures = {
  contadorWorker: number;
};

let contadorGlobal = 0;

// 2. Extender correctamente indicando ambos tipos genéricos
export const test = base.extend<AppFixtures, WorkerFixtures>({
  // --- FIXTURES DEL LABORATORIO ---
  loginPage: async ({ page }, use) => {
    const lp = new LoginPage(page);
    await lp.navigate();
    await use(lp);
  },

  inventoryPage: async ({ page }, use) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory/);
    const ip = new InventoryPage(page);
    await use(ip);
  },

  cartPage: async ({ page }, use) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory/);
    
    await page.locator('.btn_inventory').first().click();
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('.cart_item').first()).toBeVisible();
    
    const cp = new CartPage(page);
    await use(cp);
  },

  // --- RETO 1: FIXTURE CON TEARDOWN ---
  cronometro: async ({}, use) => {
    const inicio = Date.now();
    console.log(`[Cronómetro - Reto 1] Test iniciado`);
    await use();
    const fin = Date.now();
    console.log(`[Cronómetro - Reto 1] El test tardó ${fin - inicio} ms.`);
  },

  // --- RETO 2: FIXTURE DE ALCANCE WORKER ---
  contadorWorker: [async ({}, use: (r: number) => Promise<void>) => {
    contadorGlobal++;
    console.log(`[Worker Scope] Inicializando worker. Valor: ${contadorGlobal}`);
    await use(contadorGlobal);
  }, { scope: 'worker' }],
});

export { expect };


test.describe('Clase 09 - Fixtures y datos de prueba', () => {
  test('Usando fixture de login: verificar inventario', async ({ inventoryPage }) => {
    const count = await inventoryPage.getProductCount();
    expect(count).toBe(6);
    console.log(`Inventario tiene ${count} productos (via fixture)`);
  });

  test('Usando fixture de carrito: verificar que hay 1 item', async ({ cartPage }) => {
    const count = await cartPage.getItemCount();
    expect(count).toBe(1);
    console.log(`Carrito tiene ${count} item (via fixture)`);
  });

  test('Usando fixture de loginPage: login manual en el test', async ({ loginPage, page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
  });
});

// Datos de prueba para diferentes usuarios
const usuariosDeLogin = [
  { username: 'standard_user', password: 'secret_sauce', esperadoURL: /inventory/, descripcion: 'usuario estándar puede ingresar' },
  { username: 'locked_out_user', password: 'secret_sauce', esperadoURL: null, descripcion: 'usuario bloqueado no puede ingresar' },
  { username: '', password: '', esperadoURL: null, descripcion: 'campos vacíos muestran error' },
];

test.describe('Clase 09 - Tests parametrizados de login', () => {
  for (const datos of usuariosDeLogin) {
    test(`Login: ${datos.descripcion}`, async ({ page }) => {
      await page.goto('https://www.saucedemo.com');
      await page.locator('#user-name').fill(datos.username);
      await page.locator('#password').fill(datos.password);
      await page.locator('#login-button').click();

      if (datos.esperadoURL) {
        await expect(page).toHaveURL(datos.esperadoURL);
        console.log(`${datos.descripcion}: acceso correcto`);
      } else {
        const error = page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
        console.log(`${datos.descripcion}: error mostrado correctamente`);
      }
    });
  }
});

const productosAVerificar = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
];

test.describe('Clase 09 - Agregar productos al carrito (parametrizado)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory/);
  });

  for (const nombreProducto of productosAVerificar) {
    test(`Agregar "${nombreProducto}" al carrito`, async ({ page }) => {
      const producto = page.locator('.inventory_item', { hasText: nombreProducto });
      await producto.locator('.btn_inventory').click();
      
      await expect(page.locator('.shopping_cart_badge')).toBeVisible();
      
      await page.locator('.shopping_cart_link').click();
      await expect(page.locator('.inventory_item_name', { hasText: nombreProducto })).toBeVisible();
      console.log(`"${nombreProducto}" verificado en carrito`);
    });
  }
});



// TESTS RETO FIXTURES AVANZADOOS

// Reto 1: Fixture con teardown real
test('Reto 1 - Fixture con teardown real y cronómetro', async ({ cronometro, page }) => {
  await page.goto('https://www.saucedemo.com');
  await expect(page).toHaveTitle(/Swag Labs/);
});

// Reto 2: Fixture de alcance worker
test('Reto 2 - Test A con worker fixture', async ({ contadorWorker }) => {
  expect(contadorWorker).toBeGreaterThan(0);
});

test('Reto 2 - Test B con worker fixture', async ({ contadorWorker }) => {
  expect(contadorWorker).toBe(1);
});

// Reto 3: test.use() + parametrización de viewports
const viewports = [
  { device: 'Móvil', width: 375, height: 667 },
  { device: 'Escritorio', width: 1280, height: 800 },
];

for (const vp of viewports) {
  test.describe(`Reto 3 - Ejecución en pantalla de ${vp.device}`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    test(`Validar login responsivo en ${vp.device}`, async ({ page }) => {
      await page.goto('https://www.saucedemo.com');
      await page.locator('#user-name').fill('standard_user');
      await page.locator('#password').fill('secret_sauce');
      await page.locator('#login-button').click();
      
      await expect(page).toHaveURL(/inventory/);
      console.log(`Login correcto en ${vp.device} (${vp.width}x${vp.height})`);
    });
  });
}