# Aseguramiento de Calidad de Software
## Proyecto de Pruebas Automatizadas con Playwright

---

<a id="info-estudiante"></a>
## 👤 Información del Estudiante

| Campo | Información |
|-------|------------|
| **Nombre** | Wayner Alberto López y López |
| **Número de Carné** | 1790-14-11226 |
| **Curso** | Aseguramiento de Calidad de Software |

---

<a id="instructor"></a>
## 👨‍🏫 Instructor

**Ingeniero:** Ing. MA. Carmelo Estuardo Mayén Monterroso

---

<a id="entorno-desarrollo"></a>
## 🔧 Entorno de Desarrollo

| Herramienta | Versión |
|-----------|---------|
| **Node.js** | v24.15.0 |
| **Framework Testing** | Playwright |
| **Lenguaje** | TypeScript |
| **Navegador** | Chromium |

---

<a id="descripción-del-proyecto"></a>
## 📋 Descripción del Proyecto

Este proyecto implementa un conjunto de pruebas automatizadas utilizando **Playwright** para validar la funcionalidad de la aplicación web **DemoBlaze** (Tienda de Productos). Las pruebas están divididas en dos suites principales: `clase01.spec.ts` y `clase02.spec.ts`.

---

## 📚 Índice

- [Información del Estudiante](#info-estudiante)
- [Instructor](#instructor)
- [Entorno de Desarrollo](#entorno-desarrollo)
- [Descripción del Proyecto](#descripción-del-proyecto)
- [Pruebas - Clase 01](#pruebas-clase-01)
- [Resultados de las Pruebas](#resultados-pruebas)
- [Pruebas - Clase 02](#pruebas-clase-02)
- [Reflexión de auto-wait vs sleep()](#reflexion)
- [Cómo Ejecutar las Pruebas](#ejecutar-pruebas)
- [Configuración de Playwright](#configuracion-playwright)
- [Elementos Validados](#elementos-validados)
- [Tecnologías Utilizadas](#tecnologias-utilizadas)
- [Notas Importantes](#notas-importantes)
- [Fecha de Entrega](#fecha-de-entrega)
- [Estado del Proyecto](#estado-del-proyecto)


<a id="pruebas-clase-01"></a>

## ✅ Pruebas - Clase 01 11/07/2026

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

<a id="resultados-pruebas"></a>

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
<a id="pruebas-clase-02"></a>

## ✅ Pruebas - Clase 02 18/07/2026

A continuación se incluyen todas las capturas registradas durante la ejecución de la suite `clase02.spec.ts` (carpeta `evidencias`).

### Página Inicio
![Captura 01: Página Inicio](./evidencias/01-pagina-inicio.png)

### Página Carrito
![Captura 02: Carrito](./evidencias/02-pagina-carrito.png)

### Detalle Producto
![Captura 03: Detalle Producto](./evidencias/03-detalle-producto.png)

### Página Phones
![Captura 03b: Página Phones](./evidencias/03-pagina-phones.png)

### Navbar
![Captura 04: Navbar](./evidencias/04-navbar.png)

### Footer
![Captura 05: Footer](./evidencias/05-footer.png)

---


<a id="reflexion"></a>

## REFLEXION DE auto-wait vs sleep()

Después de darle muchas vueltas a este tema y pelear con la automatización, he llegado a la conclusión de que seguir usando pausas fijas como sleep() es un "parche" que a la larga destruye nuestra confianza en las pruebas. Al principio parece la salida más fácil cuando un script falla porque la página no cargó rápido, pero la realidad es que el sleep() es completamente ciego: congela la ejecución del código sin importarle si el elemento ya apareció en medio segundo, o si la red está tan lenta que los cinco segundos que le codificamos no van a alcanzar. A la larga, esto solo nos llena el proyecto de pruebas inestables (flaky tests) y nos hace desperdiciar horas de tiempo valioso de cómputo (y dinero) en nuestros pipelines de integración continua esperando por pausas innecesarias.  

Por el contrario, entender y adoptar el "auto-wait" significó un cambio de mentalidad para mí. Herramientas modernas no se quedan simplemente dormidas esperando a que pase el tiempo; están activamente sondeando el sistema, verificando no solo que el elemento exista en el código, sino que sea realmente visible en la pantalla, que no se esté moviendo por una animación y que esté listo para recibir un clic. Esto hace que nuestras pruebas avancen en el milisegundo exacto en que la aplicación está lista, ni un segundo antes, ni un segundo después.  

En resumen, me doy cuenta de que automatizar con calidad no se trata de adivinar cuánto va a tardar un servidor, sino de enseñarle al script a reaccionar dinámicamente al estado de la interfaz. Dejar atrás el sleep() no es solo seguir un capricho teórico o una simple "buena práctica", es la única forma real de dejar de escribir código frágil y empezar a construir una red de seguridad en la que todo el equipo de desarrollo pueda confiar ciegamente.

---

<a id="ejecutar-pruebas"></a>

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

<a id="configuracion-playwright"></a>

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

<a id="elementos-validados"></a>

## 🔍 Elementos Validados


### Elementos de la Página Principal
| Elemento | Localizador | Estado |
|----------|------------|--------|
| Título de la página | `STORE` | ✅ Visible |
| Categorías | `#cat1` | ✅ Visibles |
| Navegación | `#navbarExample` | ✅ Completa |
| Enlaces | Home, Contact, About us, Cart, Log in, Sign up | ✅ Funcionales |

---

<a id="tecnologias-utilizadas"></a>

## 💡 Tecnologías Utilizadas



- **Playwright**: Framework de automatización de pruebas
- **TypeScript**: Lenguaje de programación tipado
- **Node.js v24.15.0**: Runtime de JavaScript
- **HTML Reporter**: Generación de reportes visuales

---

<a id="notas-importantes"></a>

## 📝 Notas Importantes

- Las pruebas se ejecutan en **modo no headless** para visualización en tiempo real
- Se capturan pantallas solo cuando hay fallos
- Los videos se retienen cuando hay fallos en las pruebas
- El timeout por defecto es de 30 segundos por prueba

---
<a id="fecha-de-entrega"></a>

## 📅 Fecha de Entrega

**17 de julio de 2026**

---
<a id="estado-del-proyecto"></a>

## ✨ Estado del Proyecto

![Estado](https://img.shields.io/badge/Status-En%20Desarrollo-blue)
![Pruebas](https://img.shields.io/badge/Pruebas-4%20Pasadas-green)
![Node](https://img.shields.io/badge/Node-v24.15.0-green)
![Playwright](https://img.shields.io/badge/Playwright-Latest-blue)

---

**Desarrollado por:** Wayner Alberto López y López  
**Carné:** 1790-14-11226  
**Instructor:** Ing. MA. Carmelo Estuardo Mayén Monterroso
