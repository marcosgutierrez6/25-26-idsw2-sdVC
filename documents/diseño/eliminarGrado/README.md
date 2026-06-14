# 25-26-idsw2-sdVC > eliminarGrado > Diseño

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

Eliminar un grado con confirmación previa, verificación de existencia y manejo de error 404.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: eliminarGrado()](../../../images/diseño/eliminarGrado/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseño/eliminarGrado/secuencia.puml)|

</div>

## Participantes

| Componente | Responsabilidad |
|---|---|
| **GradosView** | Diálogo de confirmación. |
| **GradosController** | DELETE /api/grados/:id. |
| **GradosService** | remove() con findOne previo. |
| **PrismaService** | Capa ORM. |
| **Base de Datos** | Almacena grados. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Confirmación en frontend** | Diálogo antes de enviar DELETE. |
| **Verificación de existencia** | findOne previo lanza 404 si no existe. |
| **Eliminación en cascada** | Prisma elimina asignaturas y relaciones asociadas. |
| **Seguridad por capas** | Solo `DOCENTE` o `ADMIN`. |
