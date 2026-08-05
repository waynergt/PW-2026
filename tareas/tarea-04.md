# Reflexión — Clase 04
 
De los 7 principios que vimos, el que más me llamó la atención fue el **Principio 2: las pruebas exhaustivas son imposibles**.
 
Al principio uno piensa que "probar bien" significa probar todo, todas las combinaciones posibles. Pero haciendo el laboratorio de esta semana me di cuenta de que eso simplemente no se puede. Por ejemplo, en el test de "login con credenciales incorrectas" no probé todas las contraseñas incorrectas que existen (eso sería infinito), solo probé un caso que representa bien el error: un usuario que no existe con una contraseña cualquiera. Y con ese solo caso ya pude confirmar que el sistema se comporta como debería.
 
Creo que este principio es importante porque me ayuda a pensar diferente a la hora de hacer pruebas: no se trata de intentar cubrir el 100% de los casos posibles, sino de elegir bien cuáles casos probar, priorizando los que tienen más riesgo o los que son más representativos. Eso también se conecta con lo que vimos del Principio 1 (las pruebas muestran defectos, no su ausencia): aunque mis 4 tests pasen, eso no significa que DemoBlaze esté libre de errores, solo significa que en esos casos específicos que probé, todo funcionó bien.
 
Aplicándolo a mi día a día, esto me sirve para entender que como futuro profesional en QA mi trabajo no es "probar todo" (porque es imposible), sino usar el criterio para decidir qué probar primero y con qué prioridad, dependiendo del riesgo que tenga cada parte del sistema.