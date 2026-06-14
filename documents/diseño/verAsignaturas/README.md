# 25-26-idsw2-sdVC > verAsignaturas > Diseño

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

Detallar la interacción entre los componentes del sistema para visualizar el listado de asignaturas con sus relaciones (grado, profesor). Caso de solo lectura.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: verAsignaturas()](../../../images/diseño/verAsignaturas/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseño/verAsignaturas/secuencia.puml)|

</div>

## Código PlantUML

```plantuml
@startuml
title Diagrama de Secuencia - Ver Asignaturas (NestJS + Vue 3)

actor "Usuario (Docente)" as User
participant "AsignaturasView" as FE
participant "AsignaturasController" as Controller
participant "AsignaturasService" as Service
participant "PrismaService" as Prisma
participant "Base de Datos\n(SQLite/PostgreSQL)" as DB

User -> FE: Navega a "Asignaturas"
activate FE

FE -> Controller: GET /api/asignaturas
activate Controller

Controller -> Service: findAll()
activate Service

Service -> Prisma: asignatura.findMany({\n  include: { grado: true, profesor: true }\n})
activate Prisma
Prisma -> DB: SELECT Asignatura.* LEFT JOIN\nGrado LEFT JOIN Profesor
activate DB
DB --> Prisma: asignaturas con relaciones
deactivate DB
Prisma --> Service: array de asignaturas
deactivate Prisma

Service --> Controller: asignaturas[]
deactivate Service
Controller --> FE: 200 OK\n{ asignaturas: [...] }
deactivate Controller

FE --> User: Muestra tabla con\nasignaturas y relaciones
deactivate FE

@enduml
```

## Participantes

| Componente | Responsabilidad |
|---|---|
| **AsignaturasView** | Vista que muestra tabla de asignaturas con datos de grado y profesor. |
| **AsignaturasController** | Endpoint `GET /api/asignaturas`. |
| **AsignaturasService** | Método `findAll()` con include de grado y profesor. |
| **PrismaService** | Capa ORM que ejecuta consulta con LEFT JOINs. |
| **Base de Datos (SQLite/PostgreSQL)** | Almacena asignaturas con relaciones. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Include de grado y profesor** | `findAll()` incluye relaciones para mostrar nombre del grado y profesor en la tabla. |
| **Sin filtros** | La implementación actual no aplica filtros; se muestran todas las asignaturas. |
| **Sin paginación** | Se asume volumen manejable de asignaturas. |
| **Caso de solo lectura** | GET únicamente — sin persistencia. |
| **Seguridad por capas** | Solo `DOCENTE` o `ADMIN` pueden ver asignaturas. |
| **DataTable de PrimeVue** | La vista usa PrimeVue DataTable con ordenación y búsqueda en frontend. |
| **Respuesta completa** | Cada asignatura incluye grado y profesor asociados. |
| **Consulta eficiente** | Un solo `findMany` con include evita N+1 queries. |
