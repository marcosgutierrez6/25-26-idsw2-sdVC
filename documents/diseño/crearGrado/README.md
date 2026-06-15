# 25-26-idsw2-sdVC > crearGrado > Diseño

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

Detallar la interacción entre los componentes del sistema para crear un nuevo grado universitario, con validación de campos obligatorios y manejo de unicidad del código.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: crearGrado()](../../../images/diseño/crearGrado/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseño/crearGrado/secuencia.puml)|

</div>

## Código PlantUML

```plantuml
@startuml
title Diagrama de Secuencia - Crear Grado (NestJS + Vue 3)

actor "Usuario (Docente)" as User
participant "GradosView\n(Listado)" as List
participant "GradosForm\n(Modal)" as Form
participant "GradosController" as Controller
participant "GradosService" as Service
participant "PrismaService" as Prisma
participant "Base de Datos\n(SQLite/PostgreSQL)" as DB

User -> List: Hace clic en "Nuevo Grado"
activate List

List -> Form: Abre modal de\ncreación
activate Form
Form --> User: Muestra diálogo con\ncampos: título, código

User -> Form: Rellena campos\ny pulsa "Crear"
Form -> Form: Validación visual\nde campos obligatorios

Form -> Controller: POST /api/grados\nbody: { titulo, codigo }
activate Controller

Controller -> Service: create(createGradoDto)
activate Service

Service -> Prisma: grado.create({\n  data: { titulo, codigo }\n})
activate Prisma
Prisma -> DB: INSERT INTO Grado\n(titulo, codigo)
activate DB

alt Código duplicado (unique constraint)
  DB --> Prisma: Error unique constraint
  deactivate DB
  Prisma --> Service: lanza error
  deactivate Prisma
  Service --> Controller: lanza excepción
  Controller --> Form: 409 Conflict
  Form --> User: Muestra "Código\nya existe"
else Creación exitosa
  DB --> Prisma: grado creado (id)
  deactivate DB
  Prisma --> Service: grado
  deactivate Prisma

  Service --> Controller: grado
  deactivate Service
  Controller --> Form: 201 Created\n{ grado }
  deactivate Controller

  Form --> List: Cierra modal y\nnotifica éxito
  deactivate Form
  List --> User: Muestra grado\ncreado y navega a\neditarGrado()
end

deactivate List

@enduml
```

## Participantes

| Componente | Responsabilidad |
|---|---|
| **GradosView** | Vista que muestra el listado de grados. El usuario hace clic en "Nuevo Grado" para abrir el modal de creación. |
| **GradosForm** | Modal de creación con campos título y código, validación visual antes de enviar. |
| **GradosController** | Endpoint REST `POST /api/grados` protegido por `JwtAuthGuard` + `RolesGuard`. |
| **GradosService** | Método `create()` que persiste el grado mediante Prisma. |
| **PrismaService** | Capa ORM que ejecuta `grado.create()`. |
| **Base de Datos (SQLite/PostgreSQL)** | Almacena el grado. Valida unique constraint en `codigo`. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Validación visual en frontend** | El frontend valida campos obligatorios antes de enviar, evitando peticiones innecesarias. |
| **DTO con class-validator** | `CreateGradoDto` valida tipos y formato en backend mediante decoradores. |
| **Persistencia simple** | `GradosService.create()` es una operación directa — `prisma.grado.create()`. |
| **Manejo de error unique** | Si `codigo` ya existe, Prisma lanza `P2002` que NestJS convierte en 409 Conflict. |
| **Transición a editarGrado** | Tras crear, la vista navega a `GRADO_ABIERTO` para editar si es necesario. |
| **Seguridad por capas** | Solo usuarios `DOCENTE` o `ADMIN` pueden crear grados. |
| **Sin transaccionalidad explícita** | Operación atómica simple sin necesidad de transacción. |
| **Respuesta completa** | El endpoint devuelve el grado creado con su `id` generado. |
