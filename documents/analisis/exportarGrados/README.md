# 25-26-idsw2-sdVC > exportarGrados > Análisis

## propósito

Análisis de colaboración del caso de uso `exportarGrados()` mediante el patrón MVC.

## diagrama de colaboración

<div align=center>

|![Análisis: exportarGrados()](../../../images/analisis/exportarGrados/colaboracion.svg)|
|-|
|Código fuente: [colaboracion.puml](../../../modelosUML/analisis/exportarGrados/colaboracion.puml)|

</div>

## clases de análisis identificadas

### GradosService (Entity)
- Abstraer acceso a datos de grados
- `findAll()`

### Grado (Entity)
- Atributos: id, nombre, codigo

> Caso de uso abstracto, sub-operación de `exportarConfiguracionGlobal`. Sin Boundary ni Controller propio.

## diagrama de secuencia

<div align=center>

|![Secuencia: exportarGrados()](../../../images/analisis/exportarGrados/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/analisis/exportarGrados/secuencia.puml)|

</div>

## estados de análisis

| Estado | Descripción |
|--------|-------------|
| `RequiringExport` | `exportarConfiguracionGlobal` solicita exportar grados |
| `ProvidingGrados` | Recupera datos y los entrega al padre |

**Entrada:** exportarConfiguracionGlobal
**Salida:** exportarConfiguracionGlobal (con datos)

## trazabilidad con la implementación

| Capa | Artefacto |
|------|-----------|
| Servicio | `src/apps/backend/src/grados/grados.service.ts` (`findAll()`) |
| Modelo (BD) | `src/apps/backend/prisma/schema.prisma` (modelo `Grado`) |
