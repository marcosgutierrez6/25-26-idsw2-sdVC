# 25-26-idsw2-sdVC > editarPregunta > Diseño

## Información del artefacto

| Campo | Valor |
|-------|-------|
| **Proyecto** | Sistema de Gestión de Exámenes Universitarios |
| **Fase RUP** | Elaboración |
| **Disciplina** | Diseño |
| **Versión** | 1.0 (NestJS + Vue 3) |
| **Fecha** | 2026-06-09 |
| **Autor** | Marcos Gutierrez |

## Propósito

Detallar la interacción entre los componentes del sistema para editar una pregunta existente (modificar enunciado, tema, dificultad, estado) o eliminarla, con verificación de existencia antes de cualquier operación y validación de campos en frontend.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: editarPregunta()](../../../images/diseño/editarPregunta/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseño/editarPregunta/secuencia.puml)|

</div>

## Código PlantUML

```plantuml
@startuml
title Diagrama de Secuencia - Editar Pregunta (NestJS + Vue 3)

actor "Usuario (Docente)" as User
participant "PreguntasView\n(Listado)" as List
participant "PreguntasForm\n(Modal)" as Form
participant "PreguntasController" as Controller
participant "PreguntasService" as Service
participant "PrismaService" as Prisma
participant "Base de Datos\n(SQLite/PostgreSQL)" as DB

== Carga de datos ==

User -> List: Hace clic en "Editar"\ndesde el listado
activate List

List -> Form: Abre modal de\nedición
activate Form

Form -> Controller: GET /api/preguntas/:id
activate Controller

Controller -> Service: findOne(id)
activate Service

Service -> Prisma: pregunta.findUnique({\n  where: { id },\n  include: { respuestas,\n    bateria: { include: { asignatura: true } } }\n})
activate Prisma
Prisma -> DB: SELECT Pregunta\n+ respuestas + batería
activate DB

alt Pregunta no encontrada
  DB --> Prisma: Empty result
  deactivate DB
  Prisma --> Service: null
  deactivate Prisma
  Service --> Controller: lanza NotFoundException
  deactivate Service
  Controller --> Form: 404 Not Found
  Form --> User: Muestra "Pregunta\nno encontrada"
  deactivate Form
else Carga exitosa
  DB --> Prisma: pregunta con\nrelaciones
  deactivate DB
  Prisma --> Service: pregunta
  deactivate Prisma
  Service --> Controller: pregunta
  deactivate Service
  Controller --> Form: 200 OK\n{ pregunta }
  deactivate Controller
  Form --> User: Muestra formulario\ncon datos precargados:\nenunciado, tema, dificultad,\nestado (toggle hab/deshab)
end

== Modificación o eliminación ==

alt Guardar cambios
  User -> Form: Modifica campos\ny pulsa "Guardar cambios"
  Form -> Form: Validación visual\nde campos obligatorios

  Form -> Controller: PATCH /api/preguntas/:id\nbody: { enunciado, tema,\ndificultad, estado }
  activate Controller
  Controller -> Service: update(id, updatePreguntaDto)
  activate Service

  Service -> Prisma: pregunta.findUnique({\n  where: { id } })
  activate Prisma
  Prisma -> DB: SELECT Pregunta\nWHERE id = :id
  activate DB
  DB --> Prisma: pregunta existente
  deactivate DB
  Prisma --> Service: pregunta
  deactivate Prisma

  Service -> Prisma: pregunta.update({\n  where: { id },\n  data: updatePreguntaDto })
  activate Prisma
  Prisma -> DB: UPDATE Pregunta\nSET enunciado, tema,\ndificultad, estado
  activate DB
  DB --> Prisma: pregunta actualizada
  deactivate DB
  Prisma --> Service: pregunta
  deactivate Prisma

  Service --> Controller: pregunta actualizada
  deactivate Service
  Controller --> Form: 200 OK\n{ pregunta }
  deactivate Controller
  Form --> User: Muestra confirmación

else Eliminar pregunta
  User -> Form: Pulsa "Eliminar"\ny confirma
  Form -> Controller: DELETE /api/preguntas/:id
  activate Controller
  Controller -> Service: remove(id)
  activate Service

  Service -> Prisma: pregunta.findUnique({\n  where: { id } })
  activate Prisma
  Prisma -> DB: SELECT Pregunta\nWHERE id = :id
  activate DB
  DB --> Prisma: pregunta existente
  deactivate DB
  Prisma --> Service: pregunta
  deactivate Prisma

  Service -> Prisma: pregunta.delete({\n  where: { id } })
  activate Prisma
  Prisma -> DB: DELETE FROM Pregunta\nWHERE id = :id
  activate DB
  DB --> Prisma: pregunta eliminada
  deactivate DB
  Prisma --> Service: pregunta
  deactivate Prisma

  Service --> Controller: pregunta\n(eliminada)
  deactivate Service
  Controller --> Form: 200 OK\n{ pregunta }
  deactivate Controller
  Form --> User: Muestra confirmación
end

deactivate Form
deactivate List

@enduml
```

## Participantes

| Componente | Responsabilidad |
|---|---|
| **PreguntasView** | Vista que muestra el listado de preguntas. El usuario hace clic en "Editar" para abrir el modal de edición. |
| **PreguntasForm** | Modal de edición con datos precargados (enunciado, tema, dificultad, estado), permite modificar campos, guardar cambios, cancelar o eliminar la pregunta. Validación visual antes de enviar. |
| **PreguntasController** | Endpoints REST `GET /api/preguntas/:id` (carga de datos), `PATCH /api/preguntas/:id` (actualización) y `DELETE /api/preguntas/:id` (eliminación). Guards `JwtAuthGuard` + `RolesGuard` protegen los endpoints. |
| **PreguntasService** | Métodos `findOne()` (busca con include de respuestas y batería), `update()` (verifica existencia vía `findOne()` y luego persiste con Prisma) y `remove()` (verifica existencia vía `findOne()` y luego elimina). |
| **PrismaService** | Capa ORM que ejecuta `pregunta.findUnique()`, `pregunta.update()` y `pregunta.delete()` sobre el modelo Pregunta. |
| **Base de Datos (SQLite/PostgreSQL)** | Almacena y recupera los datos de la pregunta, sus respuestas y la batería asociada con su asignatura. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Carga previa de datos antes de editar** | El frontend solicita `GET /preguntas/:id` al abrir la edición para precargar todos los campos del formulario, incluyendo respuestas y asignatura. Esto permite al docente ver el estado actual completo antes de modificar. |
| **Verificación de existencia en update() y remove()** | Ambos métodos del servicio llaman a `findOne(id)` antes de operar. Si la pregunta fue eliminada entre la carga y la acción, se lanza `NotFoundException` (404). Esto evita errores crípticos de Prisma. |
| **Validación visual en frontend** | El frontend valida campos obligatorios antes de enviar el PATCH, evitando peticiones innecesarias al servidor. |
| **DTO con validación de NestJS** | `UpdatePreguntaDto` usa `class-validator` para validar tipos y valores opcionales (permite PATCH parcial, solo actualizando los campos enviados). |
| **Eliminación con confirmación** | Antes de enviar el DELETE, el frontend solicita confirmación al docente. Esto evita eliminaciones accidentales. |
| **Seguridad por capas** | `JwtAuthGuard` + `RolesGuard` protegen los tres endpoints. Solo `DOCENTE` o `ADMIN` pueden editar o eliminar preguntas. |
| **Respuestas incluidas en carga** | `findOne()` incluye `respuestas` y `bateria.asignatura` mediante Prisma `include`. Esto permite mostrar las respuestas existentes y la asignatura en el formulario de edición sin consultas adicionales. |
| **Sin transaccionalidad explícita** | Tanto `update()` como `remove()` son operaciones atómicas sobre una sola tabla que no requieren transacción. La verificación de existencia previa es suficiente para garantizar consistencia. |
