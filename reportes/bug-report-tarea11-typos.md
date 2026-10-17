# Bug Report - BR-TAREA11-001

**Título:** Página de errores de texto: el párrafo a veces muestra "won,t" en lugar de "won't"
**Fecha:** 16/10/2026
**Reportado por:** Wayner Alberto López y López
**Ambiente:** macOS, Firefox (Playwright 1.61.1, proyecto `firefox`) — https://practice.expandtesting.com/typos
**Issue:** https://github.com/waynergt/PW-2026/issues/2

## Descripción

En `/typos`, el segundo párrafo a veces se muestra con una coma en lugar del apóstrofo: "other times you **won,t**." en vez de "other times you **won't**.".

## Severidad: Baja

Es un error de texto (cosmético); no afecta ningún flujo.

## Prioridad: P4

Página de poco tráfico y sin impacto en el negocio: queda en backlog.

## Frecuencia: Intermitente

Aproximadamente la mitad de las cargas; el valor exacto de cada corrida queda en la anotación `frecuencia` del test "Reto 1" (por ejemplo, 7 de 12).

## Pasos para reproducir

1. Abrir https://practice.expandtesting.com/typos
2. Leer el segundo párrafo.
3. Recargar la página (F5) varias veces y volver a leerlo.

## Resultado esperado

Siempre: "Sometimes you'll see a typo, other times you won't."

## Resultado obtenido

En algunas cargas: "Sometimes you'll see a typo, other times you won,t."

## Evidencia

- `tests/tarea11.spec.ts` → "Reto 1": anotación `frecuencia` y adjunto `frecuencia-typos` con el detalle de las 12 recargas.
- `tests/tarea11.spec.ts` → "Reto 2": test con `test.fixme` enlazado a este Issue.

## Notas adicionales

Cuando se corrija, cambiar `test.fixme` por `test` en el Reto 2 y verificar que pase en 12 recargas seguidas.
