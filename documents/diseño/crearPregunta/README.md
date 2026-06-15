# 25-26-idsw2-sdVC > crearPregunta > Diseño

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

Detallar la interacción entre los componentes del sistema para crear una nueva pregunta en el banco de preguntas, con validación de campos obligatorios y verificación de la batería de preguntas asociada.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: crearPregunta()](../../../images/diseño/crearPregunta/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseño/crearPregunta/secuencia.puml)|

</div>

## Código PlantUML

```plantuml
@startuml
title Diagrama de Secuencia - Crear Pregunta (NestJS + Vue 3)

actor "Usuario (Docente)" as User
participant "PreguntasView\n(Listado)" as List
participant "PreguntasForm\n(Formulario con tabs)" as Form
participant "PreguntasController" as Controller
participant "PreguntasService" as Service
participant "PrismaService" as Prisma
participant "Base de Datos\n(SQLite/PostgreSQL)" as DB

note over Form : Modo creación: [Datos] (activo)\n[Respuestas] (desactivado)

User -> List: Hace clic en "Nueva\nPregunta"
activate List

List -> Form: Navega a formulario\nde creación
deactivate List
activate Form
Form --> User: Muestra formulario\ncon campos: enunciado, tema,\ndificultad, batería

User -> Form: Rellena campos\ny pulsa "Crear"
Form -> Form: Validación visual\nde campos obligatorios

Form -> Controller: POST /api/preguntas\nbody: { enunciado, tema, dificultad, bateriaId }
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
  Controller --> Form: 400/500 Error
  Form --> User: Muestra "Batería\nno encontrada"
else Creación exitosa
  DB --> Prisma: pregunta creada (id, estado: EN_CONSTRUCCION)
  deactivate DB
  Prisma --> Service: pregunta
  deactivate Prisma

  Service --> Controller: pregunta
  deactivate Service
  Controller --> Form: 201 Created\n{ pregunta }
  deactivate Controller

  Form --> Form: Activa tabs y\ncambia a modo edición
  note over Form : Modo edición: [Datos] [Respuestas]\n(todos activos)
  Form --> User: Muestra pregunta creada\ncon tabs ahora activos
end

@enduml
```

## Participantes

| Componente | Responsabilidad |
|---|---|
| **PreguntasView (Listado)** | Vista que muestra el listado de preguntas. El usuario hace clic en "Nueva Pregunta" para navegar al formulario de creación. |
| **PreguntasForm (Formulario con tabs)** | Formulario con tabs: [Datos] (activo), [Respuestas] (desactivado). En modo creación solo el tab de Datos está disponible. Tras crear, cambia a modo edición con todos los tabs activos. |
| **PreguntasController** | Endpoint REST `POST /api/preguntas` que recibe el DTO y delega en el servicio. Guard `JwtAuthGuard` + `RolesGuard` protegen el endpoint. |
| **PreguntasService** | Método `create()` que persiste la pregunta mediante Prisma. Sin validación explícita de batería — el FK constraint de la BD rechaza batería inválida. |
| **PrismaService** | Capa ORM que ejecuta `pregunta.create()` con los datos del DTO. |

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
