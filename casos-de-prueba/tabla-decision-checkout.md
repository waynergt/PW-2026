# Tabla de decisión — Proceso de checkout (Sauce Demo)

- **¿Qué pasa si accedes a `checkout-step-one.html` sin sesión?** → Regla 1: no te deja completar el checkout sin haber iniciado sesión.
- **¿Qué pasa si el carrito está vacío al hacer checkout?** → Regla 2: el sitio no bloquea el acceso al formulario aunque no haya productos, es decir, no hay una validación explícita de "carrito vacío" en este paso.
- **¿El mensaje de error es igual sin importar qué campo falta?** → No es exactamente igual: el formato del mensaje es el mismo ("Error: `<Campo>` is required"), pero el nombre del campo cambia según cuál esté vacío (Reglas 3, 4 y 5).

## Condiciones

| # | Condición |
|---|-----------|
| C1 | Usuario autenticado |
| C2 | Carrito con al menos 1 item |
| C3 | Formulario de checkout completo (First Name, Last Name, Postal Code llenos) |
| C4 | Se hizo clic en "Finish" |

## Reglas

| Regla | C1 Autenticado | C2 Carrito con items | C3 Formulario completo | C4 Clic en Finish | Resultado esperado |
|-------|:---:|:---:|:---:|:---:|---|
| R1 | No | — | — | — | No permite entrar a `checkout-step-one.html`; el sistema exige iniciar sesión primero. |
| R2 | Sí | No | — | — | Sí permite avanzar a `checkout-step-one.html` aunque el carrito esté vacío (Sauce Demo no valida esto). |
| R3 | Sí | Sí | No (falta First Name) | — | Muestra error "Error: First Name is required" y no avanza. |
| R4 | Sí | Sí | No (falta Last Name) | — | Muestra error "Error: Last Name is required" y no avanza. |
| R5 | Sí | Sí | No (falta Postal Code) | — | Muestra error "Error: Postal Code is required" y no avanza. |
| R6 | Sí | Sí | Sí | Sí | Avanza a `checkout-step-two.html` y muestra el resumen del pedido. |



