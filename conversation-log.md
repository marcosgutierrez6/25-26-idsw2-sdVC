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

---

## [16:00] Planificación del proyecto + construcción inicial

**Prompt:** Trazar un plan para construir el sistema completo con Turborepo (monorepo), NestJS backend, Prisma + MySQL, Vue frontend con PrimeVue/Pinia/Axios/Vue Router. Backend first. Respondí 3 preguntas de decisión: estructura del monorepo (src/ como raíz), mantener artefactos de contexto sin mover, y construir backend primero.

**Resultado:**
Backend NestJS construido al completo:
- Prisma schema (SQLite para dev, intercambiable a MySQL vía DATABASE_URL) con 11 modelos y 5 enums
- AuthModule JWT (login, register, JwtStrategy, JwtAuthGuard)
- RolesGuard + @Roles decorator (DOCENTE, ADMIN)
- 8 módulos CRUD: Grados, Asignaturas, Profesores, Alumnos, Preguntas, Respuestas, Examenes, BateriaDePreguntas
- Lógica de negocio: generarExamenes (selección por dificultad/tema), asignarExamenes (hash SHA-256), corregirExamenes (cruce respuestas + nota)
- Build exitoso sin errores

Frontend Vue 3 construido:
- Vite + TypeScript + PrimeVue (Aura theme) + Pinia + Vue Router + Axios
- Layout con Toolbar, Sidebar y menú dinámico por rol
- 8 vistas: Login, Dashboard, Grados, Asignaturas, Alumnos, Profesores, Preguntas, Examenes (con tabs listado/generar/resultados)
- Build exitoso sin errores

Archivos: src/package.json, src/turbo.json, src/.gitignore, apps/backend (30+ archivos), apps/frontend (15+ archivos), packages/shared, TODO.md, .env

**Decisión:** Se aceptó todo. Decisiones tomadas: (1) Turborepo dentro de src/ con apps/backend y apps/frontend, (2) los diagramas existentes en contexto/ son de análisis y no se mueven a modelosUML/, (3) se usó SQLite para desarrollo porque MySQL no está disponible localmente, intercambiable a MySQL cambiando el provider y la DATABASE_URL.
