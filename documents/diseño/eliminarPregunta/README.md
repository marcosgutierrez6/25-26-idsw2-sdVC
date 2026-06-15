# 25-26-idsw2-sdVC > eliminarPregunta > Diseño

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

Detallar la interacción para eliminar una pregunta con confirmación previa, verificación de existencia y manejo de error 404.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: eliminarPregunta()](../../../images/diseño/eliminarPregunta/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseño/eliminarPregunta/secuencia.puml)|

</div>


## Participantes

| Componente | Responsabilidad |
|---|---|
| **PreguntasView** | Diálogo de confirmación antes de eliminar. |
| **PreguntasController** | DELETE /api/preguntas/:id. |
| **PreguntasService** | remove() con findOne previo. |
| **PrismaService** | Capa ORM. |
| **Base de Datos** | Almacena preguntas. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Confirmación en frontend** | Se muestra diálogo de confirmación antes de enviar DELETE. |
| **Verificación de existencia** | `remove()` llama a `findOne()` para lanzar 404 si no existe. |
| **Eliminación en cascada** | Prisma elimina respuestas asociadas por la relación (ON CASCADE). |
| **Recarga de listado** | Tras eliminar, se recarga el listado de preguntas. |
| **Seguridad por capas** | Solo `DOCENTE` o `ADMIN`. |
