# 25-26-idsw2-sdVC > editarAlumno > Diseño

## Información del artefacto

| Campo | Valor |
|-------|-------|
| **Proyecto** | Sistema de Gestión de Exámenes Universitarios |
| **Fase RUP** | Elaboración |
| **Disciplina** | Diseño |
| **Versión** | 1.0 (NestJS + Vue 3) |
| **Fecha** | 2026-06-14 |
| **Autor** | Marcos Gutierrez |

## Propósito

Detallar la interacción entre los componentes del sistema para editar un alumno existente (modificar DNI, nombre, apellidos, email, grado) o eliminarlo, con verificación de existencia antes de cualquier operación y carga previa de datos con grado y asignaturas asociadas.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: editarAlumno()](../../../images/diseño/editarAlumno/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseño/editarAlumno/secuencia.puml)|

</div>


## Participantes

| Componente | Responsabilidad |
|---|---|
| **AlumnosView (Listado)** | Vista que muestra el listado de alumnos. El usuario hace clic en "Editar" para navegar al formulario de edición. |
| **AlumnosForm (Formulario con tabs)** | Formulario con tabs: [Datos Personales] [Asignaturas] [Exámenes] (todos activos en modo edición). Muestra datos precargados (DNI, nombre, apellidos, email, grado), permite modificar campos, guardar cambios o eliminar el alumno. Validación visual antes de enviar. |
| **AlumnosController** | Endpoints REST `GET /api/alumnos/:id` (carga de datos), `PATCH /api/alumnos/:id` (actualización) y `DELETE /api/alumnos/:id` (eliminación). Guards `JwtAuthGuard` + `RolesGuard` protegen los endpoints, solo DOCENTE y ADMIN. |
| **AlumnosService** | Métodos `findOne()` (busca con `include: { grado: true, asignaturas: { include: { asignatura: true } } }`), `update()` (verifica existencia vía `findOne()` y luego persiste con Prisma) y `remove()` (verifica existencia vía `findOne()` y luego elimina). |
| **PrismaService** | Capa ORM que ejecuta `alumno.findUnique()`, `alumno.update()` y `alumno.delete()` sobre el modelo Alumno. |
| **Base de Datos (SQLite/PostgreSQL)** | Almacena y recupera los datos del alumno, incluyendo su grado y asignaturas asociadas. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Carga previa de datos antes de editar** | El frontend solicita `GET /alumnos/:id` al abrir la edición para precargar todos los campos del formulario, incluyendo grado y asignaturas asociadas. Esto permite al docente ver el estado actual completo antes de modificar. |
| **Verificación de existencia en update() y remove()** | Ambos métodos del servicio llaman a `findOne(id)` antes de operar. Si el alumno fue eliminado entre la carga y la acción, se lanza `NotFoundException` (404). Esto evita errores crípticos de Prisma. |
| **Inclusión de relaciones en findOne()** | `findOne()` incluye `grado` y `asignaturas { include: { asignatura: true } }` para que el formulario de edición pueda mostrar el nombre del grado y las asignaturas en las que está matriculado el alumno. |
| **Validación de datos con DTO de NestJS** | `UpdateAlumnoDto` usa `class-validator` para validar tipos y valores opcionales (permite PATCH parcial, solo actualizando los campos enviados). |
| **Validación visual en frontend** | El frontend valida campos obligatorios antes de enviar el PATCH, evitando peticiones innecesarias al servidor y mejorando la experiencia de usuario. |
| **Eliminación con confirmación** | Antes de enviar el DELETE, el frontend solicita confirmación al docente. Esto evita eliminaciones accidentales de alumnos del sistema. |
| **Seguridad por capas** | `JwtAuthGuard` + `RolesGuard` protegen los tres endpoints. Solo `DOCENTE` y `ADMIN` pueden editar o eliminar alumnos. El acceso no autorizado devuelve 401/403. |
| **DTO reutilizado entre creación y edición** | La estructura de `UpdateAlumnoDto` replica `CreateAlumnoDto` con todos los campos opcionales, lo que permite PATCH parcial y consistencia en la validación entre ambos casos de uso. |

## Trazabilidad con la implementación

| Capa | Artefacto real |
|------|----------------|
| Controlador | `src/apps/backend/src/alumnos/alumnos.controller.ts` (`PATCH /alumnos/:id`, `DELETE /alumnos/:id`, `GET /alumnos/:id`) |
| Servicio | `src/apps/backend/src/alumnos/alumnos.service.ts` (`update()`, `remove()`, `findOne()`) |
| DTO | `src/apps/backend/src/alumnos/dto/update-alumno.dto.ts` (`UpdateAlumnoDto`) |
| Vista | `src/apps/frontend/src/views/AlumnosView.vue` (diálogo de edición) |
| Modelo (BD) | `src/apps/backend/prisma/schema.prisma` (modelo `Alumno`) |
