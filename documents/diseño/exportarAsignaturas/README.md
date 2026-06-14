# 25-26-idsw2-sdVC > exportarAsignaturas > Diseño

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

Exportar todas las asignaturas a un archivo descargable (CSV/JSON) reutilizando el endpoint GET /api/asignaturas.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: exportarAsignaturas()](../../../images/diseño/exportarAsignaturas/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseño/exportarAsignaturas/secuencia.puml)|

</div>

## Participantes

| Componente | Responsabilidad |
|---|---|
| **AsignaturasView** | Botón de exportar y descarga del archivo. |
| **AsignaturasController** | GET /api/asignaturas (reutilizado). |
| **AsignaturasService** | findAll() sin cambios. |
| **PrismaService** | Capa ORM. |
| **Base de Datos** | Almacena asignaturas. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Reutiliza GET existente** | Sin endpoint específico; vista descarga datos recibidos. |
| **Conversión en frontend** | El listado ya está disponible en la vista. |
| **Sin vista separada** | Caso abstracto; es un botón en el listado. |
