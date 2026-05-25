# Análisis: <nombreCasoUso>()

> **Instrucciones:** Rellena cada sección siguiendo el patrón BCE (Boundary-Control-Entity).
> Elimina este bloque de instrucciones al terminar.
> Consulta siempre: diagrama de estados detallado, prototipo de interfaz e implementación real.

## 1. Clases de Análisis

### Boundary (Frontera)

**`<Nombre>View`** — Interfaz que permite al `<Actor>`:

- `<acción principal que inicia el caso de uso>`
- `<confirmar o cancelar la operación>` (si aplica)
- `<visualizar resultados>`

### Control

**`<Nombre>Controller`** — Gestiona el flujo del caso de uso:

- `<validación de entrada>` (si aplica)
- `<coordinación de la lógica>`
- `<actualización del estado>`

### Entity (Entidad)

- **`<EntidadPrincipal>`** — Representa `<descripción de la entidad>`
- **`<EntidadSecundaria>`** — Representa `<descripción>` (si aplica)
- **`<Entidad>Repository`** — Abstracción de la capa de persistencia

> **Nota:** El Repository es una clase de análisis que media entre el Controller y las Entidades.
> En la implementación real puede ser un Service (NestJS), un DAO o un Repository pattern.

## 2. Diagrama de Colaboración

```
📎 ver colaboracion.puml en modelosUML/analisis/<nombreCasoUso>/
```

El diagrama muestra la interacción entre las clases de análisis, con mensajes numerados
que indican el orden del flujo.

## 3. Opciones de Navegación

Desde esta pantalla, el `<Actor>` puede navegar a:

| Acción | Destino | Descripción |
|---|---|---|
| `<acción>` | `<casoDeUsoDestino>()` | `<breve descripción>` |
| `<acción>` | `<casoDeUsoDestino>()` | `<breve descripción>` |

> **Regla:** Las opciones de navegación se corresponden con los botones/acciones
> visibles en el prototipo de interfaz (`prototipadoCasosDeUso/<casoUso>.puml`).

## 4. Estados de Análisis

Los estados se corresponden con el diagrama de estados detallado en
`detalladoCasosDeUso/<casoUso>.puml`:

| Estado | Descripción |
|---|---|
| `<Estado1>` | `<qué ocurre en este estado>` |
| `<Estado2>` | `<qué ocurre en este estado>` |
| `<Estado3>` | `<qué ocurre en este estado>` |

> **Transiciones clave:**
> - `<Estado1>` → `<Estado2>` : `<condición/disparador>`
> - `<Estado2>` → `<Estado3>` : `<condición/disparador>`

## 5. Trazabilidad con la Implementación

| Capa | Artefacto real |
|---|---|
| Controlador | `src/apps/backend/src/<modulo>/<modulo>.controller.ts` |
| Servicio | `src/apps/backend/src/<modulo>/<modulo>.service.ts` |
| Vista | `src/apps/frontend/src/views/<Modulo>View.vue` |
| Modelo (BD) | `src/apps/backend/prisma/schema.prisma` (entidad `<Entidad>`) |
