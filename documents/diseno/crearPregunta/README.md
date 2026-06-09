# 25-26-idsw2-sdVC > crearPregunta > Diseño

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

Detallar la interacción entre los componentes del sistema para crear una nueva pregunta en el banco de preguntas, con validación de campos obligatorios y verificación de la batería de preguntas asociada.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: crearPregunta()](../../../images/diseno/crearPregunta/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseno/crearPregunta/secuencia.puml)|

</div>

## Código PlantUML

```plantuml
@startuml
title Diagrama de Secuencia - Crear Pregunta (NestJS + Vue 3)

actor "Usuario (Docente)" as User
participant "PreguntasView" as FE
participant "PreguntasController" as Controller
participant "PreguntasService" as Service
participant "PrismaService" as Prisma
participant "Base de Datos\n(SQLite/PostgreSQL)" as DB

User -> FE: Hace clic en "Nueva\nPregunta"
activate FE

FE --> User: Muestra diálogo con\ncampos: enunciado, tema,\ndificultad, batería

User -> FE: Rellena campos\ny pulsa "Crear"
FE -> FE: Validación visual\nde campos obligatorios

FE -> Controller: POST /api/preguntas\nbody: { enunciado, tema, dificultad, bateriaId }
activate Controller

Controller -> Service: create(createPreguntaDto)
activate Service

Service -> Prisma: pregunta.create({\n  data: { enunciado, tema, dificultad, bateriaId }\n})
activate Prisma
Prisma -> DB: INSERT INTO Pregunta\n(enunciado, tema, dificultad, bateriaId)
activate DB

alt FK inválido (bateriaId no existe)
  DB --> Prisma: Error FK constraint
  deactivate DB
  Prisma --> Service: lanza error
  deactivate Prisma
  Service --> Controller: lanza excepción
  Controller --> FE: 400/500 Error
  FE --> User: Muestra "Batería\nno encontrada"
else Creación exitosa
  DB --> Prisma: pregunta creada (id, estado: EN_CONSTRUCCION)
  deactivate DB
  Prisma --> Service: pregunta
  deactivate Prisma

  Service --> Controller: pregunta
  deactivate Service
  Controller --> FE: 201 Created\n{ pregunta }
  deactivate Controller
  FE --> User: Muestra pregunta\ncreada y navega a\neditarPregunta()
end

deactivate FE

@enduml
```

## Participantes

| Componente | Responsabilidad |
|---|---|
| **PreguntasView** | Vista que muestra el diálogo de creación con campos obligatorios (enunciado, tema, dificultad, batería) y valida visualmente antes de enviar. |
| **PreguntasController** | Endpoint REST `POST /api/preguntas` que recibe el DTO y delega en el servicio. Guard `JwtAuthGuard` + `RolesGuard` protegen el endpoint. |
| **PreguntasService** | Método `create()` que persiste la pregunta mediante Prisma. Sin validación explícita de batería — el FK constraint de la BD rechaza batería inválida. |
| **PrismaService** | Capa ORM que ejecuta `pregunta.create()` con los datos del DTO. |
| **Base de Datos (SQLite/PostgreSQL)** | Almacena la pregunta con estado `EN_CONSTRUCCION` por defecto. Valida la FK `bateriaId` a nivel de BD. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Validación visual en frontend** | El frontend valida campos obligatorios antes de enviar, evitando peticiones innecesarias. |
| **Creación sin validación explícita de batería** | La implementación actual de `PreguntasService.create()` no verifica la existencia de la batería antes de persistir. Prisma lanza error FK si `bateriaId` no existe, manejado por el error handler global. |
| **DTO con validación de NestJS** | `CreatePreguntaDto` usa `class-validator` para validar tipos y obligatoriedad de campos. |
| **Estado EN_CONSTRUCCION por defecto** | La pregunta se crea en estado `EN_CONSTRUCCION` según el schema de Prisma (default), permitiendo editarla antes de habilitarla. |
| **Transición automática a editarPregunta** | Tras crear, la vista navega a `PREGUNTA_ABIERTO` para que el docente añada respuestas inmediatamente. |
| **Manejo de error FK** | Si `bateriaId` es inválido, Prisma lanza `PrismaClientKnownRequestError` (P2003) que NestJS convierte en excepción HTTP. |
| **Seguridad por capas** | `JwtAuthGuard` + `RolesGuard` protegen el endpoint. Solo `DOCENTE` o `ADMIN` pueden crear preguntas. |
| **Sin transaccionalidad explícita** | La creación es una operación atómica simple (una sola tabla) que no requiere transacción. |
