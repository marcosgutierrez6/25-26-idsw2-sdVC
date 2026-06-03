# 25-26-idsw2-sdVC > exportarConfiguracionGlobal > Diseño

## Información del artefacto

| Campo | Valor |
|-------|-------|
| **Proyecto** | Sistema de Gestión de Exámenes Universitarios |
| **Fase RUP** | Elaboración |
| **Disciplina** | Diseño |
| **Versión** | 1.0 (NestJS + Vue 3) |
| **Fecha** | 2026-06-03 |
| **Autor** | Equipo de desarrollo |

## Propósito

Detallar la interacción entre los componentes del sistema para exportar la configuración global del sistema (grados, asignaturas, alumnos, baterías de preguntas) a un archivo JSON descargable, recopilando todas las entidades mediante consultas independientes y compilándolas en una estructura exportable.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: exportarConfiguracionGlobal()](../../../images/diseno/exportarConfiguracionGlobal/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseno/exportarConfiguracionGlobal/secuencia.puml)|

</div>

## Código PlantUML

```plantuml
@startuml
title Diagrama de Secuencia - Exportar Configuración Global (NestJS + Vue 3)

actor "Usuario (Docente/Admin)" as User
participant "Frontend (Vue 3)\nExportarConfigView" as FE
participant "ConfiguracionController" as Controller
participant "ConfiguracionService" as Service
participant "PrismaService" as Prisma
participant "Base de Datos\n(SQLite/PostgreSQL)" as DB

User -> FE: Navega a "Exportar\nConfiguración Global"
activate FE
FE --> User: Muestra opciones\nde exportación

User -> FE: Solicita exportar\nconfiguración global
FE --> User: Solicita confirmación
User -> FE: Confirma exportación

FE -> Controller: GET /api/configuracion/exportar
activate Controller
Controller -> Service: exportarConfiguracion()
activate Service

Service -> Prisma: grado.findMany({ include: { asignaturas: true } })
activate Prisma
Prisma -> DB: SELECT FROM Grado\nJOIN Asignatura
activate DB
DB --> Prisma: grados con asignaturas
deactivate DB
Prisma --> Service: grados
deactivate Prisma

Service -> Prisma: alumno.findMany({ include: { grado: true } })
activate Prisma
Prisma -> DB: SELECT FROM Alumno\nJOIN Grado
activate DB
DB --> Prisma: alumnos con grado
deactivate DB
Prisma --> Service: alumnos
deactivate Prisma

Service -> Prisma: bateriaDePreguntas.findMany({\n  include: { preguntas: { include: { respuestas: true } } }\n})
activate Prisma
Prisma -> DB: SELECT FROM BateriaDePreguntas\nJOIN Pregunta JOIN Respuesta
activate DB
DB --> Prisma: baterías con preguntas y respuestas
deactivate DB
Prisma --> Service: baterias
deactivate Prisma

Service -> Service: Compila datos en\nestructura JSON exportable\n{ grados, asignaturas, alumnos, preguntas }

alt Error de acceso a datos
  Service --> Controller: lanza InternalServerErrorException
  Controller --> FE: 500 Internal Server Error
  FE --> User: Muestra "Error al\nexportar configuración"
else Exportación exitosa
  Service --> Controller: { archivo: config.json,\ndatos: { grados, asignaturas, alumnos, baterias } }
end

deactivate Service
Controller --> FE: 200 OK\n{ archivo JSON }
deactivate Controller
FE -> FE: Genera descarga\ndel archivo
FE --> User: Descarga completada
FE -> FE: Redirige a Dashboard
deactivate FE

@enduml
```

## Participantes

| Componente | Responsabilidad |
|---|---|
| **Frontend (Vue 3)** | ExportarConfigView que permite al usuario solicitar la exportación, confirmar la operación y descargar el archivo JSON generado. |
| **ConfiguracionController** | Endpoint REST `GET /api/configuracion/exportar` que recibe la solicitud de exportación y devuelve el archivo de configuración. |
| **ConfiguracionService** | Lógica de negocio para orquestar las consultas de todas las entidades del sistema y compilarlas en una estructura JSON exportable. |
| **PrismaService** | Capa ORM que ejecuta las consultas independientes con los includes necesarios para obtener datos anidados. |
| **Base de Datos (SQLite/PostgreSQL)** | Almacena todas las entidades del sistema que serán consultadas para la exportación. |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Consultas independientes por entidad** | Se realizan consultas separadas para grados (con asignaturas), alumnos y baterías/preguntas en lugar de una sola consulta gigante, mejorando la legibilidad y el mantenimiento. |
| **Formato JSON exportable** | JSON es el formato natural para datos jerárquicos y compatible con la operación inversa `importarConfiguracionGlobal()`, que leería el mismo formato. |
| **Compilación en el servicio** | `ConfiguracionService` compila la estructura final del JSON, manteniendo el controlador limpio como mera puerta de entrada REST. |
| **Descarga gestionada por el frontend** | El backend devuelve el JSON; el frontend genera la descarga (Blob + download link), siguiendo el patrón SPA estándar. |
| **Confirmación previa obligatoria** | El usuario debe confirmar antes de realizar las consultas, evitando peticiones innecesarias a la base de datos. |
| **Incluir respuestas con preguntas** | Las preguntas se exportan con sus respuestas asociadas para que el archivo sea autocontenido y permita una importación completa. |
| **Servicio dedicado reutilizable** | `ConfiguracionService` es el mismo que el de importación, manteniendo la lógica de configuración unificada en un solo módulo. |
| **Seguridad por capas** | `JwtAuthGuard` + `RolesGuard` protegen el endpoint. Solo usuarios con rol `DOCENTE` o `ADMIN` pueden exportar configuración. |

> **Nota:** Este caso de uso está priorizado como #4 pero no tiene implementación en código. El diseño propuesto es complementario a `importarConfiguracionGlobal()` y sigue los mismos patrones arquitectónicos del sistema.
