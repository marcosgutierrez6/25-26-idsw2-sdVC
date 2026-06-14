# 25-26-idsw2-sdVC > eliminarPregunta > Diseño

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

Detallar la interacción para eliminar una pregunta con confirmación previa, verificación de existencia y manejo de error 404.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: eliminarPregunta()](../../../images/diseño/eliminarPregunta/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseño/eliminarPregunta/secuencia.puml)|

</div>

## Código PlantUML

```plantuml
@startuml
title Diagrama de Secuencia - Eliminar Pregunta (NestJS + Vue 3)

actor "Usuario (Docente)" as User
participant "PreguntasView" as FE
participant "PreguntasController" as Controller
participant "PreguntasService" as Service
participant "PrismaService" as Prisma
participant "Base de Datos\n(SQLite/PostgreSQL)" as DB

User -> FE: Hace clic en "Eliminar"\nsobre una pregunta
activate FE

FE --> User: Muestra diálogo de\nconfirmación

User -> FE: Confirma eliminación
FE -> Controller: DELETE /api/preguntas/:id
activate Controller

Controller -> Service: remove(id)
activate Service

Service -> Prisma: pregunta.findUnique({ where: { id } })
activate Prisma
Prisma -> DB: SELECT Pregunta WHERE id=?
activate DB
DB --> Prisma: pregunta | null
deactivate DB
Prisma --> Service: pregunta
deactivate Prisma

alt Pregunta no encontrada
  Service --> Controller: throw NotFoundException
  Controller --> FE: 404 Not Found
  FE --> User: Muestra "Pregunta\nno encontrada"
else Pregunta existe
  Service -> Prisma: pregunta.delete({ where: { id } })
  activate Prisma
  Prisma -> DB: DELETE FROM Pregunta WHERE id=?
  activate DB
  DB --> Prisma: pregunta eliminada
  deactivate DB
  Prisma --> Service: pregunta eliminada
  deactivate Prisma

  Service --> Controller: pregunta eliminada
  deactivate Service
  Controller --> FE: 200 OK\n{ pregunta }
  deactivate Controller
  FE --> User: Muestra éxito y\nrecarga listado
end

deactivate FE

@enduml
```

## Participantes

| Componente | Responsabilidad |
|---|---|
| **PreguntasView** | Diálogo de confirmación antes de eliminar. |
| **PreguntasController** | DELETE /api/preguntas/:id. |
| **PreguntasService** | remove() con findOne previo. |
| **PrismaService** | Capa ORM. |
| **Base de Datos** | Almacena preguntas. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Confirmación en frontend** | Se muestra diálogo de confirmación antes de enviar DELETE. |
| **Verificación de existencia** | `remove()` llama a `findOne()` para lanzar 404 si no existe. |
| **Eliminación en cascada** | Prisma elimina respuestas asociadas por la relación (ON CASCADE). |
| **Recarga de listado** | Tras eliminar, se recarga el listado de preguntas. |
| **Seguridad por capas** | Solo `DOCENTE` o `ADMIN`. |
