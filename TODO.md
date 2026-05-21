# TODO - Generador de Exámenes

> Proyecto: Sistema de generación y corrección de exámenes tipo test.
> Stack: Turborepo · NestJS · Prisma · SQLite · Vue 3 · PrimeVue · Pinia · Axios

---

## ✅ Fase 0 — Setup del monorepo
- [x] Inicializar Turborepo en `src/`
- [x] Crear `src/apps/backend/` (NestJS)
- [x] Crear `src/apps/frontend/` (Vue + Vite)
- [x] Crear `src/packages/shared/`
- [x] Configurar dependencias y build

## ✅ Fase 1 — Base de datos (Prisma + SQLite)
- [x] Schema con entidades: Grado, Asignatura, Profesor, Alumno, AlumnoAsignatura, BateriaDePreguntas, Pregunta, Respuesta, Examen, ExamenPregunta, AlumnoExamen
- [x] Enums: Dificultad, Evaluacion, EstadoExamen, EstadoPregunta, Rol
- [x] Prisma client generado
- [x] `prisma db push` ejecutado

## ✅ Fase 2 — Backend Core
- [x] PrismaModule/PrismaService (global)
- [x] AuthModule (JWT, login, register)
- [x] JwtStrategy + Passport
- [x] JwtAuthGuard, RolesGuard, @Roles decorator
- [x] @CurrentUser decorator
- [x] ValidationPipe global

## ✅ Fase 3 — Backend CRUD Modules
- [x] Grados (controller, service, DTOs)
- [x] Asignaturas (controller, service, DTOs)
- [x] Profesores (controller, service, DTOs, bcrypt)
- [x] Alumnos (controller, service, DTOs)
- [x] Preguntas (controller, service, DTOs, filtros)
- [x] Respuestas (controller, service, DTOs, max 5 validation)
- [x] Examenes (controller, service, DTOs)
- [x] BateriaDePreguntas (controller, service, DTOs)

## ✅ Fase 4 — Backend Lógica de negocio
- [x] `generarExamenes()` — Selección por dificultad/tema, creación batch
- [x] `asignarExamenes()` — Hash SHA-256 por alumno-examen
- [x] `corregirExamenes()` — Cruce de respuestas, cálculo de nota
- [x] `resultados()` — Notas por examen

## ✅ Fase 5 — Frontend Setup
- [x] Vue 3 + Vite + TypeScript
- [x] PrimeVue (Aura theme)
- [x] Pinia store (auth)
- [x] Vue Router (auth guard, nested layouts)
- [x] Axios instance (JWT interceptor, /api proxy)

## ✅ Fase 6 — Frontend Vistas CRUD
- [x] LoginView
- [x] DashboardView (stats cards)
- [x] GradosView (DataTable + Dialog CRUD)
- [x] AsignaturasView (DataTable + Dialog CRUD)
- [x] AlumnosView (DataTable + Dialog CRUD)
- [x] ProfesoresView (DataTable + Dialog CRUD, solo ADMIN)
- [x] PreguntasView (DataTable + Dialog CRUD + respuestas inline)
- [x] ExamenesView (listado + generación + resultados)

## ✅ Fase 7 — Frontend Lógica de negocio
- [x] Generar exámenes (formulario con parámetros)
- [x] Asignar exámenes (selector de alumnos)
- [x] Ver resultados/notas

## 📌 Backlog / Mejoras pendientes
- [ ] Vista de corrección manual (subir respuestas alumno)
- [ ] Importación CSV de alumnos/preguntas
- [ ] Exportación de resultados a CSV
- [ ] Diagramas UML actualizados en `modelosUML/` y `images/`
- [ ] Reescribir `README.md` con documentación del sistema
- [ ] Seed de datos de prueba
- [ ] Tests unitarios y e2e
- [ ] Migrar a MySQL en producción
- [ ] CI/CD pipeline

---

## Estructura del proyecto

```
src/
├── apps/
│   ├── backend/          # NestJS API
│   │   ├── prisma/       # Schema + migraciones
│   │   └── src/
│   │       ├── auth/
│   │       ├── common/
│   │       ├── prisma/
│   │       ├── grados/
│   │       ├── asignaturas/
│   │       ├── profesores/
│   │       ├── alumnos/
│   │       ├── preguntas/
│   │       ├── respuestas/
│   │       ├── examenes/
│   │       └── bateria/
│   └── frontend/         # Vue 3 SPA
│       └── src/
│           ├── api/
│           ├── layouts/
│           ├── router/
│           ├── stores/
│           └── views/
└── packages/
    └── shared/           # Tipos/DTOs compartidos
```
