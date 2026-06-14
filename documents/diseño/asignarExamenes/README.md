# 25-26-idsw2-sdVC > asignarExamenes > Diseño

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

Detallar la interacción entre los componentes del sistema para asignar un examen generado a uno o varios alumnos, generando un hash SHA-256 único por cada asignación y almacenando la clave de corrección para su posterior uso en la corrección automática.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: asignarExamenes()](../../../images/diseño/asignarExamenes/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseño/asignarExamenes/secuencia.puml)|

</div>

## Código PlantUML

```plantuml
@startuml
title Diagrama de Secuencia - Asignar Exámenes (NestJS + Vue 3)

actor "Usuario (Docente)" as User
participant "ExamenesView" as FE
participant "ExamenesController" as Controller
participant "ExamenesService" as Service
participant "PrismaService" as Prisma
participant "Base de Datos\n(SQLite/PostgreSQL)" as DB

User -> FE: Selecciona examen y\nhace clic en "Asignar"
activate FE

FE -> Controller: POST /api/examenes/asignar\nbody: { examenId, alumnoIds: [...] }
activate Controller

Controller -> Service: asignar(asignarDto)
activate Service

Service -> Prisma: examen.findUnique({\n  where: { id: examenId },\n  include: { preguntas: { include: { pregunta: { include: { respuestas: true } } } } }\n})
activate Prisma
Prisma -> DB: SELECT Examen.*, Pregunta.*, Respuesta.*
activate DB
DB --> Prisma: examen con preguntas\ny respuestas
deactivate DB
Prisma --> Service: examen
deactivate Prisma

alt Examen no encontrado
  Service --> Controller: throw NotFoundException
  Controller --> FE: 404 Not Found
  FE --> User: Muestra "Examen no encontrado"
else Examen encontrado
  Service -> Service: ordenRespuestas = examen.preguntas\n  .map(ep => ep.pregunta.respuestas\n    .filter(r => r.esCorrecta)\n    .map(r => r.id).sort())

  loop For each alumnoId in alumnoIds
    Service -> Service: hash = crypto.createHash('sha256')\n  .update(`${examenId}-${alumnoId}-\n   ${JSON.stringify(ordenRespuestas)}-${Date.now()}`)\n  .digest('hex')

    Service -> Prisma: alumnoExamen.create({\n  data: { alumnoId, examenId, hashAsignacion: hash }\n})
    activate Prisma
    Prisma -> DB: INSERT INTO AlumnoExamen
    activate DB
    DB --> Prisma: created
    deactivate DB
    Prisma --> Service: created
    deactivate Prisma
  end loop

  Service -> Prisma: examen.update({\n  where: { id: examenId },\n  data: { estado: 'ASIGNADO', claveCorreccion: JSON.stringify(ordenRespuestas) }\n})
  activate Prisma
  Prisma -> DB: UPDATE Examen SET estado=..., claveCorreccion=...
  activate DB
  DB --> Prisma: updated
  deactivate DB
  Prisma --> Service: updated
  deactivate Prisma

  Service --> Controller: { examenId, hash: ordenRespuestas, alumnosAsignados: n }
end

deactivate Service
Controller --> FE: 201 Created\n{ resultado }
deactivate Controller

FE --> User: Muestra resultado\nde asignación
FE -> FE: Recarga listado\nde exámenes
deactivate FE

@enduml
```

## Participantes

| Componente | Responsabilidad |
|---|---|
| **ExamenesView** | Vista que permite al docente seleccionar un examen del listado, elegir los alumnos destinatarios (agrupados por grado), confirmar la asignación y mostrar el resultado. |
| **ExamenesController** | Endpoint REST `POST /api/examenes/asignar` que recibe el DTO con examenId y array de alumnoIds. |
| **ExamenesService** | Método `asignar()` que consulta el examen con preguntas y respuestas, genera el orden de respuestas correctas, itera sobre los alumnos creando un hash SHA-256 por cada uno, persistiendo la asignación y actualizando el estado del examen. |
| **PrismaService** | Capa ORM que ejecuta las consultas de búsqueda de examen, creación de asignaciones batch y actualización de estado. |
| **Base de Datos (SQLite/PostgreSQL)** | Almacena los exámenes, preguntas, respuestas y las asignaciones (AlumnoExamen) con sus hashes. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Hash SHA-256 con timestamp** | Se incluye `Date.now()` en el cálculo del hash para garantizar unicidad incluso si se asigna el mismo examen al mismo alumno en momentos diferentes. |
| **Clave de corrección como JSON** | El orden de respuestas correctas se serializa como JSON y se almacena en el campo `claveCorreccion` del examen para su uso durante la corrección. |
| **Creación de asignaciones en loop** | Se itera sobre cada alumno creando su registro `AlumnoExamen` individualmente para poder generar un hash único por asignación. |
| **Actualización de estado al final** | El estado del examen se actualiza a `ASIGNADO` después de crear todas las asignaciones, garantizando consistencia. |
| **Validación de examen existente** | Se consulta el examen con todas sus preguntas y respuestas antes de cualquier operación, lanzando `NotFoundException` si no existe. |
| **DTO con validación de tipos** | `AsignarExamenesDto` usa pipes de NestJS para validar que examenId sea número y alumnoIds sea array de números. |
| **Respuesta con conteo** | El servicio retorna `{ examenId, hash, alumnosAsignados }` permitiendo al frontend mostrar cuántos alumnos recibieron el examen. |
| **Seguridad por capas** | `JwtAuthGuard` + `RolesGuard` protegen el endpoint. Solo usuarios con rol `DOCENTE` o `ADMIN` pueden asignar exámenes. |
