# Aseguramiento de Calidad de Software
## Proyecto de Pruebas Automatizadas con Playwright

---

## 👤 Información del Estudiante

| Campo | Información |
|-------|------------|
| **Nombre** | Wayner Alberto López y López |
| **Número de Carné** | 1790-14-11226 |
| **Curso** | Aseguramiento de Calidad de Software |

---

## 👨‍🏫 Instructor

**Ingeniero:** Ing. MA. Carmelo Estuardo Mayén Monterroso

---

## 🔧 Entorno de Desarrollo

| Herramienta | Versión |
|-----------|---------|
| **Node.js** | v24.15.0 |
| **Framework Testing** | Playwright |
| **Lenguaje** | TypeScript |
| **Navegador** | Chromium |

---

## 📋 Descripción del Proyecto

Este proyecto implementa un conjunto de pruebas automatizadas utilizando **Playwright** para validar la funcionalidad de la aplicación web **DemoBlaze** (Tienda de Productos). Las pruebas están divididas en dos suites principales: `clase01.spec.ts` y `clase02.spec.ts`.

---

## ✅ Suite de Pruebas - Clase 01

### Versión de Node.js

![Captura 14: Reporte de Pruebas](./public/14_captura.png)

---

### Prueba 1
Validación de que la página principal se carga sin errores, el menú de categorias es visible y la barra de navegación tiene los enlaces.

![Captura 1: Página Principal](./public/01_captura.png)
![Captura 2: Página Cargada](./public/02_captura.png)
![Captura 3: Validación de Carga](./public/03_captura.png)

---

### Prueba 2
Reporte HTML

![Captura 4: Menú de Categorías](./public/04_captura.png)
![Captura 5: Barra de Navegación](./public/05_captura.png)
![Captura 6: Navegación Visible](./public/06_captura.png)
![Captura 7: Enlaces Validados](./public/07_captura.png)
![Captura 8: Navegación Completa](./public/08_captura.png)

---

### Prueba 3 
Modo Visual (Interfaz UI)

![Captura 9: Barra de Navegación Clase 02](./public/09_captura.png)
![Captura 10: Validación de Enlaces](./public/10_captura.png)
![Captura 11: Verificación de Elementos](./public/11_captura.png)
![Captura 12: Pruebas Ejecutándose](./public/12_captura.png)
![Captura 13: Validación Final](./public/13_captura.png)

---

## 🎯 Resultados de las Pruebas

```
✓ Clase 01 - La página carga
✓ Clase 01 - El menú de categorías es visible
✓ Clase 01 - La barra de navegación tiene los enlaces
✓ Clase 02 - La barra de navegación tiene los enlaces

Total: 4 pruebas pasadas
Tiempo total: 6.3s
```

---

## 🚀 Cómo Ejecutar las Pruebas

### Instalación de Dependencias
```bash
npm install
```

### Ejecutar todas las pruebas
```bash
npm playwright test
```

### Ejecutar suite específica
```bash
npm playwright test tests/clase01.spec.ts
npm playwright test tests/clase02.spec.ts
```

### Ver reporte interactivo
```bash
npx playwright show-report
```

---

## 📊 Configuración de Playwright

### URL Base
```
https://www.demoblaze.com
```

### Configuración del Navegador
- **Tipo**: Chromium (Desktop Chrome)
- **Modo**: No headless (visible en pantalla)
- **Screenshots**: Solo en fallos
- **Video**: Retener en fallos
- **Timeout**: 30 segundos

---

## 🔍 Elementos Validados

### Elementos de la Página Principal
| Elemento | Localizador | Estado |
|----------|------------|--------|
| Título de la página | `STORE` | ✅ Visible |
| Categorías | `#cat1` | ✅ Visibles |
| Navegación | `#navbarExample` | ✅ Completa |
| Enlaces | Home, Contact, About us, Cart, Log in, Sign up | ✅ Funcionales |

---

## 💡 Tecnologías Utilizadas

- **Playwright**: Framework de automatización de pruebas
- **TypeScript**: Lenguaje de programación tipado
- **Node.js v24.15.0**: Runtime de JavaScript
- **HTML Reporter**: Generación de reportes visuales

---

## 📝 Notas Importantes

- Las pruebas se ejecutan en **modo no headless** para visualización en tiempo real
- Se capturan pantallas solo cuando hay fallos
- Los videos se retienen cuando hay fallos en las pruebas
- El timeout por defecto es de 30 segundos por prueba

---

## 📅 Fecha de Entrega

**17 de julio de 2026**

---

## ✨ Estado del Proyecto

![Estado](https://img.shields.io/badge/Status-En%20Desarrollo-blue)
![Pruebas](https://img.shields.io/badge/Pruebas-4%20Pasadas-green)
![Node](https://img.shields.io/badge/Node-v24.15.0-green)
![Playwright](https://img.shields.io/badge/Playwright-Latest-blue)

---

**Desarrollado por:** Wayner Alberto López y López  
**Carné:** 1790-14-11226  
**Instructor:** Ing. MA. Carmelo Estuardo Mayén Monterroso
