# Código fuente — Sistema de Gestión de Exámenes

Monorepo con dos aplicaciones independientes.

## Estructura

```
apps/
├── backend/               # NestJS + Prisma (API REST)
│   ├── prisma/
│   │   └── schema.prisma  # Modelo de datos (Grado, Asignatura, Alumno, Profesor, Pregunta, Bateria, Examen, Respuesta)
│   └── src/
│       ├── auth/           # AuthController, AuthService, JwtStrategy (JWT + Passport)
│       ├── alumnos/        # CRUD Alumnos + importación CSV
│       ├── asignaturas/    # CRUD Asignaturas
│       ├── grados/         # CRUD Grados
│       ├── profesores/     # CRUD Docentes (solo ADMIN)
│       ├── preguntas/      # CRUD Preguntas + respuestas anidadas
│       ├── examenes/       # Generación automática y corrección
│       ├── bateria/        # Asignación de exámenes a alumnos
│       ├── respuestas/     # CRUD Respuestas (max 5 por pregunta)
│       ├── common/         # Guards, decorators (JwtAuthGuard, RolesGuard, @Roles, @CurrentUser)
│       └── prisma/         # PrismaService (ORM)
│
└── frontend/               # Vue 3 + TypeScript + PrimeVue (SPA)
    └── src/
        ├── views/          # LoginView + vistas por módulo
        ├── stores/         # Pinia (auth store con token + usuario)
        ├── api/            # Axios instance con interceptors JWT
        ├── router/         # Vue Router con guards de autenticación
        └── layouts/        # MainLayout con toolbar y cierre de sesión
```

## Cómo ejecutar

```bash
# Backend
cd apps/backend
npm install
npx prisma migrate dev
npm run start:dev    # http://localhost:3000

# Frontend
cd apps/frontend
npm install
npm run dev          # http://localhost:5173 (proxy a backend)
```

## Registro del proceso

El proceso completo de creación (prompts, decisiones, iteraciones) está documentado en [`conversation-log.md`](../conversation-log.md).

## Entidades principales (Prisma)

- **Grado**: curso académico con asignaturas y alumnos asociados.
- **Asignatura**: pertenece a un grado y tiene una batería de preguntas.
- **Alumno**: datos personales, asociado a un grado y a asignaturas.
- **Profesor**: usuario del sistema con rol DOCENTE o ADMIN y password hasheado (bcrypt).
- **Pregunta**: pertenece a una batería, con tema, dificultad y hasta 5 respuestas.
- **Bateria**: conjunto de preguntas para un examen, asignada a un alumno.
- **Examen**: instancia de batería asignada, con respuestas y corrección.
- **Respuesta**: opción de respuesta con texto y marca de correcta/incorrecta.
