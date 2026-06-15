# 25-26-idsw2-sdVC > crearAsignatura > Diseño

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

Detallar la interacción entre los componentes del sistema para crear una nueva asignatura con sus datos básicos (título, código, curso académico, grado asociado) y manejar restricciones de unicidad.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: crearAsignatura()](../../../images/diseño/crearAsignatura/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseño/crearAsignatura/secuencia.puml)|

</div>

## Código PlantUML

```plantuml
@startuml
title Diagrama de Secuencia - Crear Asignatura (NestJS + Vue 3)

actor "Usuario (Docente)" as User
participant "AsignaturasView\n(Listado)" as List
participant "AsignaturasForm\n(Modal)" as Form
participant "AsignaturasController" as Controller
participant "AsignaturasService" as Service
participant "PrismaService" as Prisma
participant "Base de Datos\n(SQLite/PostgreSQL)" as DB

User -> List: Hace clic en "Nueva\nAsignatura"
activate List

List -> Form: Abre modal de\ncreación
activate Form
Form --> User: Muestra diálogo con\ncampos: titulo, codigo,\ncursoAcademico, gradoId

User -> Form: Rellena campos\ny pulsa "Crear"
Form -> Form: Validación visual\nde campos obligatorios

Form -> Controller: POST /api/asignaturas\nbody: { titulo, codigo, cursoAcademico, gradoId }
activate Controller

Controller -> Service: create(createAsignaturaDto)
activate Service

Service -> Prisma: asignatura.create({\n  data: { titulo, codigo, cursoAcademico, gradoId }\n})
activate Prisma
Prisma -> DB: INSERT INTO Asignatura
activate DB

alt Unique constraint (código duplicado)
  DB --> Prisma: Error unique constraint
  deactivate DB
  Prisma --> Service: lanza error
  deactivate Prisma
  Service --> Controller: lanza excepción
  Controller --> Form: 409 Conflict
  Form --> User: Muestra "Código\nduplicado"
else Creación exitosa
  DB --> Prisma: asignatura creada (id)
  deactivate DB
  Prisma --> Service: asignatura
  deactivate Prisma

  Service --> Controller: asignatura
  deactivate Service
  Controller --> Form: 201 Created\n{ asignatura }
  deactivate Controller

  Form --> List: Cierra modal y\nnotifica éxito
  deactivate Form
  List --> User: Muestra asignatura\ncreada y navega a\neditarAsignatura()
end

deactivate List

@enduml
```

## Participantes

| Componente | Responsabilidad |
|---|---|
| **AsignaturasView** | Vista que muestra el listado de asignaturas. El usuario hace clic en "Nueva Asignatura" para abrir el modal de creación. |
| **AsignaturasForm** | Modal de creación con campos titulo, codigo, cursoAcademico, gradoId. Validación visual antes de enviar. |
| **AsignaturasController** | Endpoint REST `POST /api/asignaturas` protegido por `JwtAuthGuard` + `RolesGuard`. |
| **AsignaturasService** | Método `create()` que persiste la asignatura mediante Prisma. |
| **PrismaService** | Capa ORM que ejecuta `asignatura.create()`. |
| **Base de Datos (SQLite/PostgreSQL)** | Almacena la asignatura. Valida unique constraint en `codigo`. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Validación visual en frontend** | El frontend valida campos obligatorios antes de enviar, evitando peticiones innecesarias. |
| **DTO con class-validator** | `CreateAsignaturaDto` valida tipos y formato en backend. |
| **Persistencia simple** | `AsignaturasService.create()` es directa — `prisma.asignatura.create()`. No crea batería automáticamente (según el análisis debería, pero la impl actual no lo hace). |
| **Manejo de error unique** | Si el código ya existe, Prisma lanza `P2002` que NestJS convierte en 409 Conflict. |
| **Transición a editarAsignatura** | Tras crear, la vista navega a `ASIGNATURA_ABIERTO` para editar/batería. |
| **Seguridad por capas** | Solo usuarios `DOCENTE` o `ADMIN` pueden crear asignaturas. |
| **Sin transaccionalidad explícita** | Operación atómica simple sin necesidad de transacción. |
| **Respuesta completa** | El endpoint devuelve la asignatura creada con su `id` generado. |
