# 25-26-idsw2-sdVC > importarAlumnos > Diseño

## Información del artefacto

| Campo | Valor |
|-------|-------|
| **Proyecto** | Sistema de Gestión de Exámenes Universitarios |
| **Fase RUP** | Elaboración |
| **Disciplina** | Diseño |
| **Versión** | 1.0 (NestJS + Vue 3) |
| **Fecha** | 2026-06-03 |
| **Autor** | Marcos Gutierrez |

## Propósito

Detallar la interacción entre los componentes del sistema para importar alumnos de forma masiva desde un archivo CSV, validando los datos (formato, unicidad de DNI/email, existencia del grado) y persistiendo los registros válidos mediante operación batch.

## Diagrama de secuencia de diseño

<div align=center>

|![Secuencia de Diseño: importarAlumnos()](../../../images/diseño/importarAlumnos/secuencia.svg)|
|-|
|Código fuente: [secuencia.puml](../../../modelosUML/diseño/importarAlumnos/secuencia.puml)|

</div>

## Código PlantUML

```plantuml
@startuml
title Diagrama de Secuencia - Importar Alumnos (NestJS + Vue 3)

actor "Usuario (Docente/Admin)" as User
participant "Frontend (Vue 3)\nAlumnosView" as FE
participant "AlumnosController" as Controller
participant "AlumnosService" as Service
participant "PrismaService" as Prisma
participant "Base de Datos\n(SQLite/PostgreSQL)" as DB

User -> FE: Navega a "Importar\nAlumnos" desde el listado
activate FE
FE --> User: Muestra formulario\ncarga de archivo CSV

User -> FE: Selecciona archivo\ncon datos de alumnos
FE -> FE: Lee y previsualiza\nnúmero de registros
FE --> User: Muestra resumen\ny solicita confirmación

User -> FE: Confirma importación
FE -> Controller: POST /api/alumnos/importar\nbody: { alumnos: [...] }
activate Controller
Controller -> Service: importarAlumnos(alumnos)
activate Service

Service -> Service: Valida sintaxis\nde cada registro\n(campos obligatorios, tipos)

alt Datos inválidos
  Service --> Controller: lanza BadRequestException
  Controller --> FE: 400 Bad Request
  FE --> User: Muestra errores\nde validación
else Datos válidos
  Service -> Prisma: grado.findUnique({ where: { id: gradoId } })
  activate Prisma
  Prisma -> DB: SELECT FROM Grado WHERE id=?
  activate DB
  DB --> Prisma: grado | null
  deactivate DB
  Prisma --> Service: validación grado
  deactivate Prisma

  alt Grado inexistente
    Service --> Controller: lanza BadRequestException
    Controller --> FE: 400 Bad Request
    FE --> User: Muestra "Grado\nno encontrado"
  else Grado existe
    Service -> Prisma: alumno.createMany({\n  data: alumnos,\n  skipDuplicates: true\n})
    activate Prisma
    Prisma -> DB: INSERT INTO Alumno (batch)
    activate DB
    DB --> Prisma: alumnos creados
    deactivate DB
    Prisma --> Service: resultado
    deactivate Prisma

    Service --> Controller: { importados, omitidos (duplicados), errores }
  end
end

deactivate Service
Controller --> FE: 201 Created\n{ resumen importación }
deactivate Controller
FE --> User: Muestra resultado\ndetallado
FE -> FE: Recarga listado\nde alumnos
deactivate FE

@enduml
```

## Participantes

| Componente | Responsabilidad |
|---|---|
| **Frontend (Vue 3)** | AlumnosView que permite al usuario cargar un archivo CSV, previsualizar los registros detectados y mostrar el resultado detallado de la importación. |
| **AlumnosController** | Endpoint REST `POST /api/alumnos/importar` que recibe el array de alumnos a importar. |
| **AlumnosService** | Lógica de validación sintáctica (campos obligatorios, tipos), validación semántica (existencia del grado), e importación batch con control de duplicados. |
| **PrismaService** | Capa ORM que ejecuta las operaciones de verificación y creación mediante `createMany` con `skipDuplicates`. |
| **Base de Datos (SQLite/PostgreSQL)** | Almacena los alumnos importados respetando las restricciones de unicidad (dni, email) y clave foránea (gradoId). |

## Decisiones de diseño

| Decisión | Justificación |
|---|---|
| **Validación en dos fases** | Validación sintáctica en el servicio (formato de cada registro) y validación semántica contra BD (existencia del grado), separando responsabilidades y evitando consultas innecesarias si el formato es inválido. |
| **Previsualización en frontend** | El frontend lee el archivo CSV y muestra un resumen de registros antes de enviar al backend, permitiendo al usuario confirmar antes de la importación. |
| **skipDuplicates para idempotencia** | `createMany` con `skipDuplicates: true` permite reimportar archivos sin errores por DNI o email duplicados, omitiendo los registros repetidos. |
| **Verificación de grado** | Se consulta la existencia del `gradoId` antes de persistir, garantizando integridad referencial. Si el grado no existe, se rechaza toda la operación. |
| **Formato CSV como estándar** | CSV es el formato más universal para importación de datos tabulares, fácil de generar desde Excel, Google Sheets u otras herramientas. |
| **Extensión de AlumnosService** | Se añade el método `importarAlumnos()` al `AlumnosService` existente en lugar de crear un servicio separado, manteniendo toda la lógica de alumnos unificada. |
| **Transaccionalidad por lote** | Toda la importación se ejecuta como una operación atómica: o se importan todos los alumnos válidos o se rechaza el lote completo. |
| **Seguridad por capas** | `JwtAuthGuard` + `RolesGuard` protegen el endpoint. Solo usuarios con rol `DOCENTE` o `ADMIN` pueden importar alumnos. |
