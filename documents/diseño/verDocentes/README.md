# 25-26-idsw2-sdVC > verDocentes > Diseño

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

Visualizar el listado de docentes (profesores) excluyendo contraseñas. Solo acceso Administrador institucional.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: verDocentes()](../../../images/diseño/verDocentes/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseño/verDocentes/secuencia.puml)|

</div>

## Código PlantUML

```plantuml
@startuml
title Diagrama de Secuencia - Ver Docentes (NestJS + Vue 3)

actor "Usuario (Admin)" as User
participant "ProfesoresView" as FE
participant "ProfesoresController" as Controller
participant "ProfesoresService" as Service
participant "PrismaService" as Prisma
participant "Base de Datos\n(SQLite/PostgreSQL)" as DB

User -> FE: Navega a "Docentes"
activate FE

FE -> Controller: GET /api/profesores
activate Controller

Controller -> Service: findAll()
activate Service

Service -> Prisma: profesor.findMany({\n  omit: { password: true }\n})
activate Prisma
Prisma -> DB: SELECT id, nombre, email,\nrol FROM Profesor
activate DB
DB --> Prisma: profesores (sin password)
deactivate DB
Prisma --> Service: array de profesores
deactivate Prisma

Service --> Controller: profesores[]
deactivate Service
Controller --> FE: 200 OK\n{ profesores: [...] }
deactivate Controller

FE --> User: Muestra tabla con\ndocentes
deactivate FE

@enduml
```

## Participantes

| Componente | Responsabilidad |
|---|---|
| **ProfesoresView** | Vista para Administrador institucional. |
| **ProfesoresController** | Endpoint `GET /api/profesores`. |
| **ProfesoresService** | `findAll()` con `omit: { password: true }`. |
| **PrismaService** | Capa ORM. |
| **Base de Datos** | Almacena profesores. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Omit password** | `omit: { password: true }` excluye passwords de la respuesta por seguridad. |
| **Solo ADMIN** | RolesGuard permite solo Administrador institucional. |
| **Sin include** | No se requieren relaciones en el listado. |
| **Sin paginación** | Pocos registros. |
| **Caso de solo lectura** | Solo GET. |
