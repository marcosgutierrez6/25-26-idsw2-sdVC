# 25-26-idsw2-sdVC > eliminarRespuesta > Diseño

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

Eliminar una respuesta con confirmación previa, verificación de existencia y manejo de error 404.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: eliminarRespuesta()](../../../images/diseño/eliminarRespuesta/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseño/eliminarRespuesta/secuencia.puml)|

</div>

## Participantes

| Componente | Responsabilidad |
|---|---|
| **PreguntasForm (Formulario con tabs)** | Contexto de pregunta desde donde se eliminan las respuestas. Modo edición: [Datos] [Respuestas] (todos activos). |
| **RespuestasView (Listado)** | Vista que muestra el listado de respuestas y el diálogo de confirmación. |
| **RespuestasController** | DELETE /api/respuestas/:id. |
| **RespuestasService** | remove() con findOne previo. |
| **PrismaService** | Capa ORM. |
| **Base de Datos** | Almacena respuestas. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Confirmación en frontend** | Diálogo antes de enviar DELETE. |
| **Verificación de existencia** | findOne previo lanza 404 si no existe. |
| **Seguridad por capas** | Solo `DOCENTE` o `ADMIN`. |
