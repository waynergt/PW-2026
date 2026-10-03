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

Este proyecto implementa un conjunto de pruebas automatizadas utilizando **Playwright** para validar la funcionalidad de la aplicación web **DemoBlaze** (Tienda de Productos) y **Sauce Demo**. Actualmente incluye varios flujos de prueba que abarcan desde la carga inicial del sitio y navegación, hasta el registro de usuarios, login, agregado de productos al carrito, validaciones de errores, orden de productos y operaciones de checkout. Las suites principales cubren `clase01.spec.ts`, `clase02.spec.ts`, `clase04.spec.ts`, `clase05.spec.ts`, `clase06.spec.ts`, `clase07.spec.ts`, `clase08.spec.ts` y `clase09.spec.ts`.

Además, en la clase 06 se creó la carpeta `pages/` para aplicar el patrón **Page Object Model (POM)**, separando la lógica de interacción por pantalla. Dentro de ella se implementaron los siguientes archivos:

- `pages/LoginPage.ts` para el flujo de autenticación.
- `pages/InventoryPage.ts` para validar el catálogo, el carrito y la ordenación.
- `pages/CartPage.ts` para verificar el contenido del carrito.
- `pages/CheckoutPage.ts` para completar la compra y confirmar el pedido.
- `pages/MenuPage.ts` para manejar el menú lateral y el logout.

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
- [Pruebas - Clase 05](#pruebas-clase-05)
- [Pruebas - Clase 06](#pruebas-clase-06)
- [Pruebas - Clase 07](#pruebas-clase-07)
- [Pruebas - Clase 08](#pruebas-clase-08)
- [Pruebas - Clase 09](#pruebas-clase-09)
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

<a id="pruebas-clase-05"></a>

## ✅ Pruebas - Clase 05 25/07/2026

La clase 05 se enfocó en validar la lógica de autenticación en Sauce Demo, así como la calidad de los asserts de Playwright con `toHaveURL`, `toBeVisible`, `toHaveCount`, `toContainText`, `toBeFocused`, `toHaveCSS` y `soft assertions`. Además, se practicaron reglas de decisión sobre el flujo de compra y la validación del catálogo.

### Descripción breve de cada test

#### 1. CE válida: login con credenciales correctas
Valida que un usuario registrado pueda autenticarse correctamente y que la aplicación redirige al inventario.

![Captura 01 - Login válido](./evidencias/clase05-01-login-credenciales-correctas.png)

#### 2. CE inválida: usuario no existe
Comprueba que si se ingresa un usuario inexistente, aparece un error y no se navega al inventario.

![Captura 02 - Usuario no existe](./evidencias/clase05-02-login-usuario-no-existe.png)

#### 3. CE inválida: usuario bloqueado
Verifica que una cuenta bloqueada muestre el mensaje de error apropiado y se mantenga en la pantalla de login.

![Captura 03 - Usuario bloqueado](./evidencias/clase05-03-login-usuario-bloqueado.png)

#### 4. Valor en frontera: campos vacíos
Valida el caso límite de enviar el formulario sin completar ningún campo, verificando que se muestre el mensaje de "Username is required".

![Captura 04 - Campos vacíos](./evidencias/clase05-04-campos-vacios-frontera.png)

#### 5. Verificar que el inventario tiene exactamente 6 productos
Confirma la cantidad exacta de elementos visibles en la página de productos.

![Captura 05 - Inventario con 6 productos](./evidencias/clase05-05-inventario-seis-productos.png)

#### 6. Verificar precio del primer producto con regex
Comprueba que el formato del precio sea válido, como por ejemplo `$29.99`, usando expresiones regulares.

![Captura 06 - Precio con regex](./evidencias/clase05-06-precio-primer-producto-regex.png)

#### 7. Verificar atributos y estados del inventario
Valida que el botón de cada producto esté habilitado, muestre el texto correcto y cambie a "Remove" después de hacer clic.

![Captura 07 - Atributos y estados](./evidencias/clase05-07-atributos-estados-inventario.png)

#### 8. Verificar múltiples propiedades del primer producto con soft assertions
Aplica assertions suaves para revisar que el nombre, descripción, precio, imagen y botón del primer producto estén visibles y activos sin interrumpir la ejecución.

![Captura 08 - Soft assertions](./evidencias/clase05-08-soft-assertions-primer-producto.png)

#### 9. Tabla de decisión - Regla 1: logueado con items → puede pagar
Verifica que un usuario autenticado con producto en el carrito pueda avanzar al checkout.

![Captura 09 - Regla 1](./evidencias/clase05-09-tabla-decision-regla1-checkout.png)

#### 10. Tabla de decisión - Regla 2: logueado sin items → carrito vacío
Comprueba que un usuario válido sin productos en el carrito no vea elementos en el carrito y mantenga el flujo vacío.

![Captura 10 - Regla 2](./evidencias/clase05-10-tabla-decision-regla2-carrito-vacio.png)

#### 11. Reto 1 - Ordenar catálogo por precio con `toHaveValue()`
Ejecuta la ordenación por precio de menor a mayor y valida que el menú select quedó en la opción correcta (`lohi`).

![Captura 11 - Ordenar por precio](./evidencias/clase05-11-reto-ordenar-por-precio.png)

#### 12. Reto 2 - Verificar foco del campo usuario con `toBeFocused()`
Confirma que al hacer clic en el campo de usuario, el foco realmente se coloca sobre ese input.

![Captura 12 - Foco en campo usuario](./evidencias/clase05-12-reto-campo-focus.png)

#### 13. Reto 3 - Verificar estilo del botón Add to cart con `toHaveCSS()`
Valida propiedades visuales/estilo del botón, como el cursor, asegurando que el estado visual sea el esperado.

![Captura 13 - CSS del botón](./evidencias/clase05-13-reto-boton-css-cursor.png)

### Resultado general de la clase 05

```
✓ Login con credenciales válidas
✓ Login con usuario inexistente
✓ Login con usuario bloqueado
✓ Validación de campos vacíos
✓ Inventario con 6 productos
✓ Validación de precio con regex
✓ Atributos y estados del inventario
✓ Soft assertions del primer producto
✓ Regla 1: usuario con items puede pagar
✓ Regla 2: usuario sin items tiene carrito vacío
✓ Ordenación por precio
✓ Foco sobre el campo usuario
✓ Estilo del botón Add to cart

Total: 13 pruebas ejecutadas y validadas en Sauce Demo
```

---

## clase 05 🧭 Tabla de decisión — Proceso de checkout (Sauce Demo)

- **¿Qué pasa si accedes a `checkout-step-one.html` sin sesión?** → Regla 1: no te deja completar el checkout sin haber iniciado sesión.
- **¿Qué pasa si el carrito está vacío al hacer checkout?** → Regla 2: el sitio no bloquea el acceso al formulario aunque no haya productos, es decir, no hay una validación explícita de "carrito vacío" en este paso.
- **¿El mensaje de error es igual sin importar qué campo falta?** → No es exactamente igual: el formato del mensaje es el mismo ("Error: `<Campo>` is required"), pero el nombre del campo cambia según cuál esté vacío (Reglas 3, 4 y 5).

### Condiciones

| # | Condición |
|---|-----------|
| C1 | Usuario autenticado |
| C2 | Carrito con al menos 1 item |
| C3 | Formulario de checkout completo (First Name, Last Name, Postal Code llenos) |
| C4 | Se hizo clic en "Finish" |

### Reglas

| Regla | C1 Autenticado | C2 Carrito con items | C3 Formulario completo | C4 Clic en Finish | Resultado esperado |
|-------|:---:|:---:|:---:|:---:|---|
| R1 | No | — | — | — | No permite entrar a `checkout-step-one.html`; el sistema exige iniciar sesión primero. |
| R2 | Sí | No | — | — | Sí permite avanzar a `checkout-step-one.html` aunque el carrito esté vacío (Sauce Demo no valida esto). |
| R3 | Sí | Sí | No (falta First Name) | — | Muestra error "Error: First Name is required" y no avanza. |
| R4 | Sí | Sí | No (falta Last Name) | — | Muestra error "Error: Last Name is required" y no avanza. |
| R5 | Sí | Sí | No (falta Postal Code) | — | Muestra error "Error: Postal Code is required" y no avanza. |
| R6 | Sí | Sí | Sí | Sí | Avanza a `checkout-step-two.html` y muestra el resumen del pedido. |

---

<a id="pruebas-clase-06"></a>

## ✅ Pruebas - Clase 06 28/08/2026

La clase 06 se enfocó en aplicar el patrón **Page Object Model (POM)** en Sauce Demo para mejorar la mantenibilidad y reutilización del código de automatización. Para esto se creó la carpeta `pages/` con los nuevos archivos que encapsulan la lógica de cada pantalla del flujo de login, inventario, carrito y checkout.

### Nuevos Page Objects creados

- `pages/LoginPage.ts` — manejo del login, validación de errores y navegación.
- `pages/InventoryPage.ts` — acceso al inventario, conteo de productos, ordenamiento y agregar/remover elementos.
- `pages/CartPage.ts` — validación del contenido del carrito y avance al checkout.
- `pages/CheckoutPage.ts` — completar información del cliente y confirmar la orden.
- `pages/MenuPage.ts` — abrir el menú lateral y realizar logout.

### Descripción breve de cada test

#### 1. Login exitoso con POM
Valida que el usuario `standard_user` pueda iniciar sesión correctamente y llegar al inventario usando el modelo orientado a páginas.

![Captura 01 - Login exitoso](./evidencias/clase06-login-exitoso.png)

#### 2. Login fallido con POM
Comprueba que un usuario inválido muestre el error de credenciales incorrectas y no permita avanzar.

![Captura 02 - Login fallido](./evidencias/clase06-login-fallido.png)

#### 3. Flujo completo: login → agregar 2 productos → verificar carrito
Revisa el recorrido completo desde el login hasta la validación de dos productos agregados al carrito.

![Captura 03 - Flujo completo carrito](./evidencias/clase06-flujo-completo-carrito.png)

#### 4. Verificar que el inventario tiene 6 productos
Confirma la cantidad exacta de elementos en la página de productos.

![Captura 04 - Inventario con 6 productos](./evidencias/clase06-inventario-6-productos.png)

#### 5. Ordenar productos de mayor a menor precio
Verifica la lógica de orden en el catálogo según el valor del precio.

![Captura 05 - Orden mayor a menor](./evidencias/clase06-orden-mayor-a-menor.png)

#### 6. Reto 1: Flujo de compra completo
Ejecuta todo el recorrido de compra, incluyendo checkout y confirmación final del pedido.

![Captura 06 - Compra completa](./evidencias/clase06-reto1-compra-completa.png)

#### 7. Reto 2: Logout desde el menú
Valida el cierre de sesión desde el panel del menú lateral.

![Captura 07 - Logout exitoso](./evidencias/clase06-reto2-logout-exitoso.png)

#### 8. Reto 3: Remover producto y verificar badge
Confirma que al quitar un producto del inventario, el contador del carrito desaparece correctamente.

![Captura 08 - Producto removido](./evidencias/clase06-reto3-producto-removido.png)

### Resultado general de la clase 06

```
✓ Login exitoso con POM
✓ Login fallido con POM
✓ Flujo completo: login → agregar 2 productos → verificar carrito
✓ Inventario con 6 productos
✓ Ordenar productos de mayor a menor precio
✓ Reto 1: flujo de compra completo
✓ Reto 2: logout desde el menú
✓ Reto 3: remover producto y verificar badge

Total: 8 pruebas ejecutadas y validadas con Page Object Model
```

---

<a id="pruebas-clase-07"></a>

## ✅ Pruebas - Clase 07

La clase 07 se enfocó en documentar las pruebas con evidencias visuales, estructurar los flujos con `test.step()`, adjuntar información dinámica al reporte mediante `testInfo.attach()` y realizar comparación visual con `toHaveScreenshot()`. Las pruebas se ejecutaron sobre Sauce Demo utilizando los Page Objects creados en la clase 06.

### Evidencias de las pruebas

#### 1. Login exitoso - evidencia completa
Documenta el estado de la aplicación antes de autenticarse y el inventario después de iniciar sesión con `standard_user`.

![Clase 07 - Antes del login](./evidencias/clase07/t01-antes-login.png)
![Clase 07 - Después del login](./evidencias/clase07/t01-despues-login.png)

#### 2. Flujo de compra completo
Registra el inventario inicial, el producto agregado y el carrito con un producto validado.

![Clase 07 - Inventario](./evidencias/clase07/t02-inventario.png)
![Clase 07 - Producto agregado](./evidencias/clase07/t02-producto-agregado.png)
![Clase 07 - Carrito](./evidencias/clase07/t02-carrito.png)

#### 3. Defecto esperado: usuario bloqueado
Captura únicamente el mensaje de error que aparece al intentar iniciar sesión con `locked_out_user`.

![Clase 07 - Error de usuario bloqueado](./evidencias/clase07/t03-error-usuario-bloqueado.png)

#### 4. Comparación de estados antes y después de una acción
Muestra el carrito sin productos antes de la acción y el badge con valor `1` después de agregar el primer producto.

![Clase 07 - Estado antes](./evidencias/clase07/t04-estado-antes.png)
![Clase 07 - Estado después](./evidencias/clase07/t04-estado-despues.png)

### Retos de la clase 07

#### Reto 1: Flujo estructurado con `test.step()`
Divide el flujo en navegación, login y verificación del inventario, dejando una evidencia para cada paso.

![Clase 07 - Navegación](./evidencias/clase07/r01-01-navegacion.png)
![Clase 07 - Post login](./evidencias/clase07/r01-02-post-login.png)
![Clase 07 - Inventario confirmado](./evidencias/clase07/r01-03-inventario-confirmado.png)

#### Reto 2: Datos adjuntos al reporte con `testInfo.attach()`
Captura el estado del inventario desde el cual se extraen la URL, la fecha de ejecución y la cantidad de productos renderizados. Además, adjunta el archivo `datos-capturados.txt` al reporte de Playwright.

![Clase 07 - Estado para extracción de datos](./evidencias/clase07/r02-estado-extraccion-datos.png)

#### Reto 3: Comparación visual con `toHaveScreenshot()`
Compara visualmente el contenedor de login con el baseline generado por Playwright.

![Clase 07 - Baseline visual del login](./tests/clase07.spec.ts-snapshots/login-box-baseline-chromium-darwin.png)

### Resultado general de la clase 07

```
✓ Login exitoso con evidencia antes y después
✓ Flujo completo: login, agregar producto y verificar carrito
✓ Captura del error de usuario bloqueado
✓ Comparación de estados antes y después de agregar un producto
✓ Flujo estructurado con test.step()
✓ Captura de datos y adjunto al reporte con testInfo.attach()
✓ Comparación visual del login con toHaveScreenshot()

Total: 7 pruebas documentadas en la suite de Clase 07
```

### Reporte de defecto

El reporte [DR-001.md](./reportes/DR-001.md) documenta un defecto de severidad y prioridad media: después de iniciar sesión y agregar productos, el badge del carrito muestra `1` cuando se esperaba `2`. La evidencia del fallo quedó registrada en el reporte HTML de Playwright mediante la aserción `toHaveText`.

---

<a id="pruebas-clase-08"></a>

## ✅ Pruebas - Clase 08

La clase 08 se enfocó en el uso de hooks de Playwright, ejecución paralela y serial, manejo de una página compartida, pruebas con distintos tipos de usuario y omisión condicional con `test.skip()`. La suite se encuentra en `tests/clase08.spec.ts`.

### Organización de la suite

- `test.beforeEach()` autentica al usuario estándar antes de las pruebas del inventario.
- `test.afterEach()` captura una pantalla de diagnóstico cuando una prueba falla.
- Las suites independientes se ejecutan en paralelo para reducir el tiempo total.
- La suite serial comparte una página para comprobar que la sesión y el carrito se conservan entre pasos.
- `test.slow()` permite validar el comportamiento de `performance_glitch_user` con un timeout ampliado.
- `test.skip()` omite dinámicamente la prueba indicada durante el fin de semana.

### Validaciones realizadas

1. El inventario muestra exactamente 6 productos.
2. Todos los productos tienen precio visible con formato válido.
3. Todos los productos tienen imagen visible.
4. El menú de hamburguesa muestra `All Items`, `About`, `Logout` y `Reset App State`.
5. El logout devuelve a la pantalla de login.
6. El usuario estándar puede avanzar al checkout con un producto.
7. El usuario de rendimiento degradado puede iniciar sesión y llegar al inventario.
8. La página compartida conserva la sesión y el carrito entre pruebas seriales.
9. La prueba dinámica se omite cuando corresponde al fin de semana.

### Carpeta `helpers`

La carpeta `helpers/` centraliza funciones reutilizables para evitar duplicación en las pruebas. El archivo [helpers/auth.ts](./helpers/auth.ts) contiene la función `loginAs()`, que navega a Sauce Demo, completa las credenciales y ejecuta el login para los distintos usuarios de prueba.

### Evidencia y plan SQA

La evidencia convertida a PNG se encuentra en [evidencias/clase08/IMG_4558.png](./evidencias/clase08/IMG_4558.png). El documento [documentos/sqa-plan-saucedemo.md](./documentos/sqa-plan-saucedemo.md) reúne el objetivo, alcance, estrategia, casos cubiertos y resultado esperado de la suite.

<a id="plan-sqa-minimo"></a>

## 📋 Plan SQA mínimo

El [SQA PLAN MÍNIMO](./documentos/sqa-plan-saucedemo.md) documenta la estrategia básica de calidad para Sauce Demo y complementa las pruebas automatizadas de Clase 08.

<a id="pruebas-clase-09"></a>

## ✅ Pruebas - Clase 09

La clase 09 se enfocó en **fixtures**, reutilización de datos de prueba, parametrización de pruebas y validación del login en distintos tamaños de pantalla. La suite se encuentra en [tests/clase09.spec.ts](./tests/clase09.spec.ts) y utiliza Page Objects existentes para las pantallas de login, inventario y carrito.

### Temas y pruebas realizadas

#### 1. Fixtures de aplicación
Se validó el uso de fixtures para preparar pantallas y estados de prueba:

- `inventoryPage`: iniciar sesión con `standard_user` y verificar que el inventario tenga 6 productos.
- `cartPage`: agregar un producto al carrito y confirmar que haya exactamente 1.
- `loginPage`: reutilizar el Page Object y completar el login desde el test.

#### 2. Tests parametrizados de login
Un arreglo de datos genera un caso para cada escenario, reutilizando la misma estructura de prueba:

- Usuario estándar: inicia sesión y llega al inventario.
- Usuario bloqueado: no puede iniciar sesión y se muestra el mensaje de error.
- Campos vacíos: se muestra el mensaje de error correspondiente.

#### 3. Agregar productos al carrito con parametrización
Se reutiliza el mismo flujo para agregar y verificar estos tres productos:

- Sauce Labs Backpack
- Sauce Labs Bike Light
- Sauce Labs Bolt T-Shirt

#### 4. Fixtures avanzados
- **Fixture con teardown y cronómetro:** mide la duración del test después de que termina su ejecución.
- **Fixture de alcance `worker`:** comparte un contador entre las pruebas del mismo worker y comprueba su valor.
- **Viewports parametrizados:** valida el login en móvil (375 × 667) y escritorio (1280 × 800).

### Resultado general de la clase 09

```text
✓ 3 pruebas con fixtures de login, inventario y carrito
✓ 3 escenarios parametrizados de login
✓ 3 pruebas parametrizadas para agregar productos al carrito
✓ 1 prueba de fixture con teardown y cronómetro
✓ 2 pruebas de fixture con alcance worker
✓ 2 pruebas de login responsivo: móvil y escritorio

Total: 14 pruebas aprobadas en Sauce Demo
```

Ejecución de la suite:

```bash
npx playwright test tests/clase09.spec.ts --reporter=list
```

<a id="reflexion-clase-09"></a>

### Reflexión y discusión - Clase 09

#### 1. ¿Cuántas líneas de código se ahorran al usar un loop de parametrización?

**Respuesta:** Se reduce considerablemente el código repetitivo. Como estimación, se puede ahorrar entre un 60 % y un 70 % frente a escribir un bloque de prueba independiente para cada usuario o producto. El loop reutiliza la misma lógica y permite ampliar los escenarios agregando datos al arreglo correspondiente.

#### 2. ¿Qué ocurre si se agrega un cuarto usuario a `usuariosDeLogin`?

**Respuesta:** No es necesario modificar la estructura de la prueba. Playwright genera un caso adicional al recorrer el arreglo y ejecuta las mismas validaciones con los datos del nuevo usuario.

#### 3. ¿Cómo se podrían leer los datos de prueba desde un archivo CSV externo?

**Respuesta:** Se puede leer el archivo antes de registrar las pruebas usando el módulo nativo `fs` de Node.js y una librería de análisis como `csv-parse` o `papaparse`. El flujo sería:

1. Leer el contenido del archivo CSV.
2. Convertir sus filas en un arreglo de objetos de TypeScript, como `usuariosDeLogin` o `productosAVerificar`.
3. Recorrer el arreglo para generar las pruebas parametrizadas.


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
![Pruebas](https://img.shields.io/badge/Pruebas-8%20Ejecutadas-green)
![Node](https://img.shields.io/badge/Node-v24.15.0-green)
![Playwright](https://img.shields.io/badge/Playwright-Latest-blue)

---

**Desarrollado por:** Wayner Alberto López y López  
**Carné:** 1790-14-11226  
**Instructor:** Ing. MA. Carmelo Estuardo Mayén Monterroso
