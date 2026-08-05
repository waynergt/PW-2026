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

Este proyecto implementa un conjunto de pruebas automatizadas utilizando **Playwright** para validar la funcionalidad de la aplicación web **DemoBlaze** (Tienda de Productos). Actualmente incluye varios flujos de prueba que abarcan desde la carga inicial del sitio y navegación, hasta el registro de usuarios, login, agregado de productos al carrito, validaciones de errores y operaciones de `Place Order`. Las suites principales cubren `clase01.spec.ts`, `clase02.spec.ts` y `clase04.spec.ts`.

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
- [Clase 03](#clase-03)
- [Pruebas - Clase 04](#pruebas-clase-04)
- [Reflexión Clase 04](#reflexion-clase-04)
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

<a id="clase-03"></a>

## ✅ Clase 03

### Caso de Prueba TC-001: Agregar un producto al carrito en DemoBlaze

- **ID:** TC-001
- **Título:** Agregar un producto al carrito en DemoBlaze
- **Precondición:** El usuario se encuentra en la página principal de DemoBlaze y el producto seleccionado está disponible en el catálogo.

#### Pasos
1. Ir a la página principal de DemoBlaze.
2. Hacer clic en el nombre o imagen de un producto del catálogo (por ejemplo, Samsung Galaxy S6).
3. Esperar a que cargue la página de detalles del producto.
4. Hacer clic en el botón "Add to cart".
5. Aceptar la alerta emergente de confirmación generada por el navegador.

#### Datos de prueba
- **URL Base:** https://www.demoblaze.com
- **Producto seleccionado:** Samsung Galaxy S6

#### Resultado esperado
El sistema añade el producto a la sesión del carrito de compras, muestra una alerta con el texto "Product added." y al navegar a la sección del carrito el producto se visualiza correctamente.

#### Estado
- **Estado:** Pendiente de ejecución / Aprobado (Pass)

---

<a id="pruebas-clase-04"></a>

## ✅ Pruebas - Clase 04

A continuación se presentan las capturas y descripciones de los tests realizados en la suite `clase04.spec.ts`.

### Registro de usuario
- Captura de **registro de un nuevo usuario** en la ventana modal de `Sign up` y la alerta de confirmación de registro.

![Captura 01 - Registro de usuario](./evidencias/clase04-01-registro-usuario.png)

### Login exitoso
- Captura de **ingreso exitoso** con el usuario previamente registrado y verificación del nombre mostrado en la barra de navegación.

![Captura 02 - Login exitoso](./evidencias/clase04-02-login-exitoso.png)

### Carrito con producto agregado
- Captura del **flujo completo** que incluye seleccionar un producto, agregarlo al carrito y verificarlo en la página de `Cart`.

![Captura 03 - Carrito con producto](./evidencias/clase04-03-carrito-con-producto.png)

### Login con credenciales incorrectas
- Captura del intento de login con usuario y contraseña inválidos, validación del mensaje de error y la ausencia de usuario autenticado.

![Captura 04 - Login credenciales incorrectas](./evidencias/clase04-04-login-credenciales-incorrectas.png)

### Reto Place Order
- Captura de la **ventana modal `Place Order`** con los campos completados utilizando `fill()` para nombre, país, ciudad y tarjeta de crédito.

![Captura 05 - Formulario Place Order](./evidencias/clase04-05-reto-formulario-place-order.png)

### Cerrar modal de login
- Captura del cierre correcto del modal de login mediante el botón `Close`.

![Captura 06 - Modal cerrado](./evidencias/clase04-06-reto-modal-cerrado.png)

### Campo limpiado con clear()
- Captura de la prueba donde se ingresa texto en el campo de usuario del modal de login y se limpia correctamente con `clear()`.

![Captura 07 - Campo limpio](./evidencias/clase04-07-reto-campo-limpio.png)

---

<a id="resultados-pruebas-clase-04"></a>

## 🎯 Resultados de las Pruebas - Clase 04

```
✓ Clase 04 - Registrar nuevo usuario
✓ Clase 04 - Login exitoso con usuario registrado
✓ Clase 04 - Agregar producto al carrito y verificar carrito
✓ Clase 04 - Intento de login con credenciales incorrectas
✓ Clase 04 - Completar formulario Place Order
✓ Clase 04 - Cerrar modal de login con Close
✓ Clase 04 - Llenar y limpiar campo con clear()

Total: 7 pruebas registradas
``` 

---

<a id="reflexion-clase-04"></a>

## 🧠 Reflexión Clase 04

De los 7 principios que vimos, el que más me llamó la atención fue el **Principio 2: las pruebas exhaustivas son imposibles**.

Al principio uno piensa que "probar bien" significa probar todo, todas las combinaciones posibles. Pero haciendo el laboratorio de esta semana me di cuenta de que eso simplemente no se puede. Por ejemplo, en el test de "login con credenciales incorrectas" no probé todas las contraseñas incorrectas que existen (eso sería infinito), solo probé un caso que representa bien el error: un usuario que no existe con una contraseña cualquiera. Y con ese solo caso ya pude confirmar que el sistema se comporta como debería.

Creo que este principio es importante porque me ayuda a pensar diferente a la hora de hacer pruebas: no se trata de intentar cubrir el 100% de los casos posibles, sino de elegir bien cuáles casos probar, priorizando los que tienen más riesgo o los que son más representativos. Eso también se conecta con lo que vimos del Principio 1 (las pruebas muestran defectos, no su ausencia): aunque mis 4 tests pasen, eso no significa que DemoBlaze esté libre de errores, solo significa que en esos casos específicos que probé, todo funcionó bien.

Aplicándolo a mi día a día, esto me sirve para entender que como futuro profesional en QA mi trabajo no es "probar todo" (porque es imposible), sino usar el criterio para decidir qué probar primero y con qué prioridad, dependiendo del riesgo que tenga cada parte del sistema.

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
