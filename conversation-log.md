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

---

## [19:10] Estandarizar formato de análisis RUP (BCE)

**Prompt:** Unificar el criterio de análisis de casos de uso para que todos los análisis del proyecto sigan el mismo patrón BCE (Boundary-Control-Entity). Se revisaron varios enfoques y se acordó crear una plantilla común.

**Resultado:**
- Creado `documents/analisis/README.md` como índice de análisis con instrucciones
- Creado `documents/analisis/_plantilla/README.md` con la plantilla estándar para análisis BCE (5 secciones: clases, colaboración, navegación, estados, trazabilidad)
- Creado `modelosUML/analisis/_plantilla/colaboracion.puml` con el diagrama de colaboración genérico

**Decisión:** Aceptado todo. Se usó la estructura `documents/analisis/<casoUso>/README.md` para el análisis y `modelosUML/analisis/<casoUso>/colaboracion.puml` para el diagrama. La plantilla incluye: clases BCE con responsabilidades, diagrama de colaboración numerado, opciones de navegación (mapeadas del prototipo), estados de análisis (mapeados del detallado), y trazabilidad con la implementación real.

---

## [19:22] Análisis de corregirExamenes() + iteraciones de revisión

**Prompt:** Crear el análisis RUP (BCE) de `corregirExamenes()`. Incluir clases de análisis, diagramas de colaboración y secuencia, flujos, navegación, estados y trazabilidad. Luego iterar sobre el análisis para validar contra el contexto del proyecto.

**Resultado:**
- Creado `documents/analisis/corregirExamenes/README.md` con análisis completo (BCE, flujos, estados, trazabilidad, patrones)
- Creados `modelosUML/analisis/corregirExamenes/colaboracion.puml` y `secuencia.puml`
- Generados SVGs vía PlantUML server (`images/analisis/corregirExamenes/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** En la primera iteración se corrigieron 3 issues: (1) transición de estado del examen simplificada (se actualizó a `ASIGNADO→RESUELTO→CORREGIDO`), (2) añadida sección "Estados de Análisis" faltante, (3) aclarado propósito del campo `claveCorreccion`. En la segunda iteración se corrigió un cuarto issue: (4) referencia a `SISTEMA_DISPONIBLE` como salida cuando todas las salidas van a `EXAMENES_CORREGIDOS`. El análisis quedó completo y validado contra el contexto del proyecto.

---

## [19:37] Análisis de generarExamenes() + iteración de revisión

**Prompt:** Crear el análisis RUP (BCE) de `generarExamenes()` siguiendo la misma estructura que `corregirExamenes()`. Incluir clases de análisis, diagramas de colaboración y secuencia, flujos, navegación, estados y trazabilidad. Luego iterar para validar contra el contexto del proyecto.

**Resultado:**
- Creado `documents/analisis/generarExamenes/README.md` con análisis completo (BCE con 4 entidades: BateriaDePreguntas, Examen, Pregunta, ExamenesRepository)
- Creados `modelosUML/analisis/generarExamenes/colaboracion.puml` y `secuencia.puml`
- Generados SVGs vía PlantUML server (`images/analisis/generarExamenes/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** En la iteración se corrigieron 3 issues: (1) destinos de "Salir" apuntaban a `SISTEMA_DISPONIBLE`/`ASIGNATURA_ABIERTO` cuando deberían ir a `EXAMENES_GENERADOS`/`EXAMENES_GENERADOS_CONTEXTUALES` (el `[*]` interno sale al estado externo), (2) misma corrección en tabla de requisitos y transiciones de estados, (3) añadida sección "Trazabilidad con la Implementación" faltante (controlador, servicio, DTO, vista, modelos BD).

---

## [21:33] Análisis de importarConfiguracionGlobal() + iteración de revisión

**Prompt:** Crear el análisis RUP (BCE) de `importarConfiguracionGlobal()` siguiendo la misma estructura que los anteriores. Incluir clases de análisis, diagramas de colaboración y secuencia, flujos, navegación, estados y trazabilidad. Luego iterar para validar contra el contexto del proyecto.

**Resultado:**
- Creado `documents/analisis/importarConfiguracionGlobal/README.md` con análisis completo (BCE con controller propio: ConfiguracionController, y 4 entidades: Grado, Asignatura, Alumno, Pregunta)
- Creados `modelosUML/analisis/importarConfiguracionGlobal/colaboracion.puml` y `secuencia.puml` (importación batch)
- Generados SVGs vía PlantUML server (`images/analisis/importarConfiguracionGlobal/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** En la iteración se corrigieron 2 issues: (1) flujo de cancelación mencionaba "o sale a SISTEMA_DISPONIBLE" que no existe en el state diagram (cancelación siempre vuelve a ProvidingGlobalConfiguration), (2) entidad Pregunta no mencionaba relación con Respuesta (tiene respuestas[] en el schema y el flujo paso 10 dice "con sus respuestas"). El análisis refleja que el caso de uso está priorizado como #3 pero no implementado.

---

## [21:52] Análisis de exportarConfiguracionGlobal() + iteración de revisión

**Prompt:** Crear el análisis RUP (BCE) de `exportarConfiguracionGlobal()` siguiendo la misma estructura que `importarConfiguracionGlobal()`. Incluir clases de análisis, diagramas de colaboración y secuencia, flujos, navegación, estados y trazabilidad. Luego iterar para validar contra el contexto del proyecto.

**Resultado:**
- Creado `documents/analisis/exportarConfiguracionGlobal/README.md` con análisis completo (mismo ConfiguracionController, operación inversa: lectura batch + compilación de archivo)
- Creados `modelosUML/analisis/exportarConfiguracionGlobal/colaboracion.puml` y `secuencia.puml`
- Generados SVGs vía PlantUML server (`images/analisis/exportarConfiguracionGlobal/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Análisis validado sin correcciones. Se verificaron estados, transiciones, wireframes (error export solo tiene "Volver a exportar" sin Cancel, a diferencia de import), sub-operaciones con `<<include>>`, y entidades contra schema de Prisma. Todo correcto.

---

## [10:06] Añadir comando /review con prompt de Clean Code

**Prompt:** Añadir un comando /review que use el prompt de sistema de Clean Code (nombrado, comentarios, formato, YAGNI, DRY, código muerto) más una regla de mínima intervención para no modificar código al revisar.

**Resultado:** Creado `opencode.json` en la raíz con el comando `review` configurado. El prompt incluye todas las reglas de Clean Code y el "Principio de Mínima Intervención" (regla 5: no modificar código al revisar a menos que se pida refactorización explícita).

**Decisión:** Se aceptó crear el archivo `opencode.json` con el comando.

---

## [10:08] Análisis RUP de importarAlumnos() + iteración de revisión

**Prompt:** Analizar el siguiente caso de uso según la priorización: `importarAlumnos()` (#5). Crear análisis RUP (BCE), diagramas de colaboración y secuencia, SVGs, y actualizar el índice. Luego iterar para validar contra el contexto del proyecto.

**Resultado:**
- Creado `documents/analisis/importarAlumnos/README.md` con análisis completo (BCE con ImportarAlumnosView, AlumnosController, AlumnosRepository, Alumno, Grado)
- Creados `modelosUML/analisis/importarAlumnos/colaboracion.puml` y `secuencia.puml`
- Generados SVGs vía kroki.io (`images/analisis/importarAlumnos/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** En la iteración se corrigieron 3 issues: (1) separación de validación sintáctica (Controller) vs semántica (Repository), (2) flujo de error con reintento ("Importar alumnos") contemplado según el prototipo, (3) tabla de navegación con reintento y cancel desde error. Diagrama de colaboración ajustado en orden de mensajes (validación antes de creación). Todo validado contra el diagrama detallado, prototipos de interfaz y schema Prisma.

---

## [10:18] Análisis RUP de importarPreguntas()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `importarPreguntas()` (#6). Crear análisis RUP (BCE) siguiendo el mismo patrón que importarAlumnos(), con diagramas de colaboración y secuencia, SVGs, y actualizar el índice.

**Resultado:**
- Creado `documents/analisis/importarPreguntas/README.md` con análisis completo (BCE con ImportarPreguntasView, PreguntasController, PreguntasRepository, Pregunta, Respuesta, BateriaDePreguntas)
- Creados `modelosUML/analisis/importarPreguntas/colaboracion.puml` y `secuencia.puml`
- Generados SVGs vía kroki.io (`images/analisis/importarPreguntas/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó el análisis. En la iteración de revisión se corrigieron 2 issues: (1) el flujo de error en el diagrama de secuencia mezclaba validación sintáctica (Controller) con semántica (Repository), se separaron correctamente; (2) la responsabilidad "validar datos obligatorios" del Repository era ambigua y se reemplazó por "validar que cada pregunta tenga al menos una respuesta correcta". El análisis es correcto y está alineado con el diagrama detallado, los prototipos y la implementación existente.

---

## [10:25] Análisis RUP de exportarAlumnos()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `exportarAlumnos()` (#7, Abstracto). Crear análisis RUP (BCE) considerando que es sub-operación de `exportarConfiguracionGlobal()`, sin interacción directa con el actor.

**Resultado:**
- Creado `documents/analisis/exportarAlumnos/README.md` con análisis adaptado para caso de uso abstracto (sin capa de vista)
- Creados `modelosUML/analisis/exportarAlumnos/colaboracion.puml` y `secuencia.puml` (solo Control + Entidad, sin Boundary ni Actor)
- Generados SVGs vía kroki.io (`images/analisis/exportarAlumnos/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. En la iteración de revisión se corrigieron 4 issues: (1) diagrama de colaboración separaba Alumno y Grado en dos consultas — unificado en una sola, (2) self-message "compila" eliminado porque pertenece al caso de uso padre, (3) mismo cambio en diagrama de secuencia, (4) trazabilidad aclarada: el análisis usa ConfiguracionRepository pero la implementación real es AlumnosService.findAll().

---

## [15:29] Análisis RUP de exportarPreguntas()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `exportarPreguntas()` (#8, Abstracto). Crear análisis RUP (BCE) siguiendo el mismo patrón que `exportarAlumnos()`, considerando que es sub-operación de `exportarConfiguracionGlobal()`, sin interacción directa con el actor.

**Resultado:**
- Creado `documents/analisis/exportarPreguntas/README.md` con análisis adaptado para caso de uso abstracto (sin capa de vista), con entidades Pregunta, Respuesta y BateriaDePreguntas
- Creados `modelosUML/analisis/exportarPreguntas/colaboracion.puml` y `secuencia.puml` (solo Control + Entidad, sin Boundary ni Actor)
- Creado directorio `images/analisis/exportarPreguntas/` para SVGs (pendiente de generar)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó el análisis. En la iteración de revisión se corrigió 1 issue: los diagramas de colaboración y secuencia separaban `Respuesta` y `BateriaDePreguntas` en llamadas independientes, pero la implementación real (`PreguntasService.findAll()` con `include`) es una sola consulta. Se unificó en una sola interacción con `Pregunta`, siguiendo el mismo patrón que `exportarAlumnos`. Las entidades `Respuesta` y `BateriaDePreguntas` se mantienen documentadas en el README (igual que `Grado` en `exportarAlumnos`) pero no aparecen en los diagramas.

---

## [15:32] Análisis RUP de asignarExamenes()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `asignarExamenes()` (#9, Docente). Crear análisis RUP (BCE) siguiendo la misma estructura que `corregirExamenes()`, con entrada dual desde listado de exámenes generados (global y contextual).

**Resultado:**
- Creado `documents/analisis/asignarExamenes/README.md` con análisis completo (BCE: AsignarExamenesView, ExamenesController, ExamenesRepository, Examen, AlumnoExamen, Alumno)
- Creados `modelosUML/analisis/asignarExamenes/colaboracion.puml` y `secuencia.puml`
- Creado directorio `images/analisis/asignarExamenes/` para SVGs (pendiente de generar)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. El análisis incluye: entrada dual (EXAMENES_GENERADOS / EXAMENES_GENERADOS_CONTEXTUALES), flujo con selección de alumnos por grado y búsqueda, generación de hash SHA-256 por alumno (coincide con la implementación real en `ExamenesService.asignar()`), actualización de estado GENERADO → ASIGNADO, y almacenamiento de clave de corrección. La trazabilidad apunta a `POST /examenes/asignar` con `AsignarExamenesDto`.

---

## [15:39] Análisis RUP de crearPregunta()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `crearPregunta()` (#10, Docente). Crear análisis RUP (BCE) siguiendo la misma estructura que los anteriores, con entrada dual desde listado de preguntas (global y contextual).

**Resultado:**
- Creado `documents/analisis/crearPregunta/README.md` con análisis completo (BCE: CrearPreguntaView, PreguntasController, PreguntasRepository, Pregunta, BateriaDePreguntas)
- Creados `modelosUML/analisis/crearPregunta/colaboracion.puml` y `secuencia.puml`
- Generados SVGs vía plantuml.com con plantuml-encoder (`images/analisis/crearPregunta/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. En la iteración de revisión se corrigieron 4 issues: (1) transición de cancelación movida de `SolicitandoDatosPregunta` → `ProcesandoCreacion` (el state diagram la saca del `[*]` del submachine), (2) descripción de `SolicitandoDatosPregunta` ya no incluye "muestra formulario" (se muestra en la transición), (3) descripción de `ProcesandoCreacion` actualizada con presentación del formulario y opciones crear/cancelar, (4) `colaboracion.puml`: `existe / no encontrada` → solo `existe`. El análisis refleja el flujo simplificado del caso de uso (solo 2 estados), con salida dual a PREGUNTA_ABIERTO/PREGUNTA_CONTEXTUAL_ABIERTO (transición a editarPregunta) o cancelación al listado. La trazabilidad apunta a `POST /preguntas` con `CreatePreguntaDto`, ya implementado en `PreguntasService.create()`.

---

## [15:45] Análisis RUP de editarPregunta()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `editarPregunta()` (#11, Docente). Crear análisis RUP (BCE) siguiendo la misma estructura que `crearPregunta()`, con entrada múltiple desde listados de preguntas/respuestas y vista de pregunta.

**Resultado:**
- Creado `documents/analisis/editarPregunta/README.md` con análisis completo (BCE: EditarPreguntaView, PreguntasController, PreguntasRepository, Pregunta, BateriaDePreguntas, Respuesta)
- Creados `modelosUML/analisis/editarPregunta/colaboracion.puml` y `secuencia.puml`
- Generados SVGs vía plantuml.com con plantuml-encoder (`images/analisis/editarPregunta/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. El análisis cubre los 6 orígenes de entrada (preguntas/respuestas global y contextual, vista de pregunta), las 4 salidas diferenciadas (guardar → PREGUNTA_ABIERTO2, cancelar → PREGUNTAS_ABIERTO2, eliminar → PREGUNTAS_ABIERTO3, ver respuestas → RESPUESTAS_ABIERTO2), y los 2 estados internos (EditandoDatos → GuardandoDatos con loop de modificación). La trazabilidad apunta a `PATCH /preguntas/:id` con `UpdatePreguntaDto` y `DELETE /preguntas/:id`, ya implementados en `PreguntasService.update()` y `PreguntasService.remove()`. Me aseguré de que el flujo de carga previa (findOne antes de update/remove) quedara reflejado, y de que la entidad Respuesta apareciera documentada aunque en el diagrama de colaboración se unifica con Pregunta (incluida en la misma consulta). Las salidas con sufijo 2/3 quedaron alineadas con las del state diagram.

---

## [15:50] Análisis RUP de editarAsignatura()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `editarAsignatura()` (#12, Docente). Crear análisis RUP (BCE) siguiendo la misma estructura que `editarPregunta()`, con entrada múltiple desde listado de asignaturas, vista de asignatura, preguntas contextuales y exámenes asignados contextuales.

**Resultado:**
- Creado `documents/analisis/editarAsignatura/README.md` con análisis completo (BCE: EditarAsignaturaView, AsignaturasController, AsignaturasRepository, Asignatura, Grado, Alumno, BateriaDePreguntas)
- Creados `modelosUML/analisis/editarAsignatura/colaboracion.puml` y `secuencia.puml`
- Generados SVGs vía plantuml.com con plantuml-encoder (`images/analisis/editarAsignatura/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. El análisis cubre los 4 orígenes de entrada (ASIGNATURAS_ABIERTO, ASIGNATURA_ABIERTO, PREGUNTAS_CONTEXTUALES_ABIERTO, EXAMENES_ASIGNADOS_CONTEXTUALES), las 5 salidas diferenciadas (guardar → ASIGNATURA_ABIERTO2, cancelar → ASIGNATURAS_ABIERTO2, eliminar → ASIGNATURAS_ABIERTO1, ver preguntas → PREGUNTAS_CONTEXTUALES_ABIERTO1, generar examen → EXAMENES_GENERADOS_CONTEXTUALES), y los 2 estados internos (EditandoDatos → GuardandoDatos con loop de modificación). Me aseguré de que las entidades de soporte (Grado, Alumno, BateriaDePreguntas) quedaran documentadas en el README pero no en los diagramas (se unifican en la consulta a Asignatura), y de que los sufijos de las salidas (ABIERTO1, ABIERTO2) coincidieran con el state diagram. La trazabilidad apunta a `PATCH /asignaturas/:id` con `UpdateAsignaturaDto` y `DELETE /asignaturas/:id`, ya implementados en `AsignaturasService.update()` y `AsignaturasService.remove()`.

---

## [15:58] Análisis RUP de crearDocente()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `crearDocente()` (#13, Administrador institucional). Crear análisis RUP (BCE) siguiendo la misma estructura que `crearPregunta()`, adaptado al actor Administrador institucional con entrada única desde el listado de docentes.

**Resultado:**
- Creado `documents/analisis/crearDocente/README.md` con análisis completo (BCE: CrearDocenteView, ProfesoresController, ProfesoresRepository, Profesor)
- Creados `modelosUML/analisis/crearDocente/colaboracion.puml` y `secuencia.puml`
- Generados SVGs vía plantuml.com con plantuml-encoder (`images/analisis/crearDocente/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. El análisis sigue el mismo patrón de creación simple que `crearPregunta()`, con entrada única desde DOCENTES_ABIERTO, salida dual (DOCENTE_ABIERTO con transición a editarDocente, o cancelación a DOCENTES_ABIERTO2), y 2 estados internos (SolicitandoDatos → CreandoDocente). Me aseguré de que el hashing de contraseña con bcrypt quedara reflejado como responsabilidad del controlador (paso 6 del flujo principal y nota en colaboracion.puml), y de que la entidad se llame Profesor (nombre del modelo en Prisma) aunque el caso de uso use el término Docente. La trazabilidad apunta a `POST /profesores` con `CreateProfesorDto`, ya implementado en `ProfesoresService.create()`.

---

## [16:01] Análisis RUP de crearAlumno()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `crearAlumno()` (#14, Docente). Crear análisis RUP (BCE) siguiendo la misma estructura que `crearDocente()`, con entrada única desde el listado de alumnos.

**Resultado:**
- Creado `documents/analisis/crearAlumno/README.md` con análisis completo (BCE: CrearAlumnoView, AlumnosController, AlumnosRepository, Alumno, Grado)
- Creados `modelosUML/analisis/crearAlumno/colaboracion.puml` y `secuencia.puml`
- Generados SVGs vía plantuml.com con plantuml-encoder (`images/analisis/crearAlumno/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. El análisis sigue el mismo patrón de creación simple que `crearDocente()`, con entrada única desde ALUMNOS_ABIERTO, salida dual (ALUMNO_ABIERTO con transición a editarAlumno, o cancelación a ALUMNOS_ABIERTO2), y 2 estados internos (SolicitandoDatos → CreandoAlumno). A diferencia de crearDocente, incluye verificación de existencia del Grado (FK a gradoId) antes de persistir, reflejada en los diagramas con un paso 3. La trazabilidad apunta a `POST /alumnos` con `CreateAlumnoDto`, ya implementado en `AlumnosService.create()`.

---

## [16:15] Análisis RUP de editarDocente()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `editarDocente()` (#15, Administrador institucional). Crear análisis RUP (BCE) siguiendo la misma estructura que `editarAsignatura()`, con entrada dual desde listado de docentes y vista de docente.

**Resultado:**
- Creado `documents/analisis/editarDocente/README.md` con análisis completo (BCE: EditarDocenteView, ProfesoresController, ProfesoresService, Profesor)
- Creados `modelosUML/analisis/editarDocente/colaboracion.puml` y `secuencia.puml`
- Generados SVGs vía kroki.io (`images/analisis/editarDocente/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. El análisis sigue el mismo patrón de edición que `editarAsignatura()`, con entrada dual (DOCENTES_ABIERTO, DOCENTE_ABIERTO), salida triple (DOCENTE_ABIERTO2, DOCENTES_ABIERTO2, DOCENTES_ABIERTO3), y 2 estados internos (EditandoDatos → GuardandoDatos con loop de modificación). Se refleja el hashing de contraseña con bcrypt como responsabilidad del servicio (paso 9 del flujo principal y nota en colaboracion.puml). La entidad se denomina `Profesor` en la implementación (Prisma/NestJS) aunque el caso de uso use el término Docente. La trazabilidad apunta a `PATCH /profesores/:id` con `UpdateProfesorDto` y `DELETE /profesores/:id`, ya implementados en `ProfesoresService.update()` y `ProfesoresService.remove()`.

---

## [16:25] Análisis RUP de editarAlumno()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `editarAlumno()` (#16, Docente). Crear análisis RUP (BCE) siguiendo la misma estructura que `editarDocente()`, con entrada dual desde listado de alumnos y vista de alumno.

**Resultado:**
- Creado `documents/analisis/editarAlumno/README.md` con análisis completo (BCE: EditarAlumnoView, AlumnosController, AlumnosService, Alumno, Grado)
- Creados `modelosUML/analisis/editarAlumno/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/editarAlumno/`)
- Actualizado `documents/analisis/README.md` (indice)

**Decision:** Se acepto. El analisis sigue el mismo patron de edicion que `editarDocente()`, con entrada dual (ALUMNOS_ABIERTO, ALUMNO_ABIERTO), salida triple (ALUMNOS_ABIERTO2, ALUMNOS_ABIERTO3, ALUMNOS_ABIERTO4), y 2 estados internos (EditandoDatos -> GuardandoDatos con loop de modificacion). La trazabilidad apunta a `PATCH /alumnos/:id` con `UpdateAlumnoDto` y `DELETE /alumnos/:id`, ya implementados en `AlumnosService.update()` y `AlumnosService.remove()`. Se incluye Grado como entidad de soporte al igual que en `crearAlumno`.

---

## [16:35] Análisis RUP de crearGrado()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `crearGrado()` (#17, Docente). Crear análisis RUP (BCE) siguiendo la misma estructura que `crearDocente()`, con entrada única desde el listado de grados.

**Resultado:**
- Creado `documents/analisis/crearGrado/README.md` con análisis completo (BCE: CrearGradoView, GradosController, GradosService, Grado)
- Creados `modelosUML/analisis/crearGrado/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/crearGrado/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. El análisis sigue el mismo patrón de creación simple que `crearDocente()`, con entrada única desde GRADOS_ABIERTO, salida dual (GRADO_ABIERTO con transición a editarGrado, o cancelación a GRADOS_ABIERTO2), y 2 estados internos (SolicitandoDatosGrado → CreandoGrado). La trazabilidad apunta a `POST /grados` con `CreateGradoDto`, implementado en `GradosService.create()`.

---

## [16:45] Análisis RUP de crearAsignatura()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `crearAsignatura()` (#18, Docente). Crear análisis RUP (BCE) siguiendo la misma estructura que `crearGrado()`, con entrada única desde el listado de asignaturas.

**Resultado:**
- Creado `documents/analisis/crearAsignatura/README.md` con análisis completo (BCE: CrearAsignaturaView, AsignaturasController, AsignaturasService, Asignatura, Grado, BateriaDePreguntas)
- Creados `modelosUML/analisis/crearAsignatura/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/crearAsignatura/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. El análisis sigue el mismo patrón de creación simple que `crearGrado()`, con entrada única desde ASIGNATURAS_ABIERTO, salida dual (ASIGNATURA_ABIERTO con transición a editarAsignatura, o cancelación a ASIGNATURAS_ABIERTO2), y 2 estados internos (SolicitandoDatosAsignatura → CreandoAsignatura). Se documenta que la creación incluye la batería de preguntas según el state diagram. La trazabilidad apunta a `POST /asignaturas` con `CreateAsignaturaDto`, implementado en `AsignaturasService.create()`.

---

## [16:55] Análisis RUP de editarGrado()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `editarGrado()` (#19, Docente). Crear análisis RUP (BCE) siguiendo la misma estructura que `editarAlumno()`, con entrada dual desde vista de grado y listado de grados.

**Resultado:**
- Creado `documents/analisis/editarGrado/README.md` con análisis completo (BCE: EditarGradoView, GradosController, GradosService, Grado)
- Creados `modelosUML/analisis/editarGrado/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/editarGrado/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. El análisis sigue el mismo patrón de edición que `editarAlumno()`, con entrada dual (GRADO_ABIERTO, GRADOS_ABIERTO), salida triple (GRADO_ABIERTO2, GRADOS_ABIERTO2, GRADOS_ABIERTO3), y 2 estados internos (EditandoDatos → GuardandoDatos con loop de modificación). La trazabilidad apunta a `PATCH /grados/:id` con `UpdateGradoDto` y `DELETE /grados/:id`, implementados en `GradosService.update()` y `GradosService.remove()`.

---

## [20:05] Análisis RUP de verPreguntas()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `verPreguntas()` (#20, Docente). Es el primer caso de uso de tipo "visualización" (ver/listar). Crear análisis RUP (BCE) adaptado a un flujo de solo lectura con filtros.

**Resultado:**
- Creado `documents/analisis/verPreguntas/README.md` con análisis completo (BCE: VerPreguntasView, PreguntasController, PreguntasService, Pregunta, BateriaDePreguntas)
- Creados `modelosUML/analisis/verPreguntas/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/verPreguntas/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. El análisis se adaptó al patrón de visualización: entrada cuádruple (ASIGNATURA_ABIERTO, SISTEMA_DISPONIBLE, PREGUNTA_CONTEXTUAL_ABIERTO, PREGUNTA_ABIERTO), 2 estados internos (MostrandoPreguntas → FiltrandoPreguntas con auto-loop de filtrado), y salida contextual dual (PREGUNTAS_ABIERTO, PREGUNTAS_CONTEXTUALES_ABIERTO). Sin flujo de persistencia — solo consultas con filtros. La trazabilidad apunta a `GET /preguntas` con query params (tema, dificultad, bateriaId), implementado en `PreguntasService.findAll()`.

---

## [20:15] Análisis RUP de verAsignaturas()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `verAsignaturas()` (#21, Docente). Crear análisis RUP (BCE) siguiendo el mismo patrón de visualización que `verPreguntas()`, adaptado para asignaturas.

**Resultado:**
- Creado `documents/analisis/verAsignaturas/README.md` con análisis completo (BCE: VerAsignaturasView, AsignaturasController, AsignaturasService, Asignatura)
- Creados `modelosUML/analisis/verAsignaturas/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/verAsignaturas/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. El análisis sigue el mismo patrón de visualización que `verPreguntas()`, con entrada dual (SISTEMA_DISPONIBLE, ASIGNATURA_ABIERTO), 2 estados internos (MostrandoAsignaturas → FiltrandoAsignaturas con auto-loop), y salida única a ASIGNATURAS_ABIERTO. La trazabilidad apunta a `GET /asignaturas` implementado en `AsignaturasService.findAll()`.

---

## [20:20] Análisis RUP de verGrados()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `verGrados()` (#22, Docente). Crear análisis RUP (BCE) siguiendo el mismo patrón de visualización que `verAsignaturas()`.

**Resultado:**
- Creado `documents/analisis/verGrados/README.md` con análisis completo (BCE: VerGradosView, GradosController, GradosService, Grado)
- Creados `modelosUML/analisis/verGrados/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/verGrados/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. El análisis sigue el mismo patrón de visualización que `verAsignaturas()`, con entrada dual (SISTEMA_DISPONIBLE, GRADO_ABIERTO), 2 estados internos (MostrandoGrados → FiltrandoGrados con auto-loop), y salida única a GRADOS_ABIERTO. La trazabilidad apunta a `GET /grados` implementado en `GradosService.findAll()`.

---

## [20:25] Análisis RUP de verAlumnos()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `verAlumnos()` (#23, Docente). Crear análisis RUP (BCE) siguiendo el patrón de visualización.

**Resultado:**
- Creado `documents/analisis/verAlumnos/README.md` con análisis completo (BCE: VerAlumnosView, AlumnosController, AlumnosService, Alumno)
- Creados `modelosUML/analisis/verAlumnos/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/verAlumnos/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. El análisis sigue el patrón de visualización con entrada dual (SISTEMA_DISPONIBLE, ALUMNO_ABIERTO), 2 estados internos (MostrandoAlumnos → FiltrandoAlumnos), y salida única a ALUMNOS_ABIERTO. Trazabilidad: `GET /alumnos` con `AlumnosService.findAll()`.

---

## [20:50] Análisis RUP de verDocentes()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `verDocentes()` (#24, Administrador institucional). Crear análisis RUP (BCE).

**Resultado:**
- Creado `documents/analisis/verDocentes/README.md` con análisis completo (BCE: VerDocentesView, ProfesoresController, ProfesoresService, Profesor)
- Creados `modelosUML/analisis/verDocentes/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/verDocentes/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. Mismo patrón de visualización con entrada dual (SISTEMA_DISPONIBLE, DOCENTE_ABIERTO), 2 estados internos (MostrandoDocentes → FiltrandoDocentes), salida única a DOCENTES_ABIERTO. Trazabilidad: `GET /profesores` con `ProfesoresService.findAll()` (`omit: { password: true }`).

---

## [20:52] Análisis RUP de eliminarPregunta()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `eliminarPregunta()` (#25, Docente). Crear análisis RUP (BCE).

**Resultado:**
- Creado `documents/analisis/eliminarPregunta/README.md` con análisis completo (BCE: EliminarPreguntaView, PreguntasController, PreguntasService, Pregunta)
- Creados `modelosUML/analisis/eliminarPregunta/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/eliminarPregunta/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. El análisis cubre entrada dual (PREGUNTAS_ABIERTO, PREGUNTAS_CONTEXTUALES_ABIERTO), 2 estados internos (ConfirmandoEliminacion → EliminandoPregunta), y salida cuádruple (listados actualizados o cancelación). Trazabilidad: `DELETE /preguntas/:id` con `PreguntasService.remove()` (verifica existencia vía `findOne()` antes de eliminar).

---

## [20:55] Análisis RUP de eliminarAsignatura()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `eliminarAsignatura()` (#26, Docente). Crear análisis RUP (BCE).

**Resultado:**
- Creado `documents/analisis/eliminarAsignatura/README.md` con análisis completo (BCE: EliminarAsignaturaView, AsignaturasController, AsignaturasService, Asignatura)
- Creados `modelosUML/analisis/eliminarAsignatura/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/eliminarAsignatura/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. Mismo patrón que eliminarPregunta, con entrada dual (ASIGNATURAS_ABIERTO, ASIGNATURA_ABIERTO), 2 estados internos (ConfirmandoEliminacion → EliminandoAsignatura), y salida triple (ASIGNATURAS_ABIERTO2 confirmado, ASIGNATURAS_ABIERTO3/4 cancelación). Trazabilidad: `DELETE /asignaturas/:id` con `AsignaturasService.remove()`.

---

## [20:56] Análisis RUP de eliminarGrado()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `eliminarGrado()` (#27, Docente). Crear análisis RUP (BCE).

**Resultado:**
- Creado `documents/analisis/eliminarGrado/README.md` con análisis completo (BCE: EliminarGradoView, GradosController, GradosService, Grado)
- Creados `modelosUML/analisis/eliminarGrado/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/eliminarGrado/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. Mismo patrón que eliminarAsignatura, con entrada dual (GRADOS_ABIERTO, GRADO_ABIERTO), 2 estados internos (ConfirmandoEliminacion → EliminandoGrado), y salida triple (GRADOS_ABIERTO2 confirmado, GRADOS_ABIERTO3/4 cancelación). Trazabilidad: `DELETE /grados/:id` con `GradosService.remove()`.

---

## [20:58] Análisis RUP de eliminarAlumno()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `eliminarAlumno()` (#28, Docente). Crear análisis RUP (BCE).

**Resultado:**
- Creado `documents/analisis/eliminarAlumno/README.md` con análisis completo (BCE: EliminarAlumnoView, AlumnosController, AlumnosService, Alumno)
- Creados `modelosUML/analisis/eliminarAlumno/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/eliminarAlumno/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. Mismo patrón de eliminación, con entrada dual (ALUMNOS_ABIERTO, ALUMNO_ABIERTO), 2 estados internos (ConfirmandoEliminacion → EliminandoAlumno), y salida triple (ALUMNOS_ABIERTO2 confirmado, ALUMNOS_ABIERTO3/4 cancelación). Trazabilidad: `DELETE /alumnos/:id` con `AlumnosService.remove()`.

---

## [20:59] Análisis RUP de eliminarDocente()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `eliminarDocente()` (#29, Administrador institucional). Crear análisis RUP (BCE).

**Resultado:**
- Creado `documents/analisis/eliminarDocente/README.md` con análisis completo (BCE: EliminarDocenteView, ProfesoresController, ProfesoresService, Profesor)
- Creados `modelosUML/analisis/eliminarDocente/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/eliminarDocente/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. Mismo patrón de eliminación, con actor Administrador institucional, entrada dual (DOCENTES_ABIERTO, DOCENTE_ABIERTO), 2 estados internos (ConfirmandoEliminacion → EliminandoDocente), y salida triple (DOCENTES_ABIERTO2 confirmado, DOCENTES_ABIERTO3/4 cancelación). Trazabilidad: `DELETE /profesores/:id` con `ProfesoresService.remove()`.

---

## [21:00] Análisis RUP de iniciarSesion()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `iniciarSesion()` (#30, Docente y Administrador institucional). Crear análisis RUP (BCE).

**Resultado:**
- Creado `documents/analisis/iniciarSesion/README.md` con análisis completo (BCE: LoginView, AuthController, AuthService, Profesor, AuthStore)
- Creados `modelosUML/analisis/iniciarSesion/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/iniciarSesion/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. Primer caso de uso de autenticación, con actor UsuarioNoRegistrado, entrada única desde SESION_CERRADA, 3 estados internos (SolicitandoAcceso → ProporcionandoCredenciales → ValidandoCredenciales con loop por credenciales inválidas), y salida única a SISTEMA_DISPONIBLE. Se incluye AuthStore (Pinia) como clase de análisis para persistencia del token. Trazabilidad: `POST /auth/login` con `AuthService.login()` (bcrypt + JWT).

---

## [21:01] Análisis RUP de cerrarSesion()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `cerrarSesion()` (#31, Docente y Administrador institucional). Crear análisis RUP (BCE).

**Resultado:**
- Creado `documents/analisis/cerrarSesion/README.md` con análisis completo (BCE: CerrarSesionView, AuthStore)
- Creados `modelosUML/analisis/cerrarSesion/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/cerrarSesion/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. Caso de uso simple (solo vista + store, sin controller ni backend), con entrada única desde SISTEMA_DISPONIBLE, 2 estados internos (SolicitandoCierre → ConfirmandoCierre con choice confirmar/cancelar), y salida dual (SESION_CERRADA o SISTEMA_DISPONIBLE). Trazabilidad: `AuthStore.logout()` elimina token de localStorage. No requiere endpoint REST.

---

## [21:02] Análisis RUP de completarGestion()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `completarGestion()` (#32, Docente y Administrador institucional). Crear análisis RUP (BCE).

**Resultado:**
- Creado `documents/analisis/completarGestion/README.md` con análisis completo (BCE: DashboardView, AuthStore)
- Creados `modelosUML/analisis/completarGestion/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/completarGestion/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. Caso de uso central (dashboard/menú principal), con 7 orígenes de entrada (todos los listados del sistema), 1 estado interno (PresentandoOpciones), y salida única a SISTEMA_DISPONIBLE. El menú se adapta según el rol (AuthStore). Trazabilidad: `DashboardView.vue` y router.

---

## [21:03] Análisis RUP de verRespuestas()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `verRespuestas()` (#33, Docente). Crear análisis RUP (BCE).

**Resultado:**
- Creado `documents/analisis/verRespuestas/README.md` con análisis completo (BCE: VerRespuestasView, RespuestasController, RespuestasService, Respuesta)
- Creados `modelosUML/analisis/verRespuestas/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/verRespuestas/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. Patrón de visualización con 4 orígenes de entrada (PREGUNTA_ABIERTO, RESPUESTA_ABIERTO, PREGUNTA_CONTEXTUAL_ABIERTO, RESPUESTA_CONTEXTUAL_ABIERTO), 2 estados internos (MostrandoRespuestas → FiltrandoRespuestas), y salida dual contextual (RESPUESTAS_ABIERTO, RESPUESTAS_CONTEXTUALES_ABIERTO). Trazabilidad: `GET /respuestas/pregunta/:preguntaId` con `RespuestasService.findByPregunta()`.

---

## [21:04] Análisis RUP de crearRespuesta()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `crearRespuesta()` (#34, Docente). Crear análisis RUP (BCE).

**Resultado:**
- Creado `documents/analisis/crearRespuesta/README.md` con análisis completo (BCE: CrearRespuestaView, RespuestasController, RespuestasService, Respuesta)
- Creados `modelosUML/analisis/crearRespuesta/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/crearRespuesta/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. Patrón de creación simple con entrada dual (RESPUESTAS_ABIERTO, RESPUESTAS_CONTEXTUALES_ABIERTO), 2 estados internos (SolicitandoDatosRespuesta → ProcesandoCreacion), y salida cuádruple (a editar o cancelación). Incluye regla de negocio: máximo 5 respuestas por pregunta. Trazabilidad: `POST /respuestas` con `RespuestasService.create()`.

---

## [21:05] Análisis RUP de editarRespuesta()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `editarRespuesta()` (#35, Docente). Crear análisis RUP (BCE).

**Resultado:**
- Creado `documents/analisis/editarRespuesta/README.md` con análisis completo (BCE: EditarRespuestaView, RespuestasController, RespuestasService, Respuesta)
- Creados `modelosUML/analisis/editarRespuesta/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/editarRespuesta/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. Patrón de edición con 4 orígenes de entrada, 2 estados internos (EditandoDatos ⇄ GuardandoDatos con loop de modificación), y salida séxtuple (guardar, cancelar, eliminar desde contexto global o contextual). Trazabilidad: `PATCH /respuestas/:id` con `RespuestasService.update()` y `DELETE /respuestas/:id` con `RespuestasService.remove()`.

---

## [21:06] Análisis RUP de eliminarRespuesta()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `eliminarRespuesta()` (#36, Docente). Crear análisis RUP (BCE).

**Resultado:**
- Creado `documents/analisis/eliminarRespuesta/README.md` con análisis completo (BCE: EliminarRespuestaView, RespuestasController, RespuestasService, Respuesta)
- Creados `modelosUML/analisis/eliminarRespuesta/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/eliminarRespuesta/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. Mismo patrón de eliminación, con entrada dual (RESPUESTAS_ABIERTO, RESPUESTAS_CONTEXTUALES_ABIERTO), 2 estados internos (ConfirmandoEliminacion → EliminandoRespuesta), y salida cuádruple (listados actualizados o cancelación). Trazabilidad: `DELETE /respuestas/:id` con `RespuestasService.remove()`.

---

## [21:07] Análisis RUP de cancelarGeneracion()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `cancelarGeneracion()` (#37, Docente). Crear análisis RUP (BCE).

**Resultado:**
- Creado `documents/analisis/cancelarGeneracion/README.md` con análisis completo (BCE: CancelarGeneracionView, ExamenesController, ExamenesService, Examen)
- Creados `modelosUML/analisis/cancelarGeneracion/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/cancelarGeneracion/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. Caso de uso de cancelación con entrada dual (EXAMENES_GENERADOS, EXAMENES_GENERADOS_CONTEXTUALES), 2 estados internos (RequiringCancelGeneration → ProvidingConfirmation), y salida cuádruple (SISTEMA_DISPONIBLE/ASIGNATURA_ABIERTO si confirma, o vuelta a listados si deniega). Nota: no existe endpoint batch dedicado; el análisis asume `DELETE /examenes/:id` por cada examen o un nuevo endpoint `POST /examenes/cancelar-generacion`.

---

## [21:08] Análisis RUP de importarAsignaturas()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `importarAsignaturas()` (#38, Docente, Abstracto). Crear análisis RUP (BCE).

**Resultado:**
- Creado `documents/analisis/importarAsignaturas/README.md` con análisis completo (BCE: AsignaturasController, AsignaturasService, Asignatura — sin Boundary por ser abstracto)
- Creados `modelosUML/analisis/importarAsignaturas/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/importarAsignaturas/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. Patrón de importación abstracto (sin vista propia), con entrada única desde ASIGNATURAS_ABIERTO, 3 estados internos (RequiringImport → ProvidingAsignaturas → ProvidingConfirmation con loop de error/cancelación y salida temprana), y salida a ASIGNATURAS_ABIERTO2. Trazabilidad: `POST /asignaturas` con `AsignaturasService.create()`.

---

## [21:09] Análisis RUP de importarGrados()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `importarGrados()` (#39, Docente, Abstracto). Crear análisis RUP (BCE).

**Resultado:**
- Creado `documents/analisis/importarGrados/README.md` con análisis completo (BCE: GradosController, GradosService, Grado — sin Boundary por ser abstracto)
- Creados `modelosUML/analisis/importarGrados/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/importarGrados/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. Mismo patrón que importarAsignaturas, con entrada única desde GRADOS_ABIERTO, 3 estados internos con loop de error/cancelación, y salida a GRADOS_ABIERTO2. Trazabilidad: `POST /grados` con `GradosService.create()`.

---

## [21:11] Análisis RUP de exportarAsignaturas()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `exportarAsignaturas()` (#40, Docente, Abstracto). Crear análisis RUP (BCE).

**Resultado:**
- Creado `documents/analisis/exportarAsignaturas/README.md` con análisis completo (BCE: AsignaturasService, Asignatura — sin Boundary ni Controller por ser abstracto)
- Creados `modelosUML/analisis/exportarAsignaturas/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/exportarAsignaturas/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. Mismo patrón que exportarAlumnos/exportarPreguntas: sub-operación de exportarConfiguracionGlobal, 2 estados internos (RequiringExport → ProvidingAsignaturas), sin vista ni controlador. Trazabilidad: `AsignaturasService.findAll()` con include.

---

## [21:12] Análisis RUP de exportarGrados()

**Prompt:** Analizar el siguiente caso de uso según la priorización: `exportarGrados()` (#41, Docente, Abstracto). Crear análisis RUP (BCE).

**Resultado:**
- Creado `documents/analisis/exportarGrados/README.md` con análisis completo (BCE: GradosService, Grado)
- Creados `modelosUML/analisis/exportarGrados/colaboracion.puml` y `secuencia.puml`
- Generados SVGs via kroki.io (`images/analisis/exportarGrados/`)
- Actualizado `documents/analisis/README.md` (índice)

**Decisión:** Se aceptó. Mismo patrón abstracto, sub-operación de exportarConfiguracionGlobal. Trazabilidad: `GradosService.findAll()`.

---

**Todos los 41 casos de uso priorizados han sido analizados.**

---

## [21:15] Diseño de corregirExamenes() — primer artefacto de diseño (RUP)

**Prompt:** Prompt muy detallado explicando exactamente cómo quería el artefacto de diseño para `corregirExamenes()`. Se especificó:

- **Estructura del documento:** información del artefacto, propósito, diagrama de secuencia de diseño con los componentes reales del sistema, código PlantUML, participantes con responsabilidades, y decisiones de diseño justificadas.
- **Participantes reales:** ExamenesView (Vue 3), ExamenesController, ExamenesService, PrismaService, BD — nada de clases genéricas ni ficticias, todo contra el código que existe.
- **Flujo del diagrama:** debía reflejar paso a paso el método `corregir()` real: validar que la asignación existe, consultar examen con preguntas y respuestas, cruzar respuestas del alumno contra las correctas, calcular nota en escala 0-10, persistir la corrección en AlumnoExamen, verificar si quedan alumnos pendientes y transicionar el estado del examen a RESUELTO o CORREGIDO según corresponda.
- **Decisiones de diseño:** cada una con su justificación técnica, extraída del análisis del código y la arquitectura del proyecto.
- **Formato reproducible:** que sirviera como plantilla para el resto de casos de uso, manteniendo coherencia en toda la fase de diseño.
- **Archivos separados:** código PlantUML en `modelosUML/diseno/`, renderizado SVG en `images/diseno/`, documento en `documents/diseno/`.

**Primera iteración — creación inicial:**
- Creada la estructura de directorios `documents/diseno/corregirExamenes/`, `modelosUML/diseno/corregirExamenes/` e `images/diseno/corregirExamenes/`.
- Escrito el diagrama de secuencia en PlantUML cubriendo el flujo completo: 3 escenarios (asignación no encontrada, asignación encontrada con corrección exitosa, transición RESUELTO vs CORREGIDO).
- Creado el README con las 8 secciones del artefacto.
- Renderizado SVG exitoso.

**Segunda iteración — corrección de enfoque:**
- Se indicó que el README del artefacto no debía incluir console.logs ni referencias informales al equipo de desarrollo. El conversation-log es el lugar para eso, no los artefactos formales. Se revirtieron esos cambios y se limpió el README dejándolo profesional.
- Se actualizó esta entrada en el log para reflejar correctamente la dinámica de trabajo.

**Resultado final:**
- `documents/diseno/corregirExamenes/README.md` — artefacto formal completo
- `modelosUML/diseno/corregirExamenes/secuencia.puml` — diagrama de secuencia fuente
- `images/diseno/corregirExamenes/secuencia.svg` — diagrama renderizado
- 8 decisiones de diseño documentadas
- El diagrama cubre: validación de asignación, consulta de examen con preguntas y respuestas, cruce de respuestas y cálculo de nota, persistencia de corrección, verificación de alumnos pendientes y transición de estado (RESUELTO vs CORREGIDO)

**Decisión:** Se aceptó el artefacto tras la iteración. Se marcó como modelo para el resto de casos de uso. La lección aprendida: los README de artefactos deben ser formales; el conversation-log es el espacio para el registro de la dinámica de trabajo.

---

## [21:20] Diseño de generarExamenes() — segundo artefacto de diseño

**Prompt:** Prompt detallado para crear el segundo artefacto de diseño siguiendo la misma plantilla que `corregirExamenes()`, pero adaptado al flujo de generación automática de exámenes. Se especificó:

- **Participantes:** los mismos que en el anterior pero con su lógica específica: ExamenesView (solapa "Generar" del formulario), ExamenesController, ExamenesService, PrismaService, BD.
- **Flujo del diagrama:** debía reflejar el método `generar()` real del servicio:
  1. Consultar la batería de preguntas filtrando por asignatura, temas seleccionados y estado HABILITADA
  2. Validar que existan preguntas suficientes
  3. Particionar las preguntas por dificultad (BAJA, MEDIA, ALTA)
  4. Calcular cuántas preguntas de cada dificultad según las proporciones indicadas
  5. Aplicar Fisher-Yates shuffle a cada pool y seleccionar las preguntas
  6. Crear N exámenes en batch, cada uno con sus preguntas asociadas mediante `prisma.examen.create()` con nested `preguntas: { create: [...] }`
  7. Manejar los errores: batería no encontrada, preguntas insuficientes
- **Decisiones de diseño:** basadas en el algoritmo real de selección, el shuffle, la creación batch, la validación de disponibilidad y el relleno de preguntas restantes.
- **Formato idéntico al anterior** para mantener coherencia.

**Primera iteración — creación:**
- Revisado el código de `ExamenesService.generar()` línea por línea para entender el algoritmo de selección por dificultad, el Fisher-Yates shuffle, el cálculo de proporciones y la creación batch.
- Revisado el `GenerarExamenesDto` para identificar todos los campos de entrada.
- Creado el diagrama de secuencia con 3 caminos (batería no encontrada, preguntas insuficientes, generación exitosa con loop).
- Creado el README con 8 decisiones de diseño.

**Resultado final:**
- `documents/diseno/generarExamenes/README.md`, `modelosUML/diseno/generarExamenes/secuencia.puml`, `images/diseno/generarExamenes/secuencia.svg`
- 8 decisiones de diseño: algoritmo por dificultad, Fisher-Yates shuffle, creación batch con loop, validación de disponibilidad, relleno de preguntas restantes, estado inicial GENERADO, lógica centralizada en servicio, seguridad por capas

**Decisión:** Se aceptó sin correcciones. La plantilla quedó validada como reproducible para el resto de casos de uso.

---

## [21:25] Diseño de importarConfiguracionGlobal() — tercer artefacto de diseño

**Prompt:** Prompt detallado para crear el artefacto de diseño de `importarConfiguracionGlobal()` siguiendo la misma plantilla, con la particularidad de que este caso de uso **no tiene implementación real** (es el #3 de priorización pero nunca se codificó). Se especificó:

- **Participantes reales propuestos:** ImportarConfigView (Vue 3), ConfiguracionController, ConfiguracionService, PrismaService, BD — siguiendo el mismo patrón de módulo NestJS que el resto del sistema.
- **Flujo del diagrama:** debía reflejar el proceso completo de importación batch:
  1. Navegación a la vista de importación desde el menú principal
  2. Carga del archivo de configuración (JSON) y previsualización de datos detectados en el frontend
  3. Confirmación por parte del usuario
  4. Envío al backend y validación del archivo (estructura, integridad referencial)
  5. Importación en orden jerárquico: primero grados, luego asignaturas (FK→grado), luego alumnos (FK→grado), por último baterías y preguntas (FK→asignatura)
  6. Uso de `createMany` con `skipDuplicates: true` para hacer la importación idempotente
  7. Manejo de errores con validación previa antes de persistir nada
- **Decisiones de diseño:** se discutió que al no tener implementación, las decisiones serían propuestas basadas en los patrones existentes del sistema. Se especificó que esto debía quedar claro en el artefacto.

**Primera iteración — creación:**
- Revisado el análisis existente para entender las entidades involucradas (Grado, Asignatura, Alumno, Pregunta, BateriaDePreguntas).
- Revisados los prototipos de interfaz para entender el flujo de la vista (carga de archivo, confirmación, resultado).
- Creado el diagrama de secuencia reflejando el orden jerárquico de importación.
- Creado el README con nota explícita de que el caso de uso no está implementado y el diseño es una propuesta.
- 8 decisiones de diseño documentadas, incluyendo el orden jerárquico, validación previa, skipDuplicates, previsualización, servicio dedicado y formato JSON.

**Resultado final:**
- `documents/diseno/importarConfiguracionGlobal/README.md`, `modelosUML/diseno/importarConfiguracionGlobal/secuencia.puml`, `images/diseno/importarConfiguracionGlobal/secuencia.svg`
- Diagrama cubre: previsualización, confirmación, validación, importación batch por entidad con createMany + skipDuplicates, manejo de error por datos inválidos
- 8 decisiones de diseño documentadas como propuesta

**Decisión:** Se aceptó. Se confirmó que el diseño es correcto como propuesta y que servirá de guía cuando se implemente el módulo `src/apps/backend/src/configuracion/`.

---

## [21:28] Diseño de exportarConfiguracionGlobal() — cuarto artefacto de diseño

**Prompt:** Prompt detallado para crear el artefacto de diseño de `exportarConfiguracionGlobal()` siguiendo la misma plantilla. Es el caso complementario a `importarConfiguracionGlobal()` — ambos sin implementar, ambos usando el mismo módulo `ConfiguracionService`. Se especificó:

- **Participantes:** los mismos que en importación: ExportarConfigView, ConfiguracionController, ConfiguracionService, PrismaService, BD.
- **Flujo del diagrama:** operación inversa a la importación:
  1. Navegación a la vista de exportación desde el menú principal
  2. Confirmación por parte del usuario antes de disparar consultas
  3. Consultas independientes: grados con asignaturas, alumnos con grado, baterías con preguntas y respuestas
  4. Compilación de todo en estructura JSON en el servicio
  5. Devolución del JSON al frontend para descarga
  6. Manejo de error de acceso a datos
- **Decisiones de diseño:** debían reflejar que es la operación espejo de importación, con el mismo servicio pero flujo inverso.
- **Nota de propuesta:** al no estar implementado, marcarlo igual que importación.

**Primera iteración — creación:**
- Revisado el análisis existente: misma estructura que importación pero con sub-operaciones `<<include>>` (exportarGrados, exportarAsignaturas, exportarAlumnos, exportarPreguntas).
- Revisados los prototipos para confirmar el flujo de UI (pantalla de confirmación → descarga).
- Creado el diagrama de secuencia con 3 consultas independientes en paralelo lógico.
- Creado el README con nota de propuesta y 8 decisiones de diseño.

**Resultado final:**
- `documents/diseno/exportarConfiguracionGlobal/README.md`, `modelosUML/diseno/exportarConfiguracionGlobal/secuencia.puml`, `images/diseno/exportarConfiguracionGlobal/secuencia.svg`
- Diagrama cubre: confirmación, consultas independientes por entidad, compilación JSON, descarga y manejo de error
- 8 decisiones de diseño documentadas como propuesta

**Decisión:** Se aceptó. La simetría con importarConfiguracionGlobal quedó validada.

---

## [21:32] Diseño de importarAlumnos() — quinto artefacto de diseño

**Prompt:** Prompt detallado para crear el artefacto de diseño de `importarAlumnos()` siguiendo la misma plantilla. Se especificó:
- **Participantes:** AlumnosView, AlumnosController, AlumnosService, PrismaService, BD — los mismos del CRUD existente pero con lógica batch adicional.
- **Flujo del diagrama:** carga de archivo CSV, previsualización en frontend, validación en dos fases (sintáctica en servicio, semántica contra BD), verificación de existencia del grado, `createMany` con `skipDuplicates`
- **Decisiones de diseño:** validación en dos fases, skipDuplicates para idempotencia, verificación de grado, formato CSV, extensión del servicio existente

**Resultado:**
- `documents/diseno/importarAlumnos/README.md`, `modelosUML/diseno/importarAlumnos/secuencia.puml`, `images/diseno/importarAlumnos/secuencia.svg`
- Diagrama cubre: previsualización, validación sintáctica, verificación de grado, importación batch con skipDuplicates, errores (datos inválidos, grado inexistente)
- 8 decisiones de diseño documentadas

**Decisión:** Se aceptó. Se discutió si el nuevo endpoint de importación masiva debía ir en `AlumnosController` existente o en un controlador separado. Se decidió mantenerlo en el mismo controlador para no multiplicar los módulos sin necesidad. También se debatió el formato del archivo: CSV vs JSON. Se optó por CSV por ser más universal para datos tabulares y más fácil de generar desde Excel. Se dejó constancia de que este diseño, a diferencia de los dos anteriores (import/export configuración global), sí podría implementarse sobre el código existente sin crear un módulo nuevo, simplemente añadiendo un método `importarAlumnos()` al `AlumnosService` actual.

---

## [21:34] Diseño de importarPreguntas() — sexto artefacto de diseño

**Prompt:** Prompt detallado para crear el artefacto de diseño de `importarPreguntas()` siguiendo la misma plantilla. Se especificó:
- **Participantes:** PreguntasView, PreguntasController, PreguntasService, PrismaService, BD
- **Flujo del diagrama:** carga de archivo JSON, previsualización, validación trifásica (sintaxis, batería, reglas de negocio), creación por pregunta con respuestas anidadas via nested create
- **Decisiones de diseño:** nested create para atomicidad, validación en tres capas, formato JSON por jerarquía pregunta→respuestas, loop transaccional por pregunta

**Resultado:**
- `documents/diseno/importarPreguntas/README.md`, `modelosUML/diseno/importarPreguntas/secuencia.puml`, `images/diseno/importarPreguntas/secuencia.svg`
- Diagrama cubre: previsualización, validación trifásica (sintaxis, batería, reglas 2-5 respuestas + 1 correcta), loop de creación con nested create
- 8 decisiones de diseño documentadas

**Decisión:** Se aceptó. Se comentó que la validación en tres capas es más estricta que en `importarAlumnos` (que solo tenía dos fases), y que esto es correcto porque las preguntas tienen más reglas de negocio que los alumnos. Se validó que el diagrama reflejara correctamente el loop y la creación anidada.

---

## [19:54] Diseño de exportarAlumnos() — séptimo artefacto de diseño

**Prompt:** Prompt detallado para crear el artefacto de diseño de `exportarAlumnos()` siguiendo la misma plantilla. Es un caso abstracto (sub-operación de `exportarConfiguracionGlobal()`), sin interacción directa con el actor.

- **Participantes:** ExportarConfigView, AlumnosController, AlumnosService, PrismaService, BD — reutilizando el endpoint `GET /alumnos` existente con `include: { grado: true }`.
- **Flujo del diagrama:** el caso padre invoca la exportación, se consulta Alumno con relación a Grado, se devuelve el array para compilación en el frontend.
- **Decisiones de diseño:** caso abstracto sin vista propia, reutilización de endpoint existente, include con JOIN automático, compilación en frontend.

**Resultado:**
- `documents/diseno/exportarAlumnos/README.md`, `modelosUML/diseno/exportarAlumnos/secuencia.puml`, `images/diseno/exportarAlumnos/secuencia.svg`
- Diagrama cubre: navegación desde caso padre, consulta con include, retorno de datos, compilación y descarga
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1 accepted. Iteration 2:纠正了 1 个问题: (1) diagrama mostraba "AlumnosController" como participante pero el análisis indica que es "ConfiguracionController" porque el caso padrecoordina la exportación. Se actualizo el diagrama para usar ExportarConfigView en lugar de un controlador específico, reflejando que la vista del caso padre es quien invoca la operación. Todo validado contra el análisis existente.

---

## [19:59] Diseño de exportarPreguntas() — octavo artefacto de diseño

**Prompt:** Prompt detallado para crear el artefacto de diseño de `exportarPreguntas()` siguiendo la misma plantilla. Es un caso abstracto (sub-operación de `exportarConfiguracionGlobal()`), sin interacción directa con el actor.

- **Participantes:** ExportarConfigView, PreguntasController, PreguntasService, PrismaService, BD — reutilizando el endpoint `GET /preguntas` existente con `include: { respuestas: true, bateria: { include: { asignatura: true } } }`.
- **Flujo del diagrama:** el caso padre invoca la exportación, se consulta Pregunta con relaciones anidadas (respuestas, batería, asignatura), se devuelve el array para compilación en el frontend.
- **Decisiones de diseño:** caso abstracto sin vista propia, reutilización de endpoint existente, include anidado para evitar N+1, compilación en frontend, jerarquía de datos preservada.

**Resultado:**
- `documents/diseno/exportarPreguntas/README.md`, `modelosUML/diseno/exportarPreguntas/secuencia.puml`, `images/diseno/exportarPreguntas/secuencia.svg`
- Diagrama cubre: navegación desde caso padre, consulta con múltiples JOINs, retorno de datos jerárquicos, compilación y descarga
- 8 decisiones de diseño documentadas

**Decisión:** Al ser caso abstracto, se validó que no requiere endpoint nuevo (reutiliza `GET /preguntas` existente) y que el flujo refleja la colaboración interna cuando el caso padre solicita los datos de preguntas con sus respuestas y batería.

---

## [20:02] Diseño de asignarExamenes() — noveno artefacto de diseño

**Prompt:** Prompt detallado para crear el artefacto de diseño de `asignarExamenes()` siguiendo la misma plantilla. Es un caso implementado (ya existe en el backend).

- **Participantes:** ExamenesView, ExamenesController, ExamenesService, PrismaService, BD — refleja el método `asignar()` real del servicio.
- **Flujo del diagrama:** POST con examenId y alumnoIds, búsqueda de examen con preguntas y respuestas, cálculo de orden de respuestas correctas, loop de creación de hash SHA-256 por alumno, creación de AlumnoExamen, actualización de estado a ASIGNADO y almacenamiento de claveCorreccion.
- **Decisiones de diseño:** hash con timestamp para unicidad, clave de corrección como JSON, loop de creación individual, validación de examen existente, DTO con pipes de validación.

**Resultado:**
- `documents/diseno/asignarExamenes/README.md`, `modelosUML/diseno/asignarExamenes/secuencia.puml`, `images/diseno/asignarExamenes/secuencia.svg`
- Diagrama cubre: validación de examen, cálculo de respuestas correctas, hash por alumno, batch de asignaciones, actualización de estado
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1 rejected. Iteration 2: issues: (1) el diagrama mostraba "crearAsignaciones()" como método del servicio pero la implementación real itera sobre cada alumno y llama a `alumnoExamen.create()` individualmente, no usa un método batch; (2) faltaba la actualización del estado del examen a ASIGNADO en el diagrama, que sí está en la implementación real. Se actualizó el diagrama para reflejar el loop de creación individual y la actualización de estado. Iteration 3: validado contra `ExamenesService.asignar()` líneas 114-155 — ahora coincide exactamente con la implementación (hash SHA-256 con timestamp, loop de creación, JSON en claveCorreccion).

---

## [20:02] Diseño de crearPregunta() — décimo artefacto de diseño

**Prompt:** Prompt detallado para crear el artefacto de diseño de `crearPregunta()` siguiendo la misma plantilla. Es un caso implementado (ya existe en el backend).

- **Participantes:** PreguntasView, PreguntasController, PreguntasService, PrismaService, BD — refleja el flujo POST de creación.
- **Flujo del diagrama:** el usuario rellena el formulario en el diálogo de PreguntasView, se envía POST /api/preguntas, el servicio persiste mediante Prisma, y se retorna la pregunta creada con estado EN_CONSTRUCCION.
- **Decisiones de diseño:** validación visual en frontend, creación sin validación explícita de batería (FK de BD la garantiza), estado por defecto EN_CONSTRUCCION, transición automática a editarPregunta.

**Resultado:**
- `documents/diseno/crearPregunta/README.md`, `modelosUML/diseno/crearPregunta/secuencia.puml`, `images/diseno/crearPregunta/secuencia.svg`
- Diagrama cubre: carga de formulario, validación visual, petición POST, creación en BD con FK check, retorno y transición a edición
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1: se creó el diseño pero señalé que no reflejaba que el método `create()` es trivial — solo llama a `prisma.pregunta.create()` sin validación explícita de batería (el FK de BD es quien valida). Iteration 2: se corrigió el diagrama eliminando la validación explícita de batería en el servicio y reflejando el manejo de error FK a nivel de BD. Iteration 3: se validó contra `PreguntasService.create()` línea 10 y el controller línea 17 — ahora coincide exactamente.

---

## [17:05] Diseño de editarPregunta() — undécimo artefacto de diseño

**Prompt:** Prompt detallado para crear el artefacto de diseño de `editarPregunta()` siguiendo la misma plantilla. Es un caso implementado con entrada múltiple y salida doble.

- **Participantes:** PreguntasView, PreguntasController, PreguntasService, PrismaService, BD.
- **Flujo del diagrama:** carga previa de datos vía GET /:id, modificación de campos (enunciado, tema, dificultad, estado), guardado vía PATCH /:id con validación de existencia, opción de eliminar vía DELETE /:id.
- **Decisiones de diseño:** carga previa antes de update, verificación de existencia en servicio, manejo de error 404, eliminación con confirmación, seguridad por capas.

**Resultado:**
- `documents/diseno/editarPregunta/README.md`, `modelosUML/diseno/editarPregunta/secuencia.puml`, `images/diseno/editarPregunta/secuencia.svg`
- Diagrama cubre: carga de datos, modificación, guardado y eliminación
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1: se creó el diseño pero señalé que el diagrama no reflejaba la carga previa de datos (findOne) antes del update, que es como funciona realmente el servicio. Iteration 2: se corrigió añadiendo el paso de carga GET y la verificación de existencia en update(). Iteration 3: validado contra el código real — ahora coincide exactamente.

---

## [17:08] Diseño de editarAsignatura() — duodécimo artefacto de diseño

**Prompt:** Prompt detallado para crear el artefacto de diseño de `editarAsignatura()` siguiendo la misma plantilla. Es un caso implementado con entrada múltiple (4 orígenes) y flujo de edición con carga previa.

- **Participantes:** AsignaturasView, AsignaturasController, AsignaturasService, PrismaService, BD.
- **Flujo del diagrama:** carga previa de datos vía GET /:id con include (grado, bateria), modificación de campos, guardado vía PATCH /:id con verificación de existencia, opción de eliminar vía DELETE /:id.
- **Decisiones de diseño:** include con relaciones en findOne, verificación de existencia en update/remove, manejo de error 404, seguridad por capas con roles.

**Resultado:**
- `documents/diseno/editarAsignatura/README.md`, `modelosUML/diseno/editarAsignatura/secuencia.puml`, `images/diseno/editarAsignatura/secuencia.svg`
- Diagrama cubre: carga de datos con include, modificación, guardado y eliminación
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1: se creó el diseño pero señalé que faltaba reflejar el include de `bateria` en la consulta findOne. Iteration 2: se corrigió el diagrama añadiendo el include en la carga de datos. Iteration 3: validado contra el código real — ahora coincide exactamente.

---

## [17:10] Diseño de crearDocente() — decimotercer artefacto de diseño

**Prompt:** Prompt detallado para crear el artefacto de diseño de `crearDocente()` siguiendo la misma plantilla. Caso para Administrador institucional, con hashing de contraseña.

- **Participantes:** ProfesoresView, ProfesoresController, ProfesoresService, PrismaService, BD.
- **Flujo del diagrama:** formulario de creación, POST /profesores, hashing bcrypt de password, persistencia con prisma.profesor.create(), retorno del docente creado.
- **Decisiones de diseño:** bcrypt para hash (salt rounds 10), DTO con class-validator, rol DOCENTE por defecto, endpoint solo ADMIN, seguridad por capas.

**Resultado:**
- `documents/diseno/crearDocente/README.md`, `modelosUML/diseno/crearDocente/secuencia.puml`, `images/diseno/crearDocente/secuencia.svg`
- Diagrama cubre: formulario, hashing, persistencia, retorno
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1: se creó el diseño pero señalé que el hash bcrypt se hace en el servicio, no en el controlador. Iteration 2: se corrigió moviendo el paso de hashing al servicio. Iteration 3: validado contra `ProfesoresService.create()` — ahora coincide exactamente.

---

## [17:12] Diseño de crearAlumno() — decimocuarto artefacto de diseño

**Prompt:** Prompt detallado para crear el artefacto de diseño de `crearAlumno()` siguiendo la misma plantilla. Caso de creación simple con verificación de grado.

- **Participantes:** AlumnosView, AlumnosController, AlumnosService, PrismaService, BD.
- **Flujo del diagrama:** formulario de creación, POST /alumnos, verificación de gradoId (FK), persistencia, retorno.
- **Decisiones de diseño:** validación de grado por FK de BD, DTO con validación, estado inicial, seguridad por capas.

**Resultado:**
- `documents/diseno/crearAlumno/README.md`, `modelosUML/diseno/crearAlumno/secuencia.puml`, `images/diseno/crearAlumno/secuencia.svg`
- Diagrama cubre: formulario, verificación de FK, persistencia
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1: se creó el diseño pero señalé que no reflejaba la verificación de unicidad de dni/email (unique en schema). Iteration 2: se corrigió añadiendo manejo de error por unique constraint. Iteration 3: validado contra `AlumnosService.create()` — ahora coincide.

---

## [17:13] Diseño de editarDocente() — decimoquinto artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `editarDocente()` (#15, Administrador institucional, implementado). Estructura: directorios `documents/diseno/editarDocente/`, `modelosUML/diseno/editarDocente/`, `images/diseno/editarDocente/`. Diagrama de secuencia con participantes: Usuario (Admin), ProfesoresView, ProfesoresController, ProfesoresService, PrismaService, BD. Flujo: GET /:id (carga), PATCH /:id con bcrypt condicional si hay password, DELETE /:id. README con 8 decisiones de diseño. Placeholder SVG.

**Resultado:**
- Creados `documents/diseno/editarDocente/README.md`, `modelosUML/diseno/editarDocente/secuencia.puml`, `images/diseno/editarDocente/secuencia.svg`
- Diagrama cubre: carga de datos con `omit: { password: true }` e `include: { asignaturas: true }`, verificación de existencia, guardado con bcrypt condicional, eliminación con confirmación
- 8 decisiones de diseño: carga previa, verificación de existencia, hashing condicional de bcrypt, omisión de password en respuestas, validación visual, DTO parcial, confirmación de eliminación, seguridad por capas

**Decisión:** Iteration 1: se creó el diseño pero faltaba reflejar que bcrypt solo se aplica si hay password nueva (condicional). Iteration 2: se corrigió el diagrama y se añadió la decisión de diseño correspondiente. Validado contra `ProfesoresService.update()` — ahora coincide exactamente.

---

## [17:16] Diseño de editarAlumno() — decimosexto artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `editarAlumno()` (#16, Docente, implementado). Participantes: AlumnosView, AlumnosController, AlumnosService, PrismaService, BD. Flujo: GET /:id (carga con include grado + asignaturas), PATCH /:id (update con findOne previo), DELETE /:id (remove con findOne previo).

**Resultado:**
- `documents/diseno/editarAlumno/README.md`, `modelosUML/diseno/editarAlumno/secuencia.puml`, `images/diseno/editarAlumno/secuencia.svg`
- Diagrama cubre: carga de datos, modificación, guardado y eliminación
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1: se creó el diseño pero faltaba include de grado en la carga findOne. Iteration 2: corregido.

---

## [17:19] Diseño de crearGrado() — decimoséptimo artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `crearGrado()` (#17, Docente, implementado). Participantes: GradosView, GradosController, GradosService, PrismaService, BD. Flujo: POST /grados con título y código, validación de unique constraint en código, persistencia simple, retorno con transición a editarGrado.

**Resultado:**
- `documents/diseno/crearGrado/README.md`, `modelosUML/diseno/crearGrado/secuencia.puml`, `images/diseno/crearGrado/secuencia.svg`
- Diagrama cubre: formulario, creación en BD, manejo de error unique, retorno
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1: diseño correcto a la primera. Validado contra `GradosService.create()` — coincide exactamente. El método es directo (`prisma.grado.create()`) sin lógica adicional.

