# 25-26-idsw2-sdVC > verAlumnos > Diseño

## Información del artefacto

| Campo | Valor |
|-------|-------|
| **Proyecto** | Sistema de Gestión de Exámenes Universitarios |
| **Fase RUP** | Elaboración |
| **Disciplina** | Diseño |
| **Versión** | 1.0 (NestJS + Vue 3) |
| **Fecha** | 2026-06-09 |
| **Autor** | Equipo de desarrollo |

## Propósito

Visualizar el listado de alumnos con su grado asociado. Caso de solo lectura.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: verAlumnos()](../../../images/diseno/verAlumnos/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseno/verAlumnos/secuencia.puml)|

</div>

## Código PlantUML

```plantuml
@startuml
title Diagrama de Secuencia - Ver Alumnos (NestJS + Vue 3)

actor "Usuario (Docente)" as User
participant "AlumnosView" as FE
participant "AlumnosController" as Controller
participant "AlumnosService" as Service
participant "PrismaService" as Prisma
participant "Base de Datos\n(SQLite/PostgreSQL)" as DB

User -> FE: Navega a "Alumnos"
activate FE

FE -> Controller: GET /api/alumnos
activate Controller

Controller -> Service: findAll()
activate Service

Service -> Prisma: alumno.findMany({\n  include: { grado: true }\n})
activate Prisma
Prisma -> DB: SELECT Alumno.* LEFT JOIN Grado
activate DB
DB --> Prisma: alumnos con grado
deactivate DB
Prisma --> Service: array de alumnos
deactivate Prisma

Service --> Controller: alumnos[]
deactivate Service
Controller --> FE: 200 OK\n{ alumnos: [...] }
deactivate Controller

FE --> User: Muestra tabla con\nalumnos y su grado
deactivate FE

@enduml
```

## Participantes

| Componente | Responsabilidad |
|---|---|
| **AlumnosView** | Vista que muestra tabla de alumnos con su grado. |
| **AlumnosController** | Endpoint `GET /api/alumnos`. |
| **AlumnosService** | Método `findAll()` con include de grado. |
| **PrismaService** | Capa ORM. |
| **Base de Datos** | Almacena alumnos y grados. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Include de grado** | Cada alumno incluye su grado asociado en una sola consulta. |
| **Sin filtros ni paginación** | Se muestran todos los alumnos. |
| **Caso de solo lectura** | Solo GET. |
| **Seguridad por capas** | Solo `DOCENTE` o `ADMIN`. |
| **Consulta eficiente** | Un solo `findMany` con JOIN. |
