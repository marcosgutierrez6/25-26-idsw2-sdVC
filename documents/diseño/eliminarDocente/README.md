# 25-26-idsw2-sdVC > eliminarDocente > Diseño

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

Eliminar un docente con confirmación previa, verificación de existencia y manejo de error 404.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: eliminarDocente()](../../../images/diseño/eliminarDocente/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseño/eliminarDocente/secuencia.puml)|

</div>

## Participantes

| Componente | Responsabilidad |
|---|---|
| **DocentesView** | Diálogo de confirmación. |
| **ProfesoresController** | DELETE /api/profesores/:id. |
| **ProfesoresService** | remove() con findOne previo. |
| **PrismaService** | Capa ORM. |
| **Base de Datos** | Almacena docentes. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Confirmación en frontend** | Diálogo antes de enviar DELETE. |
| **Verificación de existencia** | findOne previo lanza 404 si no existe. |
| **Seguridad por capas** | Solo `ADMIN`. |
