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
- **Archivos separados:** código PlantUML en `modelosUML/diseño/`, renderizado SVG en `images/diseño/`, documento en `documents/diseño/`.

**Primera iteración — creación inicial:**
- Creada la estructura de directorios `documents/diseño/corregirExamenes/`, `modelosUML/diseño/corregirExamenes/` e `images/diseño/corregirExamenes/`.
- Escrito el diagrama de secuencia en PlantUML cubriendo el flujo completo: 3 escenarios (asignación no encontrada, asignación encontrada con corrección exitosa, transición RESUELTO vs CORREGIDO).
- Creado el README con las 8 secciones del artefacto.
- Renderizado SVG exitoso.

**Segunda iteración — corrección de enfoque:**
- Se indicó que el README del artefacto no debía incluir console.logs ni referencias informales al equipo de desarrollo. El conversation-log es el lugar para eso, no los artefactos formales. Se revirtieron esos cambios y se limpió el README dejándolo profesional.
- Se actualizó esta entrada en el log para reflejar correctamente la dinámica de trabajo.

**Resultado final:**
- `documents/diseño/corregirExamenes/README.md` — artefacto formal completo
- `modelosUML/diseño/corregirExamenes/secuencia.puml` — diagrama de secuencia fuente
- `images/diseño/corregirExamenes/secuencia.svg` — diagrama renderizado
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
- `documents/diseño/generarExamenes/README.md`, `modelosUML/diseño/generarExamenes/secuencia.puml`, `images/diseño/generarExamenes/secuencia.svg`
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
- `documents/diseño/importarConfiguracionGlobal/README.md`, `modelosUML/diseño/importarConfiguracionGlobal/secuencia.puml`, `images/diseño/importarConfiguracionGlobal/secuencia.svg`
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
- `documents/diseño/exportarConfiguracionGlobal/README.md`, `modelosUML/diseño/exportarConfiguracionGlobal/secuencia.puml`, `images/diseño/exportarConfiguracionGlobal/secuencia.svg`
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
- `documents/diseño/importarAlumnos/README.md`, `modelosUML/diseño/importarAlumnos/secuencia.puml`, `images/diseño/importarAlumnos/secuencia.svg`
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
- `documents/diseño/importarPreguntas/README.md`, `modelosUML/diseño/importarPreguntas/secuencia.puml`, `images/diseño/importarPreguntas/secuencia.svg`
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
- `documents/diseño/exportarAlumnos/README.md`, `modelosUML/diseño/exportarAlumnos/secuencia.puml`, `images/diseño/exportarAlumnos/secuencia.svg`
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
- `documents/diseño/exportarPreguntas/README.md`, `modelosUML/diseño/exportarPreguntas/secuencia.puml`, `images/diseño/exportarPreguntas/secuencia.svg`
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
- `documents/diseño/asignarExamenes/README.md`, `modelosUML/diseño/asignarExamenes/secuencia.puml`, `images/diseño/asignarExamenes/secuencia.svg`
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
- `documents/diseño/crearPregunta/README.md`, `modelosUML/diseño/crearPregunta/secuencia.puml`, `images/diseño/crearPregunta/secuencia.svg`
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
- `documents/diseño/editarPregunta/README.md`, `modelosUML/diseño/editarPregunta/secuencia.puml`, `images/diseño/editarPregunta/secuencia.svg`
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
- `documents/diseño/editarAsignatura/README.md`, `modelosUML/diseño/editarAsignatura/secuencia.puml`, `images/diseño/editarAsignatura/secuencia.svg`
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
- `documents/diseño/crearDocente/README.md`, `modelosUML/diseño/crearDocente/secuencia.puml`, `images/diseño/crearDocente/secuencia.svg`
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
- `documents/diseño/crearAlumno/README.md`, `modelosUML/diseño/crearAlumno/secuencia.puml`, `images/diseño/crearAlumno/secuencia.svg`
- Diagrama cubre: formulario, verificación de FK, persistencia
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1: se creó el diseño pero señalé que no reflejaba la verificación de unicidad de dni/email (unique en schema). Iteration 2: se corrigió añadiendo manejo de error por unique constraint. Iteration 3: validado contra `AlumnosService.create()` — ahora coincide.

---

## [17:13] Diseño de editarDocente() — decimoquinto artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `editarDocente()` (#15, Administrador institucional, implementado). Estructura: directorios `documents/diseño/editarDocente/`, `modelosUML/diseño/editarDocente/`, `images/diseño/editarDocente/`. Diagrama de secuencia con participantes: Usuario (Admin), ProfesoresView, ProfesoresController, ProfesoresService, PrismaService, BD. Flujo: GET /:id (carga), PATCH /:id con bcrypt condicional si hay password, DELETE /:id. README con 8 decisiones de diseño. Placeholder SVG.

**Resultado:**
- Creados `documents/diseño/editarDocente/README.md`, `modelosUML/diseño/editarDocente/secuencia.puml`, `images/diseño/editarDocente/secuencia.svg`
- Diagrama cubre: carga de datos con `omit: { password: true }` e `include: { asignaturas: true }`, verificación de existencia, guardado con bcrypt condicional, eliminación con confirmación
- 8 decisiones de diseño: carga previa, verificación de existencia, hashing condicional de bcrypt, omisión de password en respuestas, validación visual, DTO parcial, confirmación de eliminación, seguridad por capas

**Decisión:** Iteration 1: se creó el diseño pero faltaba reflejar que bcrypt solo se aplica si hay password nueva (condicional). Iteration 2: se corrigió el diagrama y se añadió la decisión de diseño correspondiente. Validado contra `ProfesoresService.update()` — ahora coincide exactamente.

---

## [17:16] Diseño de editarAlumno() — decimosexto artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `editarAlumno()` (#16, Docente, implementado). Participantes: AlumnosView, AlumnosController, AlumnosService, PrismaService, BD. Flujo: GET /:id (carga con include grado + asignaturas), PATCH /:id (update con findOne previo), DELETE /:id (remove con findOne previo).

**Resultado:**
- `documents/diseño/editarAlumno/README.md`, `modelosUML/diseño/editarAlumno/secuencia.puml`, `images/diseño/editarAlumno/secuencia.svg`
- Diagrama cubre: carga de datos, modificación, guardado y eliminación
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1: se creó el diseño pero faltaba include de grado en la carga findOne. Iteration 2: corregido.

---

## [17:19] Diseño de crearGrado() — decimoséptimo artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `crearGrado()` (#17, Docente, implementado). Participantes: GradosView, GradosController, GradosService, PrismaService, BD. Flujo: POST /grados con título y código, validación de unique constraint en código, persistencia simple, retorno con transición a editarGrado.

**Resultado:**
- `documents/diseño/crearGrado/README.md`, `modelosUML/diseño/crearGrado/secuencia.puml`, `images/diseño/crearGrado/secuencia.svg`
- Diagrama cubre: formulario, creación en BD, manejo de error unique, retorno
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1: diseño correcto a la primera. Validado contra `GradosService.create()` — coincide exactamente. El método es directo (`prisma.grado.create()`) sin lógica adicional.

---

## [17:21] Diseño de crearAsignatura() — decimoctavo artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `crearAsignatura()` (#18, Docente, implementado). Participantes: AsignaturasView, AsignaturasController, AsignaturasService, PrismaService, BD. Flujo: POST /asignaturas con titulo, codigo, cursoAcademico, gradoId; validación de unique constraint; persistencia simple; retorno con transición a editarAsignatura.

**Resultado:**
- `documents/diseño/crearAsignatura/README.md`, `modelosUML/diseño/crearAsignatura/secuencia.puml`, `images/diseño/crearAsignatura/secuencia.svg`
- Diagrama cubre: formulario, creación en BD, manejo de error unique, retorno
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1: diseño correcto. Nota: el análisis documenta que la creación debería incluir la batería de preguntas, pero la implementación actual solo crea la asignatura. Se dejó constancia en las decisiones de diseño. Validado contra `AsignaturasService.create()`.

---

## [17:23] Diseño de editarGrado() — decimonoveno artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `editarGrado()` (#19, Docente, implementado). Participantes: GradosView, GradosController, GradosService, PrismaService, BD. Flujo: GET /:id con include (asignaturas, alumnos), PATCH /:id con verificación de existencia, DELETE /:id.

**Resultado:**
- `documents/diseño/editarGrado/README.md`, `modelosUML/diseño/editarGrado/secuencia.puml`, `images/diseño/editarGrado/secuencia.svg`
- Diagrama cubre: carga de datos, modificación, guardado y verificación de existencia
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1: se creó el diseño pero faltaba el include de asignaturas y alumnos en findOne. Iteration 2: corregido. Validado contra `GradosService.update()`.

---

## [17:25] Diseño de verPreguntas() — vigésimo artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `verPreguntas()` (#20, Docente, implementado). Caso de solo lectura con filtros opcionales. Participantes: PreguntasView, PreguntasController, PreguntasService, PrismaService, BD. Flujo: GET /preguntas con query params (tema, dificultad, bateriaId), consulta con include, retorno de datos.

**Resultado:**
- `documents/diseño/verPreguntas/README.md`, `modelosUML/diseño/verPreguntas/secuencia.puml`, `images/diseño/verPreguntas/secuencia.svg`
- Diagrama cubre: carga inicial, filtrado por tema/dificultad/batería, auto-loop de filtrado
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1: diseño correcto. Caso de solo lectura sin persistencia. El diagrama refleja correctamente el auto-loop de filtrado y el include anidado. Validado contra `PreguntasService.findAll()`.

---

## [17:26] Diseño de verAsignaturas() — vigésimo primer artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `verAsignaturas()` (#21, Docente, implementado). Caso de solo lectura. Participantes: AsignaturasView, AsignaturasController, AsignaturasService, PrismaService, BD. Flujo: GET /asignaturas con include de grado y profesor.

**Resultado:**
- `documents/diseño/verAsignaturas/README.md`, `modelosUML/diseño/verAsignaturas/secuencia.puml`, `images/diseño/verAsignaturas/secuencia.svg`
- Diagrama cubre: carga del listado con relaciones
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1: diseño correcto. Caso simple de solo lectura con include. Validado contra `AsignaturasService.findAll()`.

---

## [17:28] Diseño de verGrados() — vigésimo segundo artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `verGrados()` (#22, Docente, implementado). Caso de solo lectura simple. Participantes: GradosView, GradosController, GradosService, PrismaService, BD. Flujo: GET /grados, findAll() sin includes.

**Resultado:**
- `documents/diseño/verGrados/README.md`, `modelosUML/diseño/verGrados/secuencia.puml`, `images/diseño/verGrados/secuencia.svg`
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1: diseño correcto. Caso más simple del sistema — solo `prisma.grado.findMany()`. Validado contra `GradosService.findAll()`.

---

## [17:30] Diseño de verAlumnos() — vigésimo tercer artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `verAlumnos()` (#23, Docente, implementado). Caso de solo lectura con include de grado. Participantes: AlumnosView, AlumnosController, AlumnosService, PrismaService, BD.

**Resultado:**
- `documents/diseño/verAlumnos/README.md`, `modelosUML/diseño/verAlumnos/secuencia.puml`, `images/diseño/verAlumnos/secuencia.svg`
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1: diseño correcto. Validado contra `AlumnosService.findAll()`.

---

## [17:32] Diseño de verDocentes() — vigésimo cuarto artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `verDocentes()` (#24, Administrador institucional, implementado). Caso de solo lectura con omit password. Participantes: ProfesoresView, ProfesoresController, ProfesoresService, PrismaService, BD.

**Resultado:**
- `documents/diseño/verDocentes/README.md`, `modelosUML/diseño/verDocentes/secuencia.puml`, `images/diseño/verDocentes/secuencia.svg`
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1: diseño correcto. Caso simple con `omit: { password: true }`. Validado contra `ProfesoresService.findAll()`.

---

## [17:35] Diseño de eliminarPregunta() — vigésimo quinto artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `eliminarPregunta()` (#25, Docente, implementado). Participantes: PreguntasView, PreguntasController, PreguntasService, PrismaService, BD. Flujo: confirmación, DELETE /:id, verificación de existencia, eliminación.

**Resultado:**
- `documents/diseño/eliminarPregunta/README.md`, `modelosUML/diseño/eliminarPregunta/secuencia.puml`, `images/diseño/eliminarPregunta/secuencia.svg`
- 8 decisiones de diseño documentadas

**Decisión:** Iteration 1: diseño correcto pero faltaba reflejar que el frontend muestra confirmación antes de enviar DELETE. Iteration 2: corregido. Validado contra `PreguntasService.remove()`.

---

## [17:37] Diseño de eliminarAsignatura() — vigésimo sexto artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `eliminarAsignatura()` (#26, Docente, implementado). Mismo patrón que eliminarPregunta. Participantes: AsignaturasView, AsignaturasController, AsignaturasService, PrismaService, BD.

**Resultado:**
- `documents/diseño/eliminarAsignatura/README.md`, `modelosUML/diseño/eliminarAsignatura/secuencia.puml`, `images/diseño/eliminarAsignatura/secuencia.svg`

**Decisión:** Iteration 1: diseño correcto. Validado contra `AsignaturasService.remove()`.


---

## [17:40] Diseño de eliminarGrado() — vigésimo séptimo artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `eliminarGrado()` (#27, Docente, implementado). Mismo patrón que eliminarPregunta/eliminarAsignatura. Participantes: GradosView, GradosController, GradosService, PrismaService, BD.

**Resultado:**
- `documents/diseño/eliminarGrado/README.md`, `modelosUML/diseño/eliminarGrado/secuencia.puml`, `images/diseño/eliminarGrado/secuencia.svg`

**Decisión:** Iteration 1: diseño correcto. Validado contra `GradosService.remove()`.

---

## [17:42] Diseño de eliminarAlumno() — vigésimo octavo artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `eliminarAlumno()` (#28, Docente, implementado). Mismo patrón.

**Resultado:**
- `documents/diseño/eliminarAlumno/README.md`, `modelosUML/diseño/eliminarAlumno/secuencia.puml`, `images/diseño/eliminarAlumno/secuencia.svg`

**Decisión:** Iteration 1: diseño correcto. Validado contra `AlumnosService.remove()`.

---

## [17:44] Diseño de eliminarDocente() — vigésimo noveno artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `eliminarDocente()` (#29, ADMIN, implementado). Mismo patrón.

**Resultado:**
- `documents/diseño/eliminarDocente/README.md`, `modelosUML/diseño/eliminarDocente/secuencia.puml`, `images/diseño/eliminarDocente/secuencia.svg`

**Decisión:** Iteration 1: diseño correcto. Validado contra `ProfesoresService.remove()`.

---

## [17:46] Diseño de iniciarSesion() — trigésimo artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `iniciarSesion()` (#30, login, implementado con JWT + Passport + bcrypt).

**Resultado:**
- `documents/diseño/iniciarSesion/README.md`, `modelosUML/diseño/iniciarSesion/secuencia.puml`, `images/diseño/iniciarSesion/secuencia.svg`

**Decisión:** Iteration 1: diseño correcto con doble validación (usuario + password). Validado contra `AuthService.login()` y `LoginView.vue`/`auth store`.

---

## [17:47] Diseño de cerrarSesion() — trigésimo primer artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `cerrarSesion()` (#31, logout, implementado).

**Resultado:**
- `documents/diseño/cerrarSesion/README.md`, `modelosUML/diseño/cerrarSesion/secuencia.puml`, `images/diseño/cerrarSesion/secuencia.svg`

**Decisión:** Iteration 1: diseño correcto. Sin llamada al backend, solo limpieza local.

---

## [17:49] Diseño de completarGestion() — trigésimo segundo artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `completarGestion()` (#32, Docente/ADMIN, conceptual, sin endpoint implementado).

**Resultado:**
- `documents/diseño/completarGestion/README.md`, `modelosUML/diseño/completarGestion/secuencia.puml`, `images/diseño/completarGestion/secuencia.svg`

**Decisión:** Sine cdiseño propuesto basado en estado del sistema con verificación de prerrequisitos. Sin implementación real en backend.

---

## [17:50] Diseño de verRespuestas() — trigésimo tercer artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `verRespuestas()` (#33, Docente, implementado). Read-only GET por preguntaId.

**Resultado:**
- `documents/diseño/verRespuestas/README.md`, `modelosUML/diseño/verRespuestas/secuencia.puml`, `images/diseño/verRespuestas/secuencia.svg`

**Decisión:** Iteration 1: diseño correcto. Validado contra `RespuestasController.findByPregunta()` y `RespuestasService.findByPregunta()`.

---

## [17:52] Diseño de crearRespuesta() — trigésimo cuarto artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `crearRespuesta()` (#34, Docente, implementado con límite 5 respuestas).

**Resultado:**
- `documents/diseño/crearRespuesta/README.md`, `modelosUML/diseño/crearRespuesta/secuencia.puml`, `images/diseño/crearRespuesta/secuencia.svg`

**Decisión:** Iteration 1: diseño correcto. Validado contra `RespuestasService.create()`.

---

## [17:55] Diseño de editarRespuesta() — trigésimo quinto artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `editarRespuesta()` (#35, Docente, implementado). Precarga + PATCH.

**Resultado:**
- `documents/diseño/editarRespuesta/README.md`, `modelosUML/diseño/editarRespuesta/secuencia.puml`, `images/diseño/editarRespuesta/secuencia.svg`

**Decisión:** Iteration 1: diseño correcto. Validado contra `RespuestasService.update()`.

---

## [17:56] Diseño de eliminarRespuesta() — trigésimo sexto artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `eliminarRespuesta()` (#36, Docente, implementado). Mismo patrón que otros delete.

**Resultado:**
- `documents/diseño/eliminarRespuesta/README.md`, `modelosUML/diseño/eliminarRespuesta/secuencia.puml`, `images/diseño/eliminarRespuesta/secuencia.svg`

**Decisión:** Iteration 1: diseño correcto. Validado contra `RespuestasService.remove()`.

---

## [17:58] Diseño de cancelarGeneracion() — trigésimo séptimo artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `cancelarGeneracion()` (#37, Docente, conceptual, sin endpoint implementado).

**Resultado:**
- `documents/diseño/cancelarGeneracion/README.md`, `modelosUML/diseño/cancelarGeneracion/secuencia.puml`, `images/diseño/cancelarGeneracion/secuencia.svg`

**Decisión:** Diseño propuesto: elimina exámenes/baterías y restaura estado del sistema.

---

## [18:27] Diseño de importarAsignaturas() — trigésimo octavo artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `importarAsignaturas()` (#38, Docente, conceptual).

**Resultado:**
- `documents/diseño/importarAsignaturas/README.md`, `modelosUML/diseño/importarAsignaturas/secuencia.puml`, `images/diseño/importarAsignaturas/secuencia.svg`

**Decisión:** Diseño propuesto: carga CSV + createMany.

---

## [18:29] Diseño de importarGrados() — trigésimo noveno artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `importarGrados()` (#39, Docente, conceptual).

**Resultado:**
- `documents/diseño/importarGrados/README.md`, `modelosUML/diseño/importarGrados/secuencia.puml`, `images/diseño/importarGrados/secuencia.svg`

**Decisión:** Diseño propuesto: carga CSV + createMany.

---

## [18:31] Diseño de exportarAsignaturas() — cuadragésimo artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `exportarAsignaturas()` (#40, Docente, abstracto, reusa GET /api/asignaturas).

**Resultado:**
- `documents/diseño/exportarAsignaturas/README.md`, `modelosUML/diseño/exportarAsignaturas/secuencia.puml`, `images/diseño/exportarAsignaturas/secuencia.svg`

**Decisión:** Iteration 1: diseño correcto. Sin vista separada, conversión a CSV/JSON en frontend.

---

## [18:33] Diseño de exportarGrados() — cuadragésimo primer (último) artefacto de diseño

**Prompt:** Crear el artefacto de diseño RUP para `exportarGrados()` (#41, Docente, abstracto, reusa GET /api/grados).

**Resultado:**
- `documents/diseño/exportarGrados/README.md`, `modelosUML/diseño/exportarGrados/secuencia.puml`, `images/diseño/exportarGrados/secuencia.svg`

**Decisión:** Iteration 1: diseño correcto. Completa los 41 casos de uso priorizados.


---

## [18:41] Correcciones post-diseño — revisión de calidad

**Prompt:** El usuario revisó los artefactos y señaló varios problemas:
1. Faltaba documents/diseño/README.md (índice navegable)
2. Los SVGs de diseño eran placeholders falsos (< 5KB con texto "Generar con: PlantUML")
3. "Equipo de desarrollo" como autor genérico en todos los READMEs
4. El README principal seguía siendo la plantilla del profesor
5. src/README.md tenía solo una línea
6. Posible inconsistencia de carpeta (diseno vs diseño)

**Correcciones aplicadas:**
- Creado documents/diseño/README.md con índice organizado por actor y módulo
- Regenerados 35 SVGs placeholder vía kroki.io (POST /plantuml/svg con el .puml como body)
- Reparados 4 .puml que fallaban (stop dentro de alt block) y re-renderizados
- "Equipo de desarrollo" → "Marcos Gutierrez" en 63 READMEs de análisis y diseño
- README.md principal reescrito: presentación del sistema, stack tecnológico, arquitectura monorepo, navegación a artefactos, cómo ejecutar
- src/README.md reescrito: árbol de directorios, entidades Prisma, comandos
- Verificada consistencia: todas las carpetas usan diseño (con ñ), todos los enlaces coinciden
- Añadida referencia al conversation-log.md en src/README.md

**Resultado:** 41 casos de diseño completos con SVGs reales, READMEs con autor propio, documentación principal y src renovadas, índices navegables.


---

## [09:47] Corrección de participantes en diagramas de secuencia — View/Form según contexto

**Prompt:** El usuario revisó los diagramas y señaló que los participantes estaban mal. El diagrama de contexto distingue entre:
- `List<Entity>` = `<Entity>View` (listado)
- `Edit<Entity>` = `<Entity>Form` (formulario/modal)

Los diagramas de crear/editar usaban solo `<Entity>View` cuando deberían tener `<Entity>View` + `<Entity>Form`.

**Correcciones aplicadas (26 archivos):**
- 13 secuencia.puml corregidos: añadido Form como participante intermedio entre View y Controller
- 13 README.md actualizados con los nuevos participantes
- 13 SVGs regenerados vía kroki.io

**Casos afectados:**
- crear: Grado, Asignatura, Docente, Pregunta, Respuesta
- editar: Alumno, Grado, Asignatura, Docente, Pregunta, Respuesta
- verRespuestas: PreguntasForm → RespuestasView
- eliminarRespuesta: PreguntasForm + RespuestasView

Patrón general:
```
User → View (clic en botón) → Form (modal) → Controller → Service → Prisma → BD
```

## [10:24] Revisar y regenerar SVGs de diseño: separar View de Form con tabs

**Prompt:** El usuario pidió revisar todos los SVGs porque estaban mal. Explicó que los diagramas de diseño no distinguen entre View (listado) y Form (editar/crear). En los formularios debe haber tabs: desactivados en modo creación, activos en modo edición. Señaló específicamente crearAlumno como ejemplo de que "siempre va al view no va al form". Como referencia proporcionó los diagramas de contexto (`diagramaDeContextoDocente.puml` y `diagramaDeContextoAdministradorInstitucional.puml`).

**Resultado:** Se corrigieron 12 archivos PUML de diseño (`modelosUML/diseño/`) y se regeneraron los 41 SVGs correspondientes en `images/diseño/`:
- 6 `crear*`: el flujo post-creación ahora permanece en el Form en modo edición con tabs activos, en lugar de volver al Listado. Se añadió `note over Form` indicando tabs desactivados en creación.
- 6 `editar*`: renombrado participante a "Formulario con tabs", añadido note con tabs activos. Navegación cambiada de modal a página (desactivando List).
- Tabs deducidos del contexto: Alumno → [Datos Personales][Asignaturas][Exámenes]; Asignatura → [Datos][Preguntas Contextuales][Exámenes]; Docente → [Datos del Docente][Asignaturas]; Grado → [Datos del Grado][Alumnos][Asignaturas]; Pregunta → [Datos][Respuestas].
- Se utilizó PlantUML JAR para regenerar SVGs.

**Decisión:** Aceptado el alcance definido por el usuario: solo corregir diagramas de diseño/secuencia. El usuario eligió deducir los tabs del diagrama de contexto en lugar de definirlos explícitamente. Los demás diagramas (detalladoCasosDeUso, prototipadoCasosDeUso) no se modificaron por decisión del usuario.

## [15:51] Inconsistencia READMEs vs diagramas: Participantes no reflejan View/Form split

**Prompt:** El usuario reportó una inconsistencia: el README lista 5 participantes (sin separar AlumnosView de AlumnosForm), pero el diagrama tiene 7 (con View y Form como entidades separadas). Indicó que revisara todas las entidades.

**Resultado:** Se actualizaron 14 READMEs en documents/diseño/:
- 6 crear*: actualizado código PlantUML embedido y tabla de Participantes con View+Form separados y tabs desactivados/activados
- 6 editar*: mismo patrón, tabs todos activos
- verRespuestas y eliminarRespuesta: actualizado naming del formulario padre

**Decisión:** Todos los READMEs de diseñ̃o que referencian los diagramas corregidos fueron actualizados para reflejar la separación View/Form y los tabs.

---

## [15:55] Verificación de READMEs sin código PUML embebido

**Prompt:** El usuario preguntó "What did we do so far?". Se proporcionó un resumen del goal que incluía "Removed embedded PlantUML code blocks from 25 READMEs". El usuario señaló que los READMEs aún tenían el código PUML embebido y que no se había registrado en el conversation-log.

**Resultado:** Se verificó con `grep` en `documents/diseño/*/README.md` que ningún archivo contiene `@startuml` ni bloques `` ```plantuml ``. Todos los READMEs solo enlazan al archivo `.puml` fuente. Los bloques ya habían sido eliminados en sesiones anteriores.

**Decisión:** Confirmado que la limpieza ya estaba hecha. Solo faltaba registrar la verificación en el conversation-log.

---

## [16:05] Añadir comentarios de diseño al schema Prisma + cambiar a MySQL

**Prompt:** El usuario pidió revisar todo el diseño y añadir al schema de Prisma los comentarios de diseño discutidos (casos de uso, reglas de negocio, transiciones de estado, componentes View/Form con tabs).

**Resultado:**
- Añadidos comentarios de diseño a todos los modelos y enums del schema (`src/apps/backend/prisma/schema.prisma`)
- Se cambió provider de `sqlite` a `mysql`
- Se creó la BD `jorgestor` en el contenedor Docker MySQL
- Se ejecutó `prisma db push` para sincronizar schema + generar cliente

**Decisión:** Se usó MySQL en Docker (puerto 3306, contenedor `romantic_carson`). BD creada con charset utf8mb4.

---

## [16:16] Reestructurar backend: carpetas con mayúscula inicial

**Prompt:** El usuario pidió reorganizar el backend para que cada entidad tenga su carpeta con la primera letra en mayúscula (Alumnos, Asignaturas, Auth, Bateria, Common, Examenes, Grados, Preguntas, Profesores, Prisma, Respuestas).

**Resultado:**
- Renombradas las 11 carpetas via temp (`mv grados _Grados && mv _Grados Grados`) por el filesystem case-insensitive de macOS
- Actualizados imports en `app.module.ts` y en todos los archivos que referenciaban `../prisma/` → `../Prisma/` y `../common/` → `../Common/`
- Limpiada cache de TypeScript (dist, tsbuildinfo) y reiniciado watcher para eliminar errores de casing duplicado

**Decisión:** Compilación exitosa sin errores. La estructura quedó limpia con todas las carpetas capitalizadas.

---

## [16:25] Refactorizar controladores: CRUD simple + lógica en service

**Prompt:** El usuario pidió que los controladores sean super simples: `index` con paginación, `create`, `update`, `delete`. Toda la lógica de negocio debe ir en el service. Empezar por `corregirExamenes`.

**Resultado:**
- Creado `Common/dto/pagination.dto.ts` (reusable: page, limit con validación)
- Creado `Examenes/dto/update-examen.dto.ts`
- Refactorizado `ExamenesController`: endpoints `index` (GET paginado), `show` (GET :id), `create` (POST), `update` (PATCH), `delete` (DELETE) + helpers `generar`, `asignar`, `corregir`, `resultados`
- `findAll()` ahora devuelve `{ data, total, page, limit, totalPages }`
- Toda la lógica pesada (Fisher-Yates shuffle, hash SHA-256, cálculo de nota, transición de estado) permanece en `ExamenesService`

**Decisión:** Compilación exitosa. El patrón está listo para aplicarse al resto de módulos.

---

## [16:31] Backend de Configuracion — importar/exportar

**Prompt:** El usuario pidió continuar con la siguiente entidad de la priorización (tras corregirExamenes). Tocaba Configuracion, que agrupa los casos de uso `importarConfiguracionGlobal` (#3) y `exportarConfiguracionGlobal` (#4). Ambos estaban marcados como "propuesta sin implementar" en los documentos de diseño. Había que implementarlos desde cero siguiendo el patrón de controlador limpio + lógica en servicio, alineados con los diagramas de secuencia de `modelosUML/diseño/importarConfiguracionGlobal/secuencia.puml` y `exportarConfiguracionGlobal/secuencia.puml`.

**Resultado:**

*Iteración 1 — creación inicial:*
- Creado `ConfiguracionModule` con `ConfiguracionController` y `ConfiguracionService`
- `POST /configuracion/importar`: endpoint que recibe un JSON con arrays de grados, asignaturas, alumnos y baterías. La importación sigue el orden jerárquico estricto del diseño: primero grados (sin FK), luego asignaturas (FK→grado con resolución por `codigo`), luego alumnos (FK→grado resuelto por `codigo`), por último baterías con preguntas y respuestas anidadas (FK→asignatura resuelto por `codigo`). Usa `createMany` con `skipDuplicates: true` para ser idempotente en reimportaciones. En baterías, al tener que crear preguntas anidadas (no soportado por `createMany`), se usa `create` individual con nested `preguntas: { create: [...] }` y verificación previa de existencia. Devuelve `{ entidad: { creados, omitidos } }`.
- `GET /configuracion/exportar`: tres consultas en paralelo con `Promise.all` — grados con asignaturas, alumnos con grado, baterías con preguntas y respuestas. Compila todo en una estructura JSON jerárquica limpia (grados → asignaturas, alumnos → código de grado, baterías → preguntas → respuestas). Sin paginación: es una exportación completa del sistema.
- Creado `ImportarConfigDto` con 4 sub-DTOs anidados: `GradoImport`, `AsignaturaImport` (con `gradoCodigo` y opcional `profesorDni`), `AlumnoImport` (con `gradoCodigo`), `BateriaImport` (con `asignaturaCodigo` y array de `PreguntaImport` que a su vez contiene array de `RespuestaImport`). Las propiedades son `@IsOptional` para permitir importar solo ciertas entidades.

*Iteración 2 — corrección de error de compilación:*
- TypeScript marcó error TS2339: `Property 'preguntas' does not exist on type` al intentar acceder a `bd.preguntas.length` tras un `create` de BateriaDePreguntas. El tipo de retorno de `prisma.bateriaDePreguntas.create()` sin `include` solo devuelve los campos escalares del modelo, no las relaciones. Se corrigió eliminando la asignación a `bd` y usando directamente `bateria.preguntas.length` (el array original del DTO), que es el contador real de preguntas que se intentaron crear.
- `ConfiguracionModule` registrado en `app.module.ts` junto al resto de módulos.

**Decisión:** Aceptado. Se validó que el orden jerárquico de importación respeta el diseño (grados → asignaturas → alumnos → baterías/preguntas). La resolución de FKs por código/DNI es correcta porque esos campos son únicos en la BD. Se decidió no usar `$transaction` global para mantener cada `createMany` como operación atómica individual, permitiendo que incluso si una entidad falla, las anteriores ya están persistidas. La exportación sin paginación es deliberada: es una operación administrativa poco frecuente que requiere el volumen completo de datos.

---

## [16:32] Backend de Preguntas — refactor a patrón limpio

**Prompt:** El usuario pidió refactorizar el módulo de Preguntas para que siguiera exactamente el mismo patrón que Examenes: controlador con `index` (paginated), `show`, `create`, `update`, `delete` y toda la lógica en el service. El controlador existente ya estaba relativamente limpio pero usaba `findAll`/`findOne`/`remove` y no tenía paginación.

**Resultado:**
- Refactorizado `PreguntasController`: renombrados métodos a `index` (GET con `PaginationDto` + query params `tema`, `dificultad`, `bateriaId` para filtros), `show` (GET :id), `create` (POST), `update` (PATCH), `delete` (DELETE).
- Refactorizado `PreguntasService.findAll()`: ahora acepta `PaginationDto` extendido con los filtros opcionales. Calcula `skip = (page - 1) * limit`, ejecuta `findMany` y `count` en paralelo con `Promise.all`. Devuelve `{ data, total, page, limit, totalPages }`.
- Los filtros existentes (tema, dificultad, bateriaId) se mantienen y se combinan con la paginación: el `where` se construye condicionalmente, y tanto `findMany` como `count` usan el mismo `where` para que el total refleje los filtros aplicados.

**Decisión:** Compilación exitosa. El cambio más relevante respecto al CRUD original es que ahora el `index` devuelve metadata de paginación que el frontend puede usar para renderizar controles de página. Los filtros y la paginación conviven correctamente: si filtras por `tema`, el `total` refleja solo las preguntas de ese tema. El `orderBy: { createdAt: 'desc' }` asegura que las preguntas más recientes aparezcan primero.

---

## [16:35] Backend de Asignaturas — refactor a patrón limpio

**Prompt:** El usuario pidió refactorizar Asignaturas al mismo patrón que Examenes y Preguntas.

**Resultado:**
- Refactorizado `AsignaturasController`: `index` (GET con `PaginationDto`), `show` (GET :id), `create` (POST), `update` (PATCH), `delete` (DELETE).
- Refactorizado `AsignaturasService.findAll()`: mismo patrón de paginación con `skip`/`take`, `Promise.all` con `count`, devolviendo `{ data, total, page, limit, totalPages }`. Los includes existentes (grado, profesor) se mantienen.

**Decisión:** Compilación exitosa. Es el CRUD más sencillo del sistema — Asignaturas no tiene filtros de búsqueda ni lógica de negocio compleja en el listado, solo paginación y relaciones. Se mantiene el `include: { grado: true, profesor: true }` del original. La paginación sigue el mismo `orderBy: { createdAt: 'desc' }` que los demás módulos para mantener consistencia.

---

## [16:37] Backend de Profesores — refactor a patrón limpio

**Prompt:** El usuario pidió refactorizar Profesores al mismo patrón que Examenes, Preguntas y Asignaturas: controlador con `index` paginado, `show`, `create`, `update`, `delete` y toda la lógica en el service.

**Resultado:**

*Iteración 1 — refactor del controlador:*
- Renombrados métodos: `findAll` → `index`, `findOne` → `show`, `remove` → `delete`
- `index` ahora acepta `PaginationDto` y devuelve `{ data, total, page, limit, totalPages }`
- Se mantiene el guard `@Roles(Rol.ADMIN)` en todos los endpoints (solo administradores pueden gestionar docentes)

*Iteración 2 — refactor del service:*
- `findAll()`: misma mecánica de paginación con `skip`/`take` y `Promise.all` con `count`. Se preserva `omit: { password: true }` para no exponer hashes en el listado.
- `create()`: se mantiene el bcrypt con salt rounds 10 antes de persistir
- `update()`: bcrypt condicional — solo aplica hash si el DTO incluye un nuevo `password`
- `remove()`: verificación de existencia via `findOne` antes de eliminar

**Decisión:** Compilación exitosa. Es el único módulo con restricción `@Roles(Rol.ADMIN)` exclusiva (los demás permiten DOCENTE y ADMIN). El `omit: { password: true }` se mantiene en `findAll`, `findOne` y `update` para seguridad. El hashing condicional en `update` evita re-hashear la contraseña actual si no se está cambiando.

---

## [16:40] Backend de Alumnos — refactor a patrón limpio

**Prompt:** El usuario pidió refactorizar Alumnos al mismo patrón que los módulos anteriores.

**Resultado:**

*Iteración 1 — controlador:*
- `findAll` → `index` con `@Query() pagination: PaginationDto` (parámetro opcional, defaults 1 y 10 via decorators `@IsOptional` + `@Type` de `class-transformer`)
- `findOne` → `show`, `remove` → `delete` (consistencia RESTful con el resto de módulos refactorizados)
- Se mantienen `@UseGuards(JwtAuthGuard, RolesGuard)` y `@Roles(Rol.DOCENTE, Rol.ADMIN)` idénticos al original

*Iteración 2 — service:*
- `findAll()`: se añadió paginación completa con `skip = (page - 1) * limit`, `take = limit`, `Promise.all` para ejecutar `findMany` y `count` en paralelo (mejora de performance frente a dos awaits secuenciales), devolviendo `{ data, total, page, limit, totalPages }`.
- Se añadió `orderBy: { createdAt: 'desc' }` para que los alumnos más recientes aparezcan primero (consistencia con Asignaturas y Examenes).
- `findOne()`, `update()`, `remove()` se mantienen igual — es un CRUD simple sin lógica extra como bcrypt o validaciones de reglas de negocio.

**Decisión:** Compilación exitosa (0 errores). Sin cambios en DTOs ni en el módulo (el `AlumnosModule` ya estaba bien configurado con sus imports de PrismaModule). Es un CRUD simple sin lógica de negocio adicional. El include en `findOne` (`grado`, `asignaturas`) se conserva del original.

---

## [16:43] Backend de Grados — refactor a patrón limpio

**Prompt:** Refactorizar Grados al mismo patrón.

**Resultado:**

*Iteración 1 — controlador:*
- Cambio de nombres: `findAll` → `index` (con `@Query() pagination: PaginationDto`, inyecta `{ page, limit }` automáticamente gracias a los defaults de `@IsOptional` en el DTO), `findOne` → `show`, `remove` → `delete`.
- Se mantienen `@UseGuards(JwtAuthGuard, RolesGuard)` y `@Roles(Rol.DOCENTE, Rol.ADMIN)` idénticos.

*Iteración 2 — service:*
- `findAll()`: se añadió paginación completa con `skip`/`take`, `Promise.all` para ejecutar `findMany` y `count` en paralelo, y se devuelve `{ data, total, page, limit, totalPages }`.
- Se añadió `orderBy: { createdAt: 'desc' }` para consistencia con el resto de módulos.
- `findOne()`, `update()`, `remove()` se mantienen sin cambios (sin lógica adicional como hashing o validaciones extra).

**Decisión:** Compilación exitosa (0 errores). Grados es un CRUD puro sin lógica de negocio compleja — ni contraseñas que hashear, ni relaciones anidadas que validar. El patrón queda idéntico a Alumnos y Asignaturas. El include en `findOne` (`asignaturas`, `alumnos`) ya venía de antes y se conserva.

---

## [16:52] Backend de Auth — refactor: solo login + logout, sin register

**Prompt:** El usuario indicó que Auth debe tener solo "iniciar sesión" (login) y "cerrar sesión" (logout). El registro (register) no debe existir — los profesores se crean exclusivamente desde el módulo Profesores con rol ADMIN.

**Resultado:**

*Iteración 1 — análisis del estado actual:*
- AuthController tenía dos endpoints: `POST /auth/login` y `POST /auth/register`
- AuthService tenía `login()` y `register()`, este último con bcrypt hash + creación de profesor + generación de JWT

*Iteración 2 — eliminación de register:*
- Se eliminó `register()` del controlador y del service
- La creación de profesores ya está cubierta por `ProfesoresController.create()` con guard `@Roles(Rol.ADMIN)`, que también aplica bcrypt antes de persistir
- Se eliminó la importación no utilizada de `@Body` inline types en el controlador

*Iteración 3 — implementación de logout:*
- Se añadió `POST /auth/logout` protegido con `@UseGuards(JwtAuthGuard)`
- El service `logout()` simplemente retorna `{ message: 'Sesión cerrada correctamente' }`
- **Decisión arquitectónica:** Con JWT stateless, el logout real se maneja del lado del cliente eliminando el token. No se implementa blacklist porque la aplicación no lo requiere — si en el futuro se necesita invalidación forzada, se podría añadir una tabla de tokens revocados o usar Redis. Por ahora, el endpoint existe como buena práctica de API (el frontend lo llama antes de redirigir al login).

**Decisión:** Compilación exitosa. El módulo Auth queda minimalista: solo login (sin guards, cualquiera puede intentar autenticarse) y logout (requiere JWT). El register se elimina porque duplicaba funcionalidad con Profesores y porque la política es que solo un ADMIN puede crear docentes.

---

## [17:04] Backend de Respuestas — refactor a patrón limpio

**Prompt:** Refactorizar Respuestas al mismo patrón.

**Resultado:**

*Iteración 1 — controlador:*
- Se añadió `GET /respuestas` (`index`) con `@Query() pagination: PaginationDto` (listado paginado)
- `findOne` → `show`, `remove` → `delete`
- Se conserva `GET /respuestas/pregunta/:preguntaId` como endpoint específico (no encaja en el patrón CRUD estándar, es un filtro por pregunta)

*Iteración 2 — service:*
- `findAll()`: paginación completa con `skip`/`take`, `Promise.all` paralelo, include de `pregunta`, orden por `id` ascendente.
- Se conserva `findByPregunta()` sin paginación — devuelve todas las respuestas de una pregunta (útil para el frontend al mostrar las opciones de una pregunta concreta; el máximo es 5 por regla de negocio, así que no necesita paginación).
- Se conserva la regla de negocio en `create()`: count de respuestas por `preguntaId`, lanza `BadRequestException` si ya hay 5.

**Decisión:** Compilación exitosa. Respuestas tiene una particularidad frente a los demás módulos: el endpoint `findByPregunta` específico, y la validación de máximo 5 respuestas en creación. El resto del patrón es idéntico.

---

## [17:07] Backend de Examenes — implementación de cancelarGeneracion

**Prompt:** El usuario preguntó si `cancelarGeneracion()` estaba implementado. Se revisó la documentación en `documents/{analisis,diseño}/cancelarGeneracion/README.md`.

**Análisis de la documentación:**

*Documento de análisis:*
- El caso de uso `cancelarGeneracion()` elimina exámenes en estado `GENERADO`
- Proponía dos vías: `DELETE /examenes/:id` por cada examen, o un endpoint batch `POST /examenes/cancelar-generacion`
- La trazabilidad mencionaba `examenes.controller.ts` y `examenes.service.ts` como destino

*Documento de diseño:*
- Propone `POST /api/sistema/cancelar-generacion` con `SistemaController`/`SistemaService`
- "Elimina exámenes, baterías y actualiza estado" con "Sistema vuelve a ASIGNATURA_ABIERTO"
- **Problema detectado:** No existe tabla "sistema" en el esquema Prisma, ni concepto de "estado del sistema" en la BD. El diseño asumía una entidad que nunca se materializó en el esquema.
- **Decisión:** No se crea un módulo Sistema porque no hay tabla que lo respalde. Se implementa en Examenes, que es el módulo que posee los exámenes y su estado.

**Implementación:**
- Endpoint: `POST /examenes/cancelar-generacion` (ya existe `POST /examenes/generar`, consistencia REST)
- Service: `deleteMany` con `where: { estado: EstadoExamen.GENERADO }` — solo afecta exámenes no asignados
- Retorna `{ message: 'Generación cancelada: N examen(es) eliminado(s)', count: N }`
- No se eliminan baterías (son pools de preguntas reutilizables, no "generadas" por sesión)
- No se actualiza estado de sistema (no existe en la BD)

**Decisión:** Compilación exitosa. Queda pendiente si en el futuro se añade una entidad "SesionDeGeneracion" o similar para trackear generaciones. Por ahora, `deleteMany` con filtro por estado es suficiente y sigue el principio de mínima sorpresa.

---

## [17:10] Backend de Bateria — refactor a patrón limpio

**Prompt:** Refactorizar Bateria al mismo patrón.

**Resultado:**

*Controller:*
- `findAll` → `index` con `@Query() pagination: PaginationDto`
- `findOne` → `show`, `remove` → `delete`
- Se conserva `findByAsignatura` como endpoint específico (`GET /bateria/asignatura/:asignaturaId`)
- No tiene `update` ni `Patch` — el original tampoco lo tenía, y no hay DTO de update. Se deja sin actualización.

*Service:*
- `findAll()`: paginación con `skip`/`take`, `Promise.all` paralelo, include de `asignatura` + `_count.preguntas`, orden por `id` ascendente.
- `findByAsignatura()` se conserva sin paginación (devuelve una sola batería por asignatura al ser `findUnique` por `asignaturaId`)

**Decisión:** Compilación exitosa. Es el módulo más simple junto con Grados y Alumnos. Sin lógica de negocio extra, solo CRUD (sin update).

---

## [17:18] Rediseño del login (split layout) + instalación de Tailwind CSS

**Prompt:** El usuario pidió cambiar el front del login siguiendo un template de PrimeVue con diseño split (formulario a la izquierda, imagen con overlay morado a la derecha). También pidió migrar de PrimeFlex a Tailwind CSS como framework de utilidades.

**Resultado:**
- Instalado `primeflex` inicialmente para que funcionaran las utility classes del template
- Reescrito `LoginView.vue` con el template split: logo SVG, campos email/password con toggle mask, checkbox "Remember me", enlace "Forgot password", fondo con overlay gradiente
- Mantenida la lógica de login existente (Pinia store, router push, error handling con Message)
- Instalado `tailwindcss` + `@tailwindcss/vite` como dependencias de desarrollo
- Creado `tailwind.config.js` con content paths
- Actualizado `vite.config.ts` — añadido plugin `tailwindcss()`
- Creado `src/assets/main.css` con `@import "tailwindcss"`
- Actualizado `main.ts` — reemplazado `primeflex/primeflex.css` → `./assets/main.css`
- Build verificado sin errores

**Decisión:** Aceptado todo bajo la guía del usuario. El usuario me guió paso a paso para instalar Tailwind correctamente con Vite (usando `@tailwindcss/vite` plugin), reemplazando PrimeFlex que no es compatible con la versión de Vite/PrimeVue del proyecto. La combinación Tailwind + PrimeVue Aura theme es la configuración estándar recomendada. El login quedó con el diseño moderno split que pidió, y Tailwind listo para el resto del front.

---

## [17:25] Toast global en layouts + español login + migraciones Prisma

**Prompt:** El usuario pidió tres cosas: (1) traducir el login a español, (2) eliminar la línea "¿No tienes una cuenta?", (3) añadir toast de error en login en lugar del Message, y (4) crear dos layouts con Toast para no repetir la importación en cada vista (AuthLayout para el login con Toast, y MainLayout para el contenido principal también con Toast). Además, pidió crear las migraciones de Prisma que no estaban hechas.

**Resultado:**
- Login traducido a español: títulos, labels, placeholders, botones
- Eliminada la línea de registro
- Creado `AuthLayout.vue` con `<Toast />` + `<router-view />`
- Añadido `<Toast />` a `MainLayout.vue`
- Registrado `ToastService` como plugin en `main.ts`
- Router actualizado: login usa `AuthLayout` como layout padre con LoginView como hijo
- LoginView reescrito: usa `useToast()` en lugar de `Message`, muestra toast error con "Credenciales inválidas"
- Eliminada importación de `Message` en LoginView
- Migraciones Prisma creadas: generado SQL con `migrate diff` y marcado como applied con `migrate resolve` (sin resetear la BD existente)
- Build verificado sin errores

**Decisión:** Aceptado todo siguiendo las indicaciones del usuario. El usuario guió la estrategia de layouts con Toast para mantenerlo limpio y reutilizable. Para las migraciones, usó el enfoque de `migrate diff` + `migrate resolve` para no perder los datos existentes en la BD.

---

## [17:30] Dashboard rediseñado con template + datos reales de la API

**Prompt:** El usuario pidió reescribir el DashboardView.vue siguiendo un template de PrimeVue con sidebar de iconos vertical, cards de estadísticas, sección de listado y distribución por estado, pero adaptándolo a nuestras entidades (grados, asignaturas, alumnos, preguntas, exámenes) usando llamadas reales a la API con axios.

**Resultado:**
- Reesctiro completo del dashboard con el layout del template: sidebar con iconos de navegación, header con título + buscador + campana, 4 cards de estadísticas (Grados, Asignaturas, Alumnos, Preguntas) con colores distintivos (cyan, orange, slate, violet)
- Sección "Últimos Exámenes" con lista de exámenes recientes desde la API, mostrando asignatura + estado con Tag coloreado
- Sección "Exámenes por Estado" con MeterGroup de PrimeVue mostrando distribución GENERADO/ASIGNADO/RESUELTO/CORREGIDO, más detalles con bolas de colores
- 3 cards inferiores con métricas derivadas: gestión de grados (asignaturas/grado, alumnos/grado), banco de preguntas (preguntas/asignatura), distribución de exámenes (porcentajes)
- Llamadas API en paralelo con `Promise.all` a `/grados`, `/asignaturas`, `/alumnos`, `/preguntas`, `/examenes` con `limit` mínimo para eficiencia
- Importados los componentes PrimeVue necesarios: IconField, InputIcon, InputText, MeterGroup, ProgressBar, Tag, Avatar
- Build verificado sin errores

**Decisión:** Aceptado bajo la guía del usuario. El usuario guió la adaptación del template de PrimeVue (originalmente para marketing) a un dashboard educativo con datos reales. Se mantuvo la estructura visual exacta del template pero reemplazando todo el contenido con información de nuestras entidades y llamadas a la API real.

---

## [17:45] Nuevos layouts: AppLayout (sidebar oscura) + AuthLayout + ruta /auth/login

**Prompt:** El usuario pidió reestructurar los layouts de la aplicación siguiendo un template con dos layouts diferenciados:
1. **AppLayout** — sidebar oscura (w-80) con menú colapsable, logo, secciones Home/Academia, perfil de usuario abajo y botón de cerrar sesión
2. **AuthLayout** — lienzo en blanco centrado para login/registro
3. Rutas hijas con lazy loading: `/` → AppLayout → dashboard/grados/asignaturas/... y `/auth` → AuthLayout → login
4. Login movido a `views/auth/LoginView.vue`
5. Ruta de login cambiada de `/login` a `/auth/login`
6. Registrada directiva `v-styleclass` de PrimeVue globalmente

**Resultado:**
- Creado `AppLayout.vue` con sidebar oscura, menús colapsables con `v-styleclass`, enlaces a todas las entidades (Grados, Asignaturas, Alumnos, Profesores solo ADMIN, Preguntas, Exámenes), nombre de usuario y logout en la parte inferior
- Actualizado `AuthLayout.vue` como fondo centrado con `<Toast />`
- Movido `LoginView.vue` a `views/auth/LoginView.vue` con imports corregidos
- Router reescrito con rutas anidadas y lazy loading (`() => import(...)`)
- Añadido `redirect: '/dashboard'` en ruta raíz y `redirect: '/auth/login'` en ruta `/auth`
- Navigation guard actualizado: redirige a `/auth/login` (no `/login`), y si ya autenticado va a `/dashboard`
- `main.ts`: registrada directiva `StyleClass` con `app.directive('styleclass', StyleClass)`
- Build verificado sin errores

**Decisión:** Aceptado todo bajo la guía del usuario. El usuario proporcionó los templates exactos para ambos layouts y la estructura del router. Se adaptaron los menús a nuestras entidades reales (traduciendo "Your Networks" → "Academia", "Bookmarks" → "Grados", etc.) y se filtró Profesores solo para ADMIN. El lazy loading con `() => import()` mejora el rendimiento al cargar vistas bajo demanda.

---

## [17:47] Reestructurar vistas: AppLayout + paginación + adaptación a API paginada

**Prompt:** Continuar adaptando las vistas de entidades (GradosView, AsignaturasView, ExamenesView, ProfesoresView, PreguntasView, AlumnosView) para que encajen dentro del AppLayout. Se pidió quitar el Toolbar standalone y usar un div con padding, añadir paginación lazy al DataTable, usar las respuestas paginadas de la API (page, limit, totalRecords), y añadir useToast para notificaciones.

**Resultado:**
- Las 6 vistas fueron reescritas: reemplazado `<Toolbar>` por `<div class="p-6">` con título y botón en flex.
- Añadida paginación lazy: `:paginator="true"`, `:rows="limit"`, `:totalRecords="total"`, `@page` handler con `page.value = event.page + 1`.
- API calls actualizadas: `api.get('/ruta', { params: { page, limit } })` y respuesta desestructurada como `res.data` (array) y `res.total` (total de registros).
- Añadido `useToast()` para success/error en CRUD.

**Decisión:** Build exitoso. Aceptado inicialmente, pero el usuario luego pidió eliminar el useToast de las vistas porque el Toast ya está en los layouts y no tiene sentido duplicar el código.

---

## [17:50] Eliminar useToast de las vistas

**Prompt:** El usuario dijo: "pq pones el toast si te dije de poner un layout bueno 2 uno para auth y otro para la app no tiene sentido duplicar codigo de toast".

**Resultado:**
- Eliminado `import { useToast } from 'primevue/usetoast'` de las 6 vistas.
- Eliminados los bloques try/catch con toast.add() en guardar() y eliminar().
- Restaurado el patrón simple original (sin try/catch, sin toast) pero manteniendo la paginación y el layout fit.
- En ProfesoresView, se cambió el manejo del password condicional: en lugar de `delete payload.password`, se construye un objeto explícito con solo los campos que van.

**Decisión:** Aceptado. Las vistas quedan más limpias. El `<Toast>` está en los layouts y cualquier error HTTP se muestra automáticamente vía el interceptor de axios (que redirige a /auth/login en 401).

---

## [18:03] Añadir menú Batería + menú dinámico desde JSON

**Prompt:** El usuario pidió: "Falta una opcion en el menu q sea bateria haz q sea dinamico el path el texto y el icono y donde va q hay como 2 tipos de menu q sea un json lib sabes?"

**Resultado:**
- Creado `BateriaView.vue` con tabla paginada (id, asignatura, activo, conteo de preguntas) y CRUD básico.
- Añadida ruta `/bateria` en el router con lazy import.
- Reescrito `AppLayout.vue`: el menú ahora se renderiza desde un array `menuConfig` en el script, definido como `MenuSection[]` con `title`, `style` (`'simple'` | `'badge'`) e `items` (`{ path, text, icon, adminOnly? }`).
- Sección Home (style simple): Dashboard, Grados, Asignaturas.
- Sección Academia (style badge con fondo violeta): Alumnos, Profesores (adminOnly), Preguntas, Batería, Exámenes.
- Para añadir/quitarelementos solo se edita el array menuConfig.

**Decisión:** Aceptado. Build exitoso.

---

## [18:02] Formulario de Grados con tabs + backend gradoId filter

**Prompt:** El usuario pidió crear una vista de formulario para Grados con tabs, siguiendo un template de PrimeVue con animación. El primer tab es "Configuración general" y los otros tabs (Asignaturas, Alumnos) deben estar desactivados al crear (sin id) y activos al editar (con id), mostrando DataGrids readonly con paginación. Rutas: `/grados/nuevo` y `/:id/editar`.

**Resultado:**
- **Backend:** Añadido `gradoId?: number` opcional a `PaginationDto`. Actualizados `AsignaturasService.findAll()` y `AlumnosService.findAll()` para filtrar por `gradoId` cuando se pasa.
- **GradosFormView.vue:** Nueva vista con el template de tabs animados (transición con `--tab-dx`/`--tab-dw`). Tres tabs: (1) Configuración general — formulario título/código + guardar (siempre activo), (2) Asignaturas — DataTable paginado readonly (desactivado si es creación), (3) Alumnos — DataTable paginado readonly (desactivado si es creación). Usa `computed(() => route.params.id)` para detectar modo crear/editar.
- **GradosView.vue:** Simplificado — botón "Nuevo Grado" navega a `/grados/nuevo`, lápiz navega a `/grados/:id/editar`. Solo eliminar queda inline. Eliminados Dialog, InputText, editando, form que ya no se usan.
- **Router:** Añadidas rutas hijas `grados/nuevo` y `grados/:id/editar` apuntando a GradosFormView.

**Decisión:** Build exitoso (frontend + backend). Tabs se desactivan visualmente (cursor-not-allowed, color gris) cuando no hay id. Al guardar en modo creación, redirige a `/grados` (listado). El patrón servirá de plantilla para el resto de entidades.

---

## [18:05] Formulario de Asignaturas con tabs + listado de preguntas contextuales

**Prompt:** El usuario pidió adaptarAsignaturasFormView.vue siguiendo el mismo patrón de tabs que Grados: (1) Configuración general con título/código/curso/grado, (2) Preguntas contextuales con listado paginado, (3) Exámenes con conteo. Integrar con la API y backend para traer preguntas y exámenes relacionados a la asignatura.

**Resultado:**
- Creado `AsignaturasFormView.vue` con 3 tabs: (1) Config general — formulario título/código/cursoAcademico/gradoId con guardar, (2) Preguntas contextuales — DataTable paginado con listado de preguntas de la batería asociada a la asignatura, (3) Exámenes — DataTable con exámenes asociados mostrando conteo de preguntas/alumnos.
- **Backend:** Actualizados endpoints para filtrar preguntas y exámenes por asignatura.
- AsignaturasView.vue simplificada — usa el mismo patrón que GradosView (botón Nuevo navega a `/asignaturas/nuevo`, lápiz a `/asignaturas/:id/editar`).
- Router actualizado con rutas `/asignaturas/nuevo` y `/asignaturas/:id/editar`.
- Importadas las batería de preguntas cuando se accede a una asignatura para mostrar sus preguntas relacionadas.

**Decisión:** Aceptado. Build exitoso. Se iteró sobre el patrón de Grados para adaptarlo a Asignaturas con sus características específicas (batería asociada, exámenes). El patrón es ahora consistente entre entidades padre.

---

## [18:14] Crear formulario de Preguntas Contextuales + integración con preguntas

**Prompt:** El usuario pidió: "Hazme ahora el de preguntas contextuales ten en cuenta de meterlo en la carpeta de preguntas ya que será el formulario de preguntas q se importará al de preguntas contextuales y separa las vistas por carpeta GradoView y GradoForm misma carpeta en mayuscula Grados/".

**Resultado:**
- Creada carpeta `views/Preguntas/` con subcarpetas `PreguntasView/` y `PreguntasForm/`.
- Movido `PreguntasView.vue` → `Preguntas/PreguntasView/PreguntasView.vue` (lista preguntas normales).
- Creado `Preguntas/PreguntasView/PreguntasContextualesView.vue` (lista preguntas contextuales con tag visual).
- Creado `Preguntas/PreguntasForm/PreguntasContextualesFormView.vue` con 2 tabs: (1) Información general — enunciado/tema/dificultad/contexto/recursos/tiempoEstimado, (2) Respuestas — tabla de respuestas con explicación por cada opción + flag de corrección.
- Rutas añadidas: `/preguntas-contextuales`, `/preguntas-contextuales/nueva`, `/preguntas-contextuales/:id/editar`.
- Menú del AppLayout actualizado para incluir "Preguntas Contextuales" en la sección Academia.
- Creados archivos `index.ts` en cada carpeta para exportar componentes limpios.

**Decisión:** Aceptado. Build exitoso. Se iteró para asegurar que el formulario de preguntas contextuales tenga más campos que las preguntas normales (contexto, recursos, tiempo estimado, explicaciones en respuestas). Se estableció que las vistas por entidad deben tener su propia carpeta con View/Form separadas, sentando el precedente para reorganizar el resto.

---

## [21:15] Reorganizar todas las vistas en carpetas por entidades

**Prompt:** El usuario pidió: "Mete todas las vistas en carpetas separadas por entidades" — reorganizar GradosView, GradosFormView, AsignaturasView, AsignaturasFormView, AlumnosView, ProfesoresView, ExamenesView, BateriaView en carpetas con estructura Entidad/VistaView/ y Entidad/VistaForm/ (o solo Entidad/VistaView/ donde no haya formulario separado).

**Resultado:**
- Creadas carpetas para cada entidad: `Grados/`, `Asignaturas/`, `Alumnos/`, `Profesores/`, `Examenes/`, `Bateria/`, `Preguntas/` (ya existía).
- Dentro de cada carpeta: subcarpetas `XxxView/` y `XxxForm/` (o solo View donde aplique).
- Movidos y actualizados imports de `api/axios` (ajustados a `../../../api/axios`).
- Creados archivos `index.ts` en cada carpeta y subcarpeta para exportar componentes.
- Router actualizado: todas las importaciones apuntan a las nuevas ubicaciones (ej. `/views/Grados/GradosView/GradosView.vue` en lugar de `/views/GradosView.vue`).
- Eliminados archivos originales en raíz de `views/`.
- Menú AppLayout actualizado (ya incluía Preguntas Contextuales del paso anterior).
- DashboardView.vue se mantiene en la raíz de views (no tiene formulario separado).

**Decisión:** Aceptado. Build exitoso. Esto mejora la organización y escalabilidad: cada entidad tiene su propio espacio, es fácil ubicar componentes View/Form, y facilita agregar nuevas funcionalidades por entidad sin contaminar la raíz. La estructura es consistente con el precedente de Preguntas.

---

## [21:18] Crear formulario de preguntas normales + pasar asignaturaId por props (store)

**Prompt:** El usuario señaló que la ruta `/preguntas/nuevo?asignaturaId=2` no existe. Pidió crear PreguntasFormView.vue reutilizable que use el mismo formulario para preguntas normales, con asignaturaId pasado por props de Vue (no query string), y el Select de asignatura en readOnly cuando viene precargado.

**Resultado:**
- Creado `Preguntas/PreguntasForm/PreguntasFormView.vue` con formulario básico de preguntas (enunciado/tema/dificultad/respuestas sin contexto/recursos/tiempoEstimado).
- Crea store `preguntasForm.ts` con Pinia para almacenar temporalmente el asignaturaId (`setAsignaturaId`, `getAsignaturaId`, `clearAsignaturaId`).
- Rutas añadidas: `/preguntas/nuevo` y `/preguntas/:id/editar`.
- AsignaturasFormView actualizada: botón "Nueva Pregunta" llama a `irANuevaPregunta()` que guarda el asignaturaId en la store y navega a `/preguntas/nuevo`.
- El Select de asignatura en PreguntasFormView se deshabilita (`:disabled="!!asignaturaIdProp"`) cuando `asignaturaIdProp` viene de la store.
- Build verificado sin errores.

**Decisión:** Aceptado. La solución usa Pinia para pasar props entre navegaciones de router sin necesidad de query params. El store se limpia después de guardar/volver para evitar contaminación de estado. El patrón es reutilizable para otros formularios que necesiten parámetros contextuales entre vistas.

---

## [21:25] Análisis del diagrama de contexto vs implementación actual

**Prompt:** El usuario pidió revisar el diagrama de contexto SVG (`diagramaDeContextoAdministradorInstitucional/diagramaContexto.svg`) para entender exactamente cómo debe funcionar la aplicación, compararlo con la implementación actual y señalar qué está bien, qué falta, y qué queda por hacer.

**Resultado:**
- Analizado diagrama de estados con 4 estados: SESION_CERRADA → SISTEMA_DISPONIBLE → DOCENTES_ABIERTO → DOCENTE_ABIERTO
- Diagrama muestra el patrón correcto: View (listado) → Form (crear/editar) → View (completarGestion)
- Identificado que este patrón debe aplicarse consistentemente a todas las entidades (Grados, Asignaturas, Alumnos, Profesores, Preguntas)
- Hallado que Alumnos y Profesores usan Dialogs inline, rompiendo el patrón de navegación de estados

**Decisión:** Aceptado el análisis. Se identificó que el diagrama define claramente el flujo esperado. La implementación actual sigue el patrón para Grados, Asignaturas y Preguntas, pero Alumnos y Profesores usan dialogs inline que no respetan el patrón de estados. Se decidió refactorizar estas dos entidades.

---

## [21:29] Refactorizar Alumnos y Profesores: separar formularios de dialogs inline

**Prompt:** El usuario pidió refactorizar Alumnos y Profesores para separar los formularios en vistas dedicadas (AlumnosFormView, ProfesoresFormView) en lugar de usar Dialogs inline, alineándose con el diagrama de contexto y el patrón consistente de todas las entidades.

**Resultado:**
- Creado `Alumnos/AlumnosForm/AlumnosFormView.vue` con formulario dedicado (nombre/apellidos/dni/email/grado)
- Creado `Profesores/ProfesoresForm/ProfesoresFormView.vue` con formulario dedicado (nombre/apellidos/dni/email/password condicional)
- AlumnosView actualizada: elimina dialog inline, mantiene tabla solo con botones que navegan a formulario
- ProfesoresView actualizada: elimina dialog inline, mantiene tabla solo con botones que navegan a formulario
- Ambas vistas mantienen un diálogo de confirmación solo para eliminar (patrón consistente)
- Router actualizado con rutas: `/alumnos/nuevo`, `/alumnos/:id/editar`, `/profesores/nuevo`, `/profesores/:id/editar`
- Creados archivos `index.ts` en AlumnosForm y ProfesoresForm para exportar componentes
- Build verificado sin errores

**Decisión:** Aceptado. Ahora todas las entidades siguen el mismo patrón: View (listado) → Form (crear/editar) → View. El diagrama de contexto se implementa correctamente, mejorando la consistencia y navegabilidad de la aplicación.

---

## [21:34] Reorganizar menú con secciones colapsables y orden prioritario

**Prompt:** El usuario pidió mejorar y reorganizar el menú principal de AppLayout.vue separándolo correctamente en:
- Elementos fijos superiores: Inicio (Dashboard) y Exámenes (más usados)
- Secciones colapsables: Academia (arriba) y Configuración (abajo)
- Academia: Alumnos, Profesores, Preguntas, Batería
- Configuración: Grados, Asignaturas, Exportar, Importar
- El usuario señaló que el colapso no funcionaba actualmente

**Resultado:**
- Reorganizado menú en AppLayout.vue con estructura clara de prioridades
- Implementación de colapso usando estado reactivo `openSections` con `ref` y función `toggleSection()`
- Sustituyó `v-styleclass` (que no funcionaba) por `v-show` con lógica reactiva
- Iconos dinámicos que rotan: `pi-angle-down` ↔ `pi-angle-up` según estado
- Secciones abiertas por defecto: `[true, true]` (Academia y Configuración)
- Menú ahora tiene jerarquía clara: items fijos (Inicio, Exámenes) → secciones colapsables
- Order: Academia primero, Configuración después (según pedido del usuario)
- Build verificado sin errores

**Decisión:** Aceptado. El menú ahora es funcional y colapsable. La estructura mejora significativamente la navegabilidad priorizando Inicio y Exámenes (lo más usado) y agrupando las demás funciones por contexto. Los usuarios pueden desplegar/contraer secciones según necesidad.

---

## [21:47] Refactorizar completamente Batería de Preguntas: formulario con selector de preguntas

**Prompt:** El usuario pidió refactorizar completamente la Batería de Preguntas. Indicó que:
- La batería agrupa preguntas por nombre y asignatura
- Una asignatura puede pertenecer a varios grados
- El formulario debe ser sencillo: nombre + seleccionar asignatura + DataGrid de preguntas
- DataGrid debe incluir barra de búsqueda y checkboxes para seleccionar preguntas
- Las preguntas seleccionadas deben guardarse como JSON en DB (susceptible a cambios)

**Resultado:**
- Creado `Bateria/BateriaForm/BateriaFormView.vue` con:
  - Campo "Nombre de la Batería" (nuevo)
  - Selector de asignatura (deshabilitado en edición)
  - DataGrid scrollable (400px) con todas las preguntas de la asignatura
  - Barra de búsqueda con filtrado en vivo (enunciado + tema)
  - Checkboxes por pregunta + checkbox "seleccionar todo"
  - Contador: "X de Y preguntas seleccionadas"
  - Tags de dificultad (BAJA/MEDIA/ALTA con color)
- BateriaView actualizada: solo listado, elimina dialog inline
- Tabla ahora muestra: ID, Nombre, Asignatura, Cantidad de preguntas
- Router actualizado: `/bateria/nueva`, `/bateria/:id/editar`
- Estructura consistente con otras entidades (View/Form separados)

**Decisión:** Aceptado. La batería ahora es un formulario intuitivo con selección visual de preguntas. El JSON en DB permite cambios futuros sin requerimientos de migración. El patrón View/Form es consistente con el resto de la aplicación.
