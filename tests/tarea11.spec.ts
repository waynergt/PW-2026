import { test, expect } from '@playwright/test';
import * as os from 'os';

const BASE_URL = 'https://practice.expandtesting.com';

// Texto correcto del segundo párrafo de /typos.
// En algunas cargas la página lo cambia por "won,t." (el defecto intermitente).
const TEXTO_CORRECTO = "Sometimes you'll see a typo, other times you won't.";

test.describe('Tarea 11 - Documentar defectos con Playwright', () => {

  // Reto 3: borrador de reporte desde un afterEach.
  // Si el test terminó con errores, se adjunta al reporte HTML un borrador en
  // Markdown con el título, el ambiente, la URL y el resultado obtenido.
  test.afterEach(async ({ page, browserName, browser }, testInfo) => {
    if (testInfo.errors.length === 0) return;

    const sinColores = (t: string) => t.replace(/\u001b\[[0-9;]*m/g, '');
    const obtenido = testInfo.errors
      .map(e => sinColores(e.message ?? String(e.value)))
      .join('\n\n');

    const borrador = [
      `# Borrador de Bug Report - ${testInfo.title}`,
      '',
      `**Título:** ${testInfo.title}`,
      `**Fecha:** ${new Date().toISOString().slice(0, 10)}`,
      `**Ambiente:** ${os.type()} ${os.release()}, ${browserName} ${browser.version()}`,
      `**URL:** ${page.url()}`,
      '',
      '## Resultado obtenido',
      '```',
      obtenido,
      '```',
      '',
      '## Pasos para reproducir',
      '1. (completar)',
      '',
      '## Resultado esperado',
      '(completar)',
    ].join('\n');

    await testInfo.attach('borrador-bug-report.md', {
      body: borrador,
      contentType: 'text/markdown',
    });
  });

  test('Reto 1: medir la frecuencia del error de texto en /typos',
    { tag: '@bug' }, async ({ page }, testInfo) => {
      const RECARGAS = 12;
      const parrafo = page.locator('p').filter({ hasText: 'Sometimes you' });
      const detalle: string[] = [];
      let conError = 0;

      await page.goto(`${BASE_URL}/typos`);
      for (let i = 1; i <= RECARGAS; i++) {
        if (i > 1) await page.reload();
        await expect(parrafo).toBeVisible();
        const texto = (await parrafo.innerText()).trim();
        const hayError = texto !== TEXTO_CORRECTO;
        if (hayError) conError++;
        detalle.push(`Carga ${String(i).padStart(2, '0')}: ${hayError ? 'ERROR' : 'ok   '} -> ${texto}`);
      }

      const porcentaje = Math.round((conError / RECARGAS) * 100);
      const frecuencia = `${conError} de ${RECARGAS} (${porcentaje}%)`;

      // Anotación: aparece en la cabecera del test en el reporte HTML.
      testInfo.annotations.push({ type: 'frecuencia', description: frecuencia });
      // Adjunto: el detalle de cada recarga.
      await testInfo.attach('frecuencia-typos', {
        body: `Error de texto en /typos: ${frecuencia}\n\n${detalle.join('\n')}`,
        contentType: 'text/plain',
      });

      // El test mide, no falla por el defecto: solo comprueba que se hicieron las 12 recargas.
      expect(detalle).toHaveLength(RECARGAS);
    });

  // Reto 2: test.fixme con una anotación de issue.
  // El test queda escrito pero NO se ejecuta (cuenta como skipped) mientras el
  // defecto siga abierto. Cuando se corrija, se cambia test.fixme por test.
  test.fixme('Reto 2: el texto de /typos no debe tener errores', {
    tag: '@bug',
    annotation: {
      type: 'issue',
      description: 'https://github.com/waynergt/PW-2026/issues/2',
    },
  }, async ({ page }) => {
    await page.goto(`${BASE_URL}/typos`);
    await expect(page.locator('p').filter({ hasText: 'Sometimes you' }))
      .toHaveText(TEXTO_CORRECTO);
  });

  // Reto 3: este test falla por el defecto BUG-001 (imágenes rotas), así que el
  // afterEach de arriba le adjunta el borrador del reporte. Con test.fail() el
  // fallo es "esperado" y cuenta como passed.
  test('Reto 3: todas las imágenes de /broken-images deben cargar',
    { tag: '@bug' }, async ({ page }) => {
      test.fail(true, 'BUG-001: asdf.jpg y hjkl.jpg responden 404');
      test.info().annotations.push({
        type: 'issue',
        description: 'https://github.com/waynergt/PW-2026/issues/1',
      });
      await page.goto(`${BASE_URL}/broken-images`);
      const imagenes = page.locator('main img');
      await expect.poll(() => imagenes.evaluateAll(
        imgs => imgs.every(img => (img as HTMLImageElement).complete),
      )).toBe(true);
      const anchos = await imagenes.evaluateAll(
        imgs => imgs.map(img => (img as HTMLImageElement).naturalWidth),
      );
      for (const ancho of anchos) {
        expect(ancho).toBeGreaterThan(0);
      }
    });

});
