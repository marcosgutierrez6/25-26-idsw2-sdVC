# 25-26-idsw2-sdVC > corregirExamenes > Diseño

## Información del artefacto

| Campo | Valor |
|-------|-------|
| **Proyecto** | Sistema de Gestión de Exámenes Universitarios |
| **Fase RUP** | Elaboración |
| **Disciplina** | Diseño |
| **Versión** | 1.0 (NestJS + Vue 3) |
| **Fecha** | 2026-06-03 |
| **Autor** | Equipo de desarrollo |

## Propósito

Detallar la interacción entre los componentes del sistema (Frontend Vue 3, ExamenesController, ExamenesService, PrismaService) para corregir las respuestas de un alumno en un examen, calcular la nota y actualizar el estado del examen.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: corregirExamenes()](../../../images/diseno/corregirExamenes/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseno/corregirExamenes/secuencia.puml)|

</div>

## Código PlantUML

```plantuml
@startuml
title Diagrama de Secuencia - Corregir Exámenes (NestJS + Vue 3)

actor "Usuario (Docente/Admin)" as User
participant "Frontend (Vue 3)\nExamenesView" as FE
participant "ExamenesController" as Controller
participant "ExamenesService" as Service
participant "PrismaService" as Prisma
participant "Base de Datos\n(SQLite/PostgreSQL)" as DB

User -> FE: Selecciona examen y\nhace clic en "Corregir"
activate FE
FE -> FE: Muestra formulario\ncon preguntas del examen
FE --> User: Capturar respuestas\ndel alumno

User -> FE: Ingresa respuestas\ny confirma corrección
FE -> Controller: POST /examenes/{examenId}/corregir/{alumnoId}\nbody: { respuestas }
activate Controller
Controller -> Service: corregir(examenId, alumnoId, respuestas)
activate Service
Service -> Prisma: alumnoExamen.findUnique({ where: { alumnoId_examenId } })
activate Prisma
Prisma -> DB: SELECT * FROM AlumnoExamen\nWHERE alumnoId=? AND examenId=?
activate DB
DB --> Prisma: AlumnoExamen | null
deactivate DB
Prisma --> Service: ae
deactivate Prisma

alt Asignación no encontrada
  Service --> Controller: lanza NotFoundException
  Controller --> FE: 404 Not Found
  FE --> User: Muestra "Asignación no encontrada"
else Asignación encontrada
  Service -> Prisma: examen.findUnique({ where: { id: examenId }, include: { preguntas: { include: { pregunta: { include: { respuestas: true } } } } } })
  activate Prisma
  Prisma -> DB: SELECT FROM Examen\nJOIN ExamenPregunta\nJOIN Pregunta\nJOIN Respuesta
  activate DB
  DB --> Prisma: examen con preguntas y respuestas
  deactivate DB
  Prisma --> Service: examen
  deactivate Prisma

  Service -> Service: Cruza respuestas del alumno\nvs respuestas correctas\nCalcula nota = (aciertos/total)*10\nGenera detalle por pregunta

  Service -> Prisma: alumnoExamen.update({ where: { alumnoId_examenId }, data: { respuestas, nota } })
  activate Prisma
  Prisma -> DB: UPDATE AlumnoExamen\nSET respuestas=?, nota=?
  activate DB
  DB --> Prisma: ok
  deactivate DB
  Prisma --> Service: updatedAE
  deactivate Prisma

  Service -> Prisma: alumnoExamen.count({ where: { examenId, nota: null } })
  activate Prisma
  Prisma -> DB: SELECT COUNT(*) FROM AlumnoExamen\nWHERE examenId=? AND nota IS NULL
  activate DB
  DB --> Prisma: count
  deactivate DB
  Prisma --> Service: pendientes
  deactivate Prisma

  alt Todos corregidos (pendientes === 0)
    Service -> Prisma: examen.update({ where: { id: examenId }, data: { estado: 'CORREGIDO' } })
    activate Prisma
    Prisma -> DB: UPDATE Examen SET estado='CORREGIDO'
    activate DB
    DB --> Prisma: ok
    deactivate DB
    Prisma --> Service: examen actualizado
    deactivate Prisma
  else Quedan alumnos sin corregir
    Service -> Prisma: examen.update({ where: { id: examenId }, data: { estado: 'RESUELTO' } })
    activate Prisma
    Prisma -> DB: UPDATE Examen SET estado='RESUELTO'
    activate DB
    DB --> Prisma: ok
    deactivate DB
    Prisma --> Service: examen actualizado
    deactivate Prisma
  end

  Service --> Controller: { nota, aciertos, total, detalles }
end

deactivate Service
Controller --> FE: 200 OK\n{ nota, aciertos, total, detalles }
deactivate Controller
FE --> User: Muestra resultado\nde la corrección
FE -> FE: Redirige a listado\nde exámenes
deactivate FE

@enduml
```

## Participantes

| Componente | Responsabilidad |
|---|---|
| **Frontend (Vue 3)** | ExamenesView que muestra el listado de exámenes, permite seleccionar un examen, capturar las respuestas del alumno, enviar la corrección al backend y mostrar el resultado (nota, aciertos, detalles). |
| **ExamenesController** | Endpoint REST `POST /examenes/:examenId/corregir/:alumnoId` que recibe la petición de corrección con las respuestas del alumno. |
| **ExamenesService** | Lógica de negocio para cruzar respuestas, calcular la nota, persistir la corrección y actualizar el estado del examen según el progreso de corrección. |
| **PrismaService** | Capa ORM que abstrae el acceso a la base de datos. Proporciona métodos para consultar y persistir exámenes, preguntas, respuestas y asignaciones. |
| **Base de Datos (SQLite/PostgreSQL)** | Almacena exámenes, preguntas, respuestas correctas, asignaciones alumno-examen y resultados de corrección. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Lógica de corrección en el backend** | Centralizar el cruce de respuestas y cálculo de nota en ExamenesService garantiza integridad y evita manipulación desde el cliente. |
| **Cálculo de nota proporcional** | `nota = (aciertos / total) * 10` con escala 0–10, estándar académico universitario. |
| **Transición automática de estado** | El examen transiciona a `RESUELTO` mientras queden alumnos sin corregir, y a `CORREGIDO` cuando todos han sido procesados. |
| **Almacenamiento de respuestas como JSON** | Las respuestas del alumno se guardan como JSON en `AlumnoExamen.respuestas` para preservar el histórico de la corrección. |
| **Validación de asignación existente** | Se verifica que el `AlumnoExamen` exista antes de corregir, evitando correcciones sobre asignaciones inexistentes. |
| **Detalle por pregunta** | Se devuelve un array `detalles` con `preguntaId`, `enunciado`, `respuestaCorrecta`, `respuestaAlumno` y `esCorrecto` para feedback al docente. |
| **Seguridad por capas** | `JwtAuthGuard` + `RolesGuard` protegen el endpoint. Solo usuarios con rol `DOCENTE` o `ADMIN` pueden corregir. |
| **Prisma ORM como capa de persistencia** | Abstrae el dialecto SQL (SQLite en desarrollo, PostgreSQL en producción) y proporciona tipado fuerte con TypeScript. |
