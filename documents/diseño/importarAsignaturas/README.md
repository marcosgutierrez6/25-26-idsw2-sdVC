# 25-26-idsw2-sdVC > importarAsignaturas > Diseño

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

Importar asignaturas desde un archivo CSV, con validación y carga masiva mediante createMany.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: importarAsignaturas()](../../../images/diseño/importarAsignaturas/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseño/importarAsignaturas/secuencia.puml)|

</div>

## Participantes

| Componente | Responsabilidad |
|---|---|
| **AsignaturasView** | Carga CSV y previsualización. |
| **AsignaturasController** | POST /api/asignaturas/importar. |
| **AsignaturasService** | importarAsignaturas() con validación y createMany. |
| **PrismaService** | Capa ORM. |
| **Base de Datos** | Almacena asignaturas. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **createMany con skipDuplicates** | Carga rápida ignorando duplicados. |
| **Previsualización en frontend** | Usuario confirma antes de importar. |
| **Resumen detallado** | Muestra importados, omitidos y errores. |
