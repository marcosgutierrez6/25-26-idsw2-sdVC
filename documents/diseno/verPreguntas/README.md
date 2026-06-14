# 25-26-idsw2-sdVC > verPreguntas > Diseño

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

Detallar la interacción entre los componentes del sistema para visualizar el listado de preguntas con filtros opcionales por tema, dificultad y batería. Caso de solo lectura sin persistencia.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: verPreguntas()](../../../images/diseno/verPreguntas/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseno/verPreguntas/secuencia.puml)|

</div>

## Código PlantUML

```plantuml
@startuml
title Diagrama de Secuencia - Ver Preguntas (NestJS + Vue 3)

actor "Usuario (Docente)" as User
participant "PreguntasView" as FE
participant "PreguntasController" as Controller
participant "PreguntasService" as Service
participant "PrismaService" as Prisma
participant "Base de Datos\n(SQLite/PostgreSQL)" as DB

User -> FE: Navega a "Preguntas"
activate FE

FE -> Controller: GET /api/preguntas\n(query: tema?, dificultad?, bateriaId?)
activate Controller

Controller -> Service: findAll(filters?)
activate Service

Service -> Prisma: pregunta.findMany({\n  where: { tema?, dificultad?, bateriaId? },\n  include: {\n    respuestas: true,\n    bateria: { include: { asignatura: true } }\n  }\n})
activate Prisma
Prisma -> DB: SELECT Pregunta.* LEFT JOIN\nRespuesta LEFT JOIN Bateria\nLEFT JOIN Asignatura [WHERE ...]
activate DB
DB --> Prisma: preguntas con relaciones
deactivate DB
Prisma --> Service: array de preguntas
deactivate Prisma

Service --> Controller: preguntas[]
deactivate Service
Controller --> FE: 200 OK\n{ preguntas: [...] }
deactivate Controller

FE --> User: Muestra tabla con\npreguntas y filtros

User -> FE: Aplica filtro (tema,\ndificultad, batería)
FE -> Controller: GET /api/preguntas\n(query con filtros)
activate Controller
Controller -> Service: findAll(filters)
activate Service
Service -> Prisma: pregunta.findMany({ where..., include... })
activate Prisma
Prisma -> DB: SELECT con filtros
activate DB
DB --> Prisma: preguntas filtradas
deactivate DB
Prisma --> Service: preguntas filtradas
deactivate Prisma
Service --> Controller: preguntas[]
deactivate Service
Controller --> FE: 200 OK\n{ preguntas: [...] }
deactivate Controller
FE --> User: Muestra preguntas\nfiltradas
deactivate FE

@enduml
```

## Participantes

| Componente | Responsabilidad |
|---|---|
| **PreguntasView** | Vista que muestra tabla de preguntas con filtros por tema, dificultad y batería. |
| **PreguntasController** | Endpoint `GET /api/preguntas` con query params opcionales. |
| **PreguntasService** | Método `findAll()` que aplica filtros opcionales e incluye relaciones. |
| **PrismaService** | Capa ORM que ejecuta consultas con LEFT JOINs y WHERE condicional. |
| **Base de Datos (SQLite/PostgreSQL)** | Almacena preguntas, respuestas, baterías y asignaturas. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Filtros opcionales via query params** | Los filtros (tema, dificultad, bateriaId) son opcionales y se pasan como query string. |
| **Include anidado** | Se incluyen `respuestas` y `bateria { asignatura }` en una sola consulta evitando N+1. |
| **Sin paginación** | La implementación actual no pagina; se asume volumen manejable. Se añadiría si fuera necesario. |
| **Auto-loop de filtrado** | El usuario puede aplicar filtros múltiples veces sin recargar la página (SPA). |
| **Sin persistencia** | Caso de solo lectura — no hay POST, PATCH ni DELETE. |
| **Seguridad por capas** | Solo `DOCENTE` o `ADMIN` pueden ver preguntas. |
| **Respuesta completa** | Cada pregunta incluye sus respuestas y batería con asignatura. |
| **DataTable de PrimeVue** | La vista usa PrimeVue DataTable con filtros en frontend y backend. |
