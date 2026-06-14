# Análisis y Diseño — Artefactos de Diseño

## Módulos por Actor

A continuación se listan todos los casos de uso del diseño organizados por actor y módulo.

---

### Docente

#### Gestión de Alumnos
- [Ver Alumnos](verAlumnos/README.md)
- [Crear Alumno](crearAlumno/README.md)
- [Editar Alumno](editarAlumno/README.md)
- [Eliminar Alumno](eliminarAlumno/README.md)
- [Importar Alumnos](importarAlumnos/README.md)
- [Exportar Alumnos](exportarAlumnos/README.md)

#### Gestión de Docentes
- [Ver Docentes](verDocentes/README.md)
- [Crear Docente](crearDocente/README.md)
- [Editar Docente](editarDocente/README.md)
- [Eliminar Docente](eliminarDocente/README.md)

#### Gestión de Grados
- [Ver Grados](verGrados/README.md)
- [Crear Grado](crearGrado/README.md)
- [Editar Grado](editarGrado/README.md)
- [Eliminar Grado](eliminarGrado/README.md)
- [Importar Grados](importarGrados/README.md)
- [Exportar Grados](exportarGrados/README.md)

#### Gestión de Asignaturas
- [Ver Asignaturas](verAsignaturas/README.md)
- [Crear Asignatura](crearAsignatura/README.md)
- [Editar Asignatura](editarAsignatura/README.md)
- [Eliminar Asignatura](eliminarAsignatura/README.md)
- [Importar Asignaturas](importarAsignaturas/README.md)
- [Exportar Asignaturas](exportarAsignaturas/README.md)

#### Gestión de Preguntas
- [Ver Preguntas](verPreguntas/README.md)
- [Crear Pregunta](crearPregunta/README.md)
- [Editar Pregunta](editarPregunta/README.md)
- [Eliminar Pregunta](eliminarPregunta/README.md)
- [Importar Preguntas](importarPreguntas/README.md)
- [Exportar Preguntas](exportarPreguntas/README.md)

#### Gestión de Respuestas
- [Ver Respuestas](verRespuestas/README.md)
- [Crear Respuesta](crearRespuesta/README.md)
- [Editar Respuesta](editarRespuesta/README.md)
- [Eliminar Respuesta](eliminarRespuesta/README.md)

#### Gestión de Exámenes
- [Asignar Exámenes](asignarExamenes/README.md)
- [Generar Exámenes](generarExamenes/README.md)
- [Corregir Exámenes](corregirExamenes/README.md)
- [Cancelar Generación](cancelarGeneracion/README.md)

#### Sesión
- [Iniciar Sesión](iniciarSesion/README.md)
- [Cerrar Sesión](cerrarSesion/README.md)

#### Sistema
- [Completar Gestión](completarGestion/README.md)

#### Configuración
- [Importar Configuración Global](importarConfiguracionGlobal/README.md)
- [Exportar Configuración Global](exportarConfiguracionGlobal/README.md)

---

### Administrador Institucional
- [Ver Docentes](verDocentes/README.md)
- [Crear Docente](crearDocente/README.md)
- [Editar Docente](editarDocente/README.md)
- [Eliminar Docente](eliminarDocente/README.md)
- [Completar Gestión](completarGestion/README.md)
- [Iniciar Sesión](iniciarSesion/README.md)
- [Cerrar Sesión](cerrarSesion/README.md)

---

## Diagramas de Secuencia

Cada caso de uso incluye:

| Archivo | Descripción |
|---------|-------------|
| `README.md` | Documento de diseño con metadatos, propósito, participantes y decisiones |
| `../../../modelosUML/diseño/<caso>/secuencia.puml` | Diagrama de secuencia en PlantUML |
| `../../../images/diseño/<caso>/secuencia.svg` | Diagrama renderizado |

## Convenciones

- **Patrón BCE**: Los diagramas usan Boundary (vistas), Controller, Entity (servicios + Prisma + BD)
- **Persistencia**: PrismaService como ORM sobre SQLite/PostgreSQL
- **Autenticación**: JWT Bearer Token via Passport, almacenado en localStorage
- **Roles**: `DOCENTE` y `ADMIN` mediante `@Roles()` decorator y `RolesGuard`
