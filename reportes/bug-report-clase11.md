# Bug Report - BR-CLASE11-001

**Título:** Página de imágenes rotas: 2 de las 3 imágenes no cargan (asdf.jpg y hjkl.jpg responden error 404)
**Fecha:** 16/10/2026
**Reportado por:** Wayner Alberto López y López
**Ambiente:** macOS, Firefox (Playwright 1.61.1, proyecto `firefox`); también ocurre en Chromium — https://practice.expandtesting.com/broken-images
**Issue:** https://github.com/waynergt/PW-2026/issues/1

## Descripción

En la página `/broken-images`, dos de las tres imágenes del contenido principal no se muestran. El navegador pide `asdf.jpg` y `hjkl.jpg`, el servidor responde **404 Not Found** y en su lugar aparece el ícono de imagen rota. La tercera imagen (`/img/avatar-blank.jpg`) sí carga.

## Severidad: Baja

Es un problema visual: las imágenes no forman parte de ningún flujo (no hay botones, formularios ni datos que dependan de ellas), así que el usuario puede seguir usando la página sin bloqueo.

## Prioridad: P3

Se ve mal y es fácil de detectar, pero no bloquea ninguna salida ni afecta datos; se puede corregir en el próximo sprint.

## Frecuencia: Siempre

Ocurre en el 100 % de las cargas (probado varias veces en Firefox y Chromium). No depende del usuario, de la sesión ni del navegador.

## Pasos para reproducir

1. Abrir https://practice.expandtesting.com/broken-images
2. Esperar a que la página termine de cargar.
3. Observar las tres imágenes debajo del título.
4. (Opcional) Abrir DevTools → pestaña **Network** y filtrar por **Img**.

## Resultado esperado

Las 3 imágenes se muestran correctamente: cada una responde **200** y su ancho natural (`naturalWidth`) es mayor que 0.

## Resultado obtenido

Solo 1 de 3 imágenes se muestra. `asdf.jpg` y `hjkl.jpg` responden **404** y su `naturalWidth` es **0**. El test automatizado falla con:

```
expect(received).toBeGreaterThan(expected)
Expected: > 0
Received:   0
```

## Evidencia

- Test automatizado: `tests/clase11.spec.ts` → "Imágenes rotas: todas las imágenes de la página deben cargar" (etiqueta `@bug`, marcado con `test.fail()` mientras el defecto siga abierto).
- Captura: `evidencias/clase11/imagenes-rotas-todas-las-imagenes-de-la-pagina-deben-cargar.png`
- Reporte HTML (`npx playwright show-report`): mensaje de error, captura, video y traza; en la pestaña **Network** de la traza se ven los 404 de `asdf.jpg` y `hjkl.jpg`.
- Borrador automático generado por el `afterEach` de `tests/tarea11.spec.ts` (adjunto `borrador-bug-report.md` en el reporte HTML).

## Notas adicionales

- Para ver el fallo real, comentar la línea `test.fail(...)` y ejecutar:
  `npx playwright test tests/clase11.spec.ts -g "rotas" --project=firefox`
- Causa probable: las rutas `asdf.jpg` y `hjkl.jpg` no existen en el servidor (archivo faltante o ruta mal escrita en el HTML).
- Cuando se corrija, el test con `test.fail()` se pondrá en rojo: esa es la señal para quitar `test.fail()`, verificar y cerrar el Issue.
