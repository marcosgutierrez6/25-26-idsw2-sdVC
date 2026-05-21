# Conversation log

## [HH:MM] Inicio de sesión

**Prompt:** *(lo que le dijo al AI para arrancar el proyecto)*

**Resultado:** *(lo que produjo)*

**Decisión:** *(qué aceptó, qué rechazó, qué modificó, y por qué)*

---

> El log no se reescribe. Se escribe mientras ocurre.
>
> Para cada intercambio relevante con el AI, añada una entrada con este formato:
>
> ```
> ## [HH:MM] Título breve de lo que se pidió
>
> **Prompt:** lo que le dijo al AI (textual o resumido fielmente)
>
> **Resultado:** lo que produjo
>
> **Decisión:** qué aceptó, qué rechazó, qué modificó, y por qué
> ```

## [15:55] Configurar reglas de opencode y reorganizar carpetas

**Prompt:** Crear reglas de opencode para el proyecto (artefactos obligatorios, conversation-log, estructura de carpetas, revisión de reglas) y reorganizar `casos-de-uso/` y `diagramas/` en una carpeta `contexto/`.

**Resultado:**
- Creado `.opencode/rules/` con 4 reglas: `revisar-reglas.md`, `artefactos-obligatorios.md`, `conversation-log.md`, `estructura-carpetas.md`.
- Movidas `casos-de-uso/` y `diagramas/` a `contexto/`.
- Actualizadas rutas relativas en los READMEs afectados (`contexto/diagramas/README.md`, `contexto/casos-de-uso/encontrarActoresYCasosDeUso/README.md`, `contexto/casos-de-uso/diagramasDeContexto/README.md`).

**Decisión:** Aceptado todo. Se usó `contexto/` como nombre de la carpeta contenedora. Las reglas son solo del repositorio (`.opencode/rules/`), no globales.
