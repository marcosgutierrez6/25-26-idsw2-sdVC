# 25-26-idsw2-sdVC > exportarPreguntas > Análisis

## información del artefacto

- **Proyecto**: Sistema de Gestión de Exámenes Universitarios
- **Fase RUP**: Elaboration (Elaboración)
- **Disciplina**: Análisis y Diseño
- **Versión**: 1.0
- **Fecha**: 2026-05-29
- **Autor**: Marcos Gutierrez

## propósito

Análisis del caso de uso abstracto `exportarPreguntas()`, sub-operación de `exportarConfiguracionGlobal()` mediante el patrón MVC. Este caso de uso no tiene interacción directa con el actor — es invocado por `exportarConfiguracionGlobal()` para obtener todas las preguntas del sistema con sus datos completos (respuestas y batería asociada) y devolverlos para su compilación en el archivo de configuración exportable.

## diagrama de colaboración

<div align=center>

|![Análisis: exportarPreguntas()](../../../images/analisis/exportarPreguntas/colaboracion.svg)|
|-|
|Código fuente: [colaboracion.puml](../../../modelosUML/analisis/exportarPreguntas/colaboracion.puml)|

</div>

## clases de análisis identificadas

### clases de vista (boundary)

No aplica. Al ser un caso de uso abstracto (sub-operación de `exportarConfiguracionGlobal()`), no tiene interacción directa con el actor. La interacción con el Docente se realiza a través de `ExportarConfiguracionGlobalView`.

### clases de control

#### ConfiguracionController
**Estereotipo**: Control
**Responsabilidades**:
- Coordinar la exportación de preguntas como parte del flujo de exportación de configuración global
- Invocar la lectura de preguntas a través del repositorio
- Recibir y estructurar los datos de preguntas para su inclusión en el archivo de configuración

**Colaboraciones**:
- **Caso de uso padre**: Responde a `exportarConfiguracionGlobal()` desde `ExportarConfiguracionGlobalView`
- **Repositorio**: Delega la operación de lectura a `ConfiguracionRepository`

### clases de entidad (entity)

#### ConfiguracionRepository
**Estereotipo**: Entidad
**Responsabilidades**:
- Abstraer el acceso a datos de la entidad `Pregunta`
- Proporcionar método para obtener todas las preguntas con sus respuestas y batería asociada
- Garantizar la integridad de los datos exportados

**Colaboraciones**:
- **Control**: Responde a `ConfiguracionController`
- **Entidad**: Gestiona instancias de `Pregunta` y sus relaciones con `Respuesta` y `BateriaDePreguntas`

#### Pregunta
**Estereotipo**: Entidad
**Responsabilidades**:
- Representar una pregunta del banco de preguntas
- Encapsular atributos: id, enunciado, tema, dificultad, estado, bateriaId
- Relacionarse con sus respuestas y su batería de preguntas

**Atributos relevantes**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | Int (PK) | Identificador único de la pregunta |
| `enunciado` | String | Texto de la pregunta |
| `tema` | String | Tema al que pertenece |
| `dificultad` | Dificultad (enum) | BAJA \| MEDIA \| ALTA |
| `estado` | EstadoPregunta (enum) | EN_CONSTRUCCION \| HABILITADA \| INHABILITADA |
| `bateriaId` | Int (FK) | Referencia a la batería de preguntas |

**Colaboraciones**:
- **ConfiguracionRepository**: Es gestionada por el repositorio
- **Respuesta**: Relación de composición con las opciones de respuesta
- **BateriaDePreguntas**: Relación de pertenencia a la batería

#### Respuesta
**Estereotipo**: Entidad
**Responsabilidades**:
- Representar una opción de respuesta de una pregunta
- Encapsular atributos: id, opcion, esCorrecta, preguntaId
- Indicar si es la respuesta correcta

**Atributos relevantes**:
| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | Int (PK) | Identificador único de la respuesta |
| `opcion` | String | Texto de la opción |
| `esCorrecta` | Boolean | Indica si es la respuesta correcta |
| `preguntaId` | Int (FK) | Referencia a la pregunta |

**Colaboraciones**:
- **ConfiguracionRepository**: Es gestionada por el repositorio
- **Pregunta**: Relación de pertenencia a la pregunta

#### BateriaDePreguntas
**Estereotipo**: Entidad
**Responsabilidades**:
- Representar el banco de preguntas asociado a una asignatura
- Encapsular atributos: id, asignaturaId
- Relacionarse con su asignatura

**Colaboraciones**:
- **ConfiguracionRepository**: Es consultada para obtener datos de la batería asociada a la pregunta

## diagrama de secuencia

<div align=center>

|![Secuencia: exportarPreguntas()](../../../images/analisis/exportarPreguntas/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/analisis/exportarPreguntas/secuencia.puml)|

</div>

## flujo de colaboración

### secuencia de operaciones (flujo principal)

1. **Inicio**: `exportarConfiguracionGlobal()` → `ConfiguracionController.exportarPreguntas()`
2. **Acceso a datos**: `ConfiguracionController` → `ConfiguracionRepository.obtenerPreguntas()`
3. **Lectura de preguntas**: `ConfiguracionRepository` → `Pregunta` → obtiene todas las preguntas con sus respuestas y batería asociada
4. **Devolución**: `ConfiguracionRepository` → `ConfiguracionController` → datos de preguntas con respuestas y batería

### flujo alternativo — error de acceso a datos

- Paso 2 falla por error de base de datos o datos inconsistentes
- `ConfiguracionRepository` retorna error a `ConfiguracionController`
- `ConfiguracionController` propaga el error a `exportarConfiguracionGlobal()`
- `ExportarConfiguracionGlobalView` muestra mensaje de error al Docente

## estados de análisis

Los estados se corresponden con el diagrama de estados detallado en `contexto/casos-de-uso/detalladoCasosDeUso/exportarPreguntas/exportarPreguntas.puml`:

| Estado | Descripción |
|--------|-------------|
| `RequiringExport` | `exportarConfiguracionGlobal()` solicita exportar las preguntas del sistema |
| `ProvidingPreguntas` | El sistema permite exportar los datos de preguntas |

**Transiciones clave:**
- `RequiringExport` → `ProvidingPreguntas`: Sistema accede a los datos de preguntas
- `ProvidingPreguntas` → `[*]`: Datos de preguntas obtenidos y devueltos al caso de uso padre

## correspondencia con requisitos

### mapeado con especificación detallada

| Requisito del caso de uso | Clase responsable | Método/Colaboración |
|--------------------------|-------------------|---------------------|
| Obtener todas las preguntas del sistema | `ConfiguracionRepository` | `obtenerPreguntas()` |
| Incluir respuestas asociadas a cada pregunta | `ConfiguracionRepository` | Lectura de `Pregunta` con relación a `Respuesta` |
| Incluir batería con asignatura asociada | `ConfiguracionRepository` | Lectura de `Pregunta` con relación a `BateriaDePreguntas` y `Asignatura` |
| Compilar datos de preguntas en archivo exportable | `ConfiguracionController` | Estructuración de datos recibidos |

### patrón de colaboración establecido

Este análisis sigue el **patrón metodológico universal** establecido para el proyecto:
- **Caso de uso abstracto**: No tiene interacción directa con el actor — es sub-operación de `exportarConfiguracionGlobal()`
- **Análisis MVC sin capa de vista**: Solo Control y Entidad (la vista pertenece al caso de uso padre)
- **Flujo lineal**: Sin bifurcaciones de confirmación o cancelación
- **Operación de solo lectura**: Exportación de datos existentes, sin modificación del estado del sistema

### consideraciones de filtros

`exportarPreguntas()` **no requiere filtros de búsqueda**. Es una operación de exportación masiva donde el sistema obtiene todos los registros de preguntas. Los datos se exportan completos, sin criterios de filtrado.

## características del análisis

### separación de responsabilidades MVC

- **Control**: Solo coordinación de la operación de exportación
- **Entidad**: Solo datos, reglas de negocio de persistencia y relaciones entre entidades

### agnóstico tecnológicamente

- No especifica tecnología de interfaz de usuario
- No asume formato específico del archivo de exportación (CSV, JSON, XML)
- No asume implementación específica de base de datos
- Mantiene independencia de frameworks

### trazabilidad completa

- **Origen**: Caso de uso detallado `exportarPreguntas()` como sub-operación de `exportarConfiguracionGlobal()`
- **Destino**: Base para diseño arquitectónico e implementación
- **Conexión**: Diagrama de contexto → Análisis de colaboración → Implementación real

## trazabilidad con la implementación

| Capa | Artefacto real |
|------|----------------|
| Controlador | `src/apps/backend/src/preguntas/preguntas.controller.ts` (endpoint `GET /preguntas`) |
| Servicio | `src/apps/backend/src/preguntas/preguntas.service.ts` (método `findAll()` con `include: { respuestas: true, bateria: { include: { asignatura: true } } }`) |
| Vista | No aplica (sub-operación de `exportarConfiguracionGlobal()`) |
| Modelo (BD) | `src/apps/backend/prisma/schema.prisma` (entidades `Pregunta`, `Respuesta`, `BateriaDePreguntas`, `Asignatura`) |

> **Nota:** Este caso de uso está priorizado como #8 y es de tipo **Abstracto**. No requiere implementación independiente — la exportación de preguntas se realiza a través del caso de uso `exportarConfiguracionGlobal()` (prioridad #4). En el análisis se usa `ConfiguracionRepository` como clase de análisis (coherente con el caso de uso padre), pero la implementación real del acceso a datos de preguntas reside en `PreguntasService.findAll()` con inclusión de respuestas, batería y asignatura. El análisis describe la colaboración interna que ocurre cuando `exportarConfiguracionGlobal()` solicita los datos de preguntas como parte de la exportación completa.

## patrones aplicados

### repository pattern
`ConfiguracionRepository` abstrae el acceso a datos de `Pregunta`, permitiendo una operación de lectura completa con las relaciones a `Respuesta`, `BateriaDePreguntas` y `Asignatura`.

### mvc pattern
Separación entre lógica de aplicación (`ConfiguracionController`) y datos (`Pregunta`, `Respuesta`, `BateriaDePreguntas`, `ConfiguracionRepository`). La capa de vista no aplica por ser caso de uso abstracto.
