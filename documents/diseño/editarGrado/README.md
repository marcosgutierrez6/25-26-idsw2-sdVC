# 25-26-idsw2-sdVC > editarGrado > Diseño

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

Detallar la interacción entre los componentes del sistema para editar un grado existente, incluyendo la carga previa de datos, modificación de campos y persistencia de cambios.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: editarGrado()](../../../images/diseño/editarGrado/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseño/editarGrado/secuencia.puml)|

</div>

## Código PlantUML

```plantuml
@startuml
title Diagrama de Secuencia - Editar Grado (NestJS + Vue 3)

actor "Usuario (Docente)" as User
participant "GradosView\n(Listado)" as List
participant "GradosForm\n(Formulario con tabs)" as Form
participant "GradosController" as Controller
participant "GradosService" as Service
participant "PrismaService" as Prisma
participant "Base de Datos\n(SQLite/PostgreSQL)" as DB

note over Form : Modo edición: [Datos del Grado] [Alumnos]\n[Asignaturas] (todos activos)

User -> List: Hace clic en editar\nun grado
activate List

List -> Form: Navega a formulario\nde edición
deactivate List
activate Form

Form -> Controller: GET /api/grados/:id
activate Controller
Controller -> Service: findOne(id)
activate Service
Service -> Prisma: grado.findUnique({\n  where: { id },\n  include: { asignaturas: true, alumnos: true }\n})
activate Prisma
Prisma -> DB: SELECT Grado.*, Asignatura.*, Alumno.*
activate DB
DB --> Prisma: grado con relaciones
deactivate DB
Prisma --> Service: grado
deactivate Prisma
Service --> Controller: grado
deactivate Service
Controller --> Form: 200 OK\n{ grado }
deactivate Controller

Form --> User: Muestra formulario\ncon datos precargados

User -> Form: Modifica campos\ny pulsa "Guardar"
Form -> Form: Validación visual

Form -> Controller: PATCH /api/grados/:id\nbody: { titulo, codigo }
activate Controller
Controller -> Service: update(id, updateGradoDto)
activate Service

Service -> Prisma: grado.findUnique({ where: { id } })
activate Prisma
Prisma -> DB: SELECT Grado WHERE id=?
activate DB
DB --> Prisma: grado | null
deactivate DB
Prisma --> Service: grado
deactivate Prisma

alt Grado no encontrado
  Service --> Controller: throw NotFoundException
  Controller --> Form: 404 Not Found
  Form --> User: Muestra "Grado\nno encontrado"
else Grado existe
  Service -> Prisma: grado.update({\n  where: { id },\n  data: { titulo, codigo }\n})
  activate Prisma
  Prisma -> DB: UPDATE Grado SET titulo=..., codigo=...
  activate DB
  DB --> Prisma: grado actualizado
  deactivate DB
  Prisma --> Service: grado
  deactivate Prisma

  Service --> Controller: grado
  deactivate Service
  Controller --> Form: 200 OK\n{ grado }
  deactivate Controller
  Form --> User: Muestra grado\nactualizado
end

deactivate Form

@enduml
```

## Participantes

| Componente | Responsabilidad |
|---|---|
| **GradosView (Listado)** | Vista que muestra el listado de grados. El usuario hace clic en "Editar" para navegar al formulario de edición. |
| **GradosForm (Formulario con tabs)** | Formulario con tabs: [Datos del Grado] [Alumnos] [Asignaturas] (todos activos en modo edición). Muestra datos precargados del grado con sus relaciones. Validación visual antes de enviar. |
| **GradosController** | Endpoints `GET /:id` y `PATCH /:id` protegidos por guards JWT + Roles. |
| **GradosService** | Métodos `findOne()` (carga con include) y `update()` (verificación + persistencia). |
| **PrismaService** | Capa ORM que ejecuta las consultas de lectura y actualización. |
| **Base de Datos (SQLite/PostgreSQL)** | Almacena el grado y sus relaciones. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Carga previa con include** | `findOne()` incluye `asignaturas` y `alumnos` para mostrar relaciones en la vista de edición. |
| **Verificación de existencia en update** | `update()` llama a `findOne()` primero para lanzar 404 si el grado no existe. |
| **DTO parcial** | `UpdateGradoDto` permite modificar solo los campos enviados (PATCH semantics). |
| **Validación visual en frontend** | El frontend valida campos obligatorios antes de enviar. |
| **Manejo de error 404** | Si el grado no existe, se lanza `NotFoundException` manejado globalmente. |
| **Seguridad por capas** | Solo `DOCENTE` o `ADMIN` pueden editar grados. |
| **Sin transaccionalidad explícita** | Operación de actualización simple sin necesidad de transacción. |
| **Respuesta completa** | El endpoint devuelve el grado actualizado con todas sus relaciones. |
