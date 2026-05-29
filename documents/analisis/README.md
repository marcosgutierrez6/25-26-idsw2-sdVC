# Análisis de Casos de Uso — Estándar del Proyecto

Este directorio contiene los análisis RUP (BCE) de cada caso de uso del sistema, siguiendo una plantilla unificada.

## Estructura

```
documents/analisis/
├── README.md                ← Este archivo (índice)
├── _plantilla/              ← Plantilla para copiar al crear un nuevo análisis
│   └── README.md
└── <nombreCasoUso>/
    └── README.md            ← Análisis completo del caso de uso
```

Cada análisis tiene su correspondiente diagrama UML en:

```
modelosUML/analisis/
├── _plantilla/
│   └── colaboracion.puml    ← Plantilla del diagrama de colaboración
└── <nombreCasoUso>/
    └── colaboracion.puml    ← Diagrama de colaboración del caso de uso
```

## Casos analizados

| Caso de uso | Estado |
|---|---|
| corregirExamenes | Completado |
| generarExamenes | Completado |
| importarConfiguracionGlobal | Completado |
| exportarConfiguracionGlobal | Completado |
| importarAlumnos | Completado |
| importarPreguntas | Completado |
| exportarAlumnos | Completado |
| exportarPreguntas | Completado |
| asignarExamenes | Completado |
| crearPregunta | Completado |
| editarPregunta | Completado |
| editarAsignatura | Completado |
| crearDocente | Completado |

## Cómo crear un nuevo análisis

1. Copia `_plantilla/README.md` a `documents/analisis/<tuCasoUso>/README.md`
2. Copia `_plantilla/colaboracion.puml` a `modelosUML/analisis/<tuCasoUso>/colaboracion.puml`
3. Rellena ambos siguiendo las indicaciones de la plantilla
4. Genera el SVG del diagrama y colócalo en `images/analisis/<tuCasoUso>/`
5. Añade una entrada en la tabla de este README

## Artefactos de referencia

Para cada análisis, debes consultar:

- **`contexto/casos-de-uso/detalladoCasosDeUso/<casoUso>.puml`** — Diagrama de estados detallado del caso de uso
- **`contexto/casos-de-uso/prototipadoCasosDeUso/<casoUso>.puml`** — Prototipo de interfaz (wireframe)
- **`src/apps/backend/src/<modulo>/`** — Implementación real del backend (controlador + servicio)
- **`src/apps/frontend/src/views/<Modulo>View.vue`** — Implementación real del frontend
