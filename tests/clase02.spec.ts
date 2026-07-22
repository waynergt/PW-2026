import{test, expect} from '@playwright/test';
import * as fs from 'fs';

//Crear carpeta para videncias si no existe
test.beforeAll(() => {
  if (!fs.existsSync('./evidencias')) {
    fs.mkdirSync('./evidencias');
  }
});

test.describe('Clase 02 -  Navegación y esperas en DemoBlaze', () => {
test('Navegar al carrito y regresar al incio', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/demoblaze/);

  await page.screenshot({ path: './evidencias/01-pagina-inicio.png', fullPage: true });
  
  await page.getByText('Cart').click();
  await page.waitForURL('**/cart.html');
  await expect(page).toHaveURL(/cart/);

  await page.screenshot({ path: './evidencias/02-pagina-carrito.png', fullPage: true });

  await page.goBack();
  await expect(page).toHaveURL(/demoblaze\.com\/?$/);
});

  test('Navegar a la Categoría Phones y ver un producto', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Phones').click();
   
    await page.waitForSelector('.card-title a');

    const productos = page.locator('.card-title a');
    expect(await productos.count()).toBeGreaterThan(0);

    await page.screenshot({ path: './evidencias/03-pagina-phones.png', fullPage: true });
    
    await productos.first().click();
    await page.waitForLoadState('domcontentloaded');
    await expect(page.locator('.name')).toBeVisible();
    await page.screenshot({ path: './evidencias/03-detalle-producto.png', fullPage: true });

    await expect(page.getByText('Add to cart')).toBeVisible();
  });

test('Capturar el navbar y el footer por separado', async ({ page }) => {
    await page.goto('/');

    const navbar = page.locator('#navbarExample'); // Nota: Aunque parece '#naniExample', por contexto de la app suele ser '#navbarExample'
    await navbar.screenshot({ path: './evidencias/04-navbar.png' });

    // Apuntamos al contenedor padre completo
    const footerCompleto = page.locator('#footc');
    await footerCompleto.waitFor({ state: 'visible' });// Eliminamos el if y Forzamos a Playwright a esperar a que el footer esté visible en el DOM
    await footerCompleto.scrollIntoViewIfNeeded// Forzamos a Playwright a hacer scroll hasta el footer y hacer la captura de pantalla
    await footerCompleto.screenshot({ path: './evidencias/05-footer.png' });
});

test('Verificar tiempo de carga de la página',
    async ({ page }) => {
        const startTime = Date.now();

        await page.goto('/');
        await page.waitForLoadState('load');

        const loadTime = Date.now() - startTime;
        console.log(`Tiempo de carga: ${loadTime}ms`);

        // La página debería cargar en menos de 10s
        expect(loadTime).toBeLessThan(10000);
    });

});