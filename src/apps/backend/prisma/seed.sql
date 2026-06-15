-- ============================================================
-- DATOS DE PRUEBA PARA PRUEBAS DE EXAMEN
-- ============================================================

-- Grados
INSERT INTO `Grado` (`titulo`, `codigo`, `createdAt`, `updatedAt`) VALUES
('Grado en Ingeniería Informática', 'INF001', NOW(), NOW()),
('Grado en Ingeniería Técnica', 'TEC001', NOW(), NOW());

-- Profesores
INSERT INTO `Profesor` (`nombre`, `apellidos`, `dni`, `email`, `password`, `rol`, `createdAt`, `updatedAt`) VALUES
('Juan', 'García López', '12345678A', 'juan@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'DOCENTE', NOW(), NOW()),
('María', 'Rodríguez Pérez', '87654321B', 'maria@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'DOCENTE', NOW(), NOW()),
('Carlos', 'Martínez García', '11111111C', 'carlos@example.com', '$2b$10$abcdefghijklmnopqrstuvwxyz', 'ADMIN', NOW(), NOW());

-- Asignaturas
INSERT INTO `Asignatura` (`titulo`, `codigo`, `cursoAcademico`, `gradoId`, `profesorId`, `createdAt`, `updatedAt`) VALUES
('Matemáticas I', 'MAT001', '2024-2025', 1, 1, NOW(), NOW()),
('Programación en Python', 'PROG001', '2024-2025', 1, 2, NOW(), NOW()),
('Bases de Datos', 'BD001', '2024-2025', 1, 1, NOW(), NOW());

-- Alumnos
INSERT INTO `Alumno` (`nombre`, `apellidos`, `dni`, `email`, `gradoId`, `createdAt`, `updatedAt`) VALUES
('Luis', 'Sánchez García', '99999999D', 'luis@example.com', 1, NOW(), NOW()),
('Ana', 'López Fernández', '88888888E', 'ana@example.com', 1, NOW(), NOW()),
('Pedro', 'González Ruiz', '77777777F', 'pedro@example.com', 1, NOW(), NOW()),
('Elena', 'Díaz López', '66666666G', 'elena@example.com', 1, NOW(), NOW());

-- Matricular alumnos en asignaturas
INSERT INTO `AlumnoAsignatura` (`alumnoId`, `asignaturaId`) VALUES
(1, 1), (1, 2), (1, 3),
(2, 1), (2, 2), (2, 3),
(3, 1), (3, 3),
(4, 2), (4, 3);

-- Baterías de Preguntas
INSERT INTO `BateriaDePreguntas` (`nombre`, `asignaturaId`, `createdAt`, `updatedAt`) VALUES
('Batería Matemáticas Tema 1', 1, NOW(), NOW()),
('Batería Python Fundamentos', 2, NOW(), NOW()),
('Batería BD SQL Básico', 3, NOW(), NOW());

-- Preguntas para Matemáticas
INSERT INTO `Pregunta` (`enunciado`, `tema`, `dificultad`, `estado`, `createdAt`, `updatedAt`) VALUES
('¿Cuál es la derivada de x^2?', 'Cálculo', 'BAJA', 'HABILITADA', NOW(), NOW()),
('Resuelve la ecuación: 2x + 5 = 15', 'Álgebra', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es el límite de 1/x cuando x tiende a infinito?', 'Cálculo', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('Integración por partes: ∫x*e^x dx', 'Cálculo', 'ALTA', 'HABILITADA', NOW(), NOW());

-- Preguntas para Python
INSERT INTO `Pregunta` (`enunciado`, `tema`, `dificultad`, `estado`, `createdAt`, `updatedAt`) VALUES
('¿Cuál es el resultado de print(type([1,2,3]))?', 'Tipos de datos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué hace la función len() en Python?', 'Funciones', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la diferencia entre una lista y una tupla?', 'Estructuras de datos', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Cómo se implementa una clase abstracta en Python?', 'POO', 'ALTA', 'HABILITADA', NOW(), NOW());

-- Preguntas para Bases de Datos
INSERT INTO `Pregunta` (`enunciado`, `tema`, `dificultad`, `estado`, `createdAt`, `updatedAt`) VALUES
('¿Qué es una clave primaria?', 'Conceptos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('Escribe una consulta SELECT básica', 'SQL', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué es una clave foránea?', 'Relaciones', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('Optimiza esta consulta con un índice', 'Optimización', 'ALTA', 'HABILITADA', NOW(), NOW());

-- Asociar preguntas con baterías
INSERT INTO `BateriaDePreguntas_Pregunta` (`bateriaId`, `preguntaId`) VALUES
-- Batería Matemáticas (preguntas 1-4)
(1, 1), (1, 2), (1, 3), (1, 4),
-- Batería Python (preguntas 5-8)
(2, 5), (2, 6), (2, 7), (2, 8),
-- Batería BD (preguntas 9-12)
(3, 9), (3, 10), (3, 11), (3, 12);

-- Respuestas para Matemáticas
-- Pregunta 1: Derivada de x^2
INSERT INTO `Respuesta` (`opcion`, `esCorrecta`, `preguntaId`, `createdAt`, `updatedAt`) VALUES
('2x', TRUE, 1, NOW(), NOW()),
('x', FALSE, 1, NOW(), NOW()),
('x^2', FALSE, 1, NOW(), NOW()),
('2', FALSE, 1, NOW(), NOW());

-- Pregunta 2: Ecuación 2x + 5 = 15
INSERT INTO `Respuesta` (`opcion`, `esCorrecta`, `preguntaId`, `createdAt`, `updatedAt`) VALUES
('x = 5', TRUE, 2, NOW(), NOW()),
('x = 10', FALSE, 2, NOW(), NOW()),
('x = 3', FALSE, 2, NOW(), NOW()),
('x = 7.5', FALSE, 2, NOW(), NOW());

-- Pregunta 3: Límite
INSERT INTO `Respuesta` (`opcion`, `esCorrecta`, `preguntaId`, `createdAt`, `updatedAt`) VALUES
('0', TRUE, 3, NOW(), NOW()),
('1', FALSE, 3, NOW(), NOW()),
('Infinito', FALSE, 3, NOW(), NOW()),
('No existe', FALSE, 3, NOW(), NOW());

-- Pregunta 4: Integración por partes
INSERT INTO `Respuesta` (`opcion`, `esCorrecta`, `preguntaId`, `createdAt`, `updatedAt`) VALUES
('x*e^x - e^x + C', TRUE, 4, NOW(), NOW()),
('e^x + C', FALSE, 4, NOW(), NOW()),
('x*e^x', FALSE, 4, NOW(), NOW()),
('x^2*e^x + C', FALSE, 4, NOW(), NOW());

-- Respuestas para Python
-- Pregunta 5: type([1,2,3])
INSERT INTO `Respuesta` (`opcion`, `esCorrecta`, `preguntaId`, `createdAt`, `updatedAt`) VALUES
('<class \'list\'>', TRUE, 5, NOW(), NOW()),
('<class \'tuple\'>', FALSE, 5, NOW(), NOW()),
('<class \'array\'>', FALSE, 5, NOW(), NOW()),
('<class \'dict\'>', FALSE, 5, NOW(), NOW());

-- Pregunta 6: función len()
INSERT INTO `Respuesta` (`opcion`, `esCorrecta`, `preguntaId`, `createdAt`, `updatedAt`) VALUES
('Retorna la longitud de un objeto', TRUE, 6, NOW(), NOW()),
('Retorna el tipo de datos', FALSE, 6, NOW(), NOW()),
('Crea una nueva lista', FALSE, 6, NOW(), NOW()),
('Ordena los elementos', FALSE, 6, NOW(), NOW());

-- Pregunta 7: Diferencia lista y tupla
INSERT INTO `Respuesta` (`opcion`, `esCorrecta`, `preguntaId`, `createdAt`, `updatedAt`) VALUES
('Las tuplas son inmutables, las listas no', TRUE, 7, NOW(), NOW()),
('Son exactamente lo mismo', FALSE, 7, NOW(), NOW()),
('Las listas usan corchetes, las tuplas no', FALSE, 7, NOW(), NOW()),
('Las tuplas tienen más elementos', FALSE, 7, NOW(), NOW());

-- Pregunta 8: Clase abstracta
INSERT INTO `Respuesta` (`opcion`, `esCorrecta`, `preguntaId`, `createdAt`, `updatedAt`) VALUES
('Usar ABC y abstractmethod', TRUE, 8, NOW(), NOW()),
('Usar interface', FALSE, 8, NOW(), NOW()),
('No se pueden crear en Python', FALSE, 8, NOW(), NOW()),
('Usar la palabra abstract', FALSE, 8, NOW(), NOW());

-- Respuestas para Bases de Datos
-- Pregunta 9: Clave primaria
INSERT INTO `Respuesta` (`opcion`, `esCorrecta`, `preguntaId`, `createdAt`, `updatedAt`) VALUES
('Identifica únicamente cada fila', TRUE, 9, NOW(), NOW()),
('Es igual que una clave foránea', FALSE, 9, NOW(), NOW()),
('Solo para números', FALSE, 9, NOW(), NOW()),
('Puede haber varias en una tabla', FALSE, 9, NOW(), NOW());

-- Pregunta 10: SELECT básico
INSERT INTO `Respuesta` (`opcion`, `esCorrecta`, `preguntaId`, `createdAt`, `updatedAt`) VALUES
('SELECT * FROM tabla', TRUE, 10, NOW(), NOW()),
('GET * FROM tabla', FALSE, 10, NOW(), NOW()),
('FETCH FROM tabla', FALSE, 10, NOW(), NOW()),
('QUERY tabla', FALSE, 10, NOW(), NOW());

-- Pregunta 11: Clave foránea
INSERT INTO `Respuesta` (`opcion`, `esCorrecta`, `preguntaId`, `createdAt`, `updatedAt`) VALUES
('Referencia a la clave primaria de otra tabla', TRUE, 11, NOW(), NOW()),
('Una clave duplicada', FALSE, 11, NOW(), NOW()),
('Siempre es numérica', FALSE, 11, NOW(), NOW()),
('No puede ser nula', FALSE, 11, NOW(), NOW());

-- Pregunta 12: Optimización
INSERT INTO `Respuesta` (`opcion`, `esCorrecta`, `preguntaId`, `createdAt`, `updatedAt`) VALUES
('Crear un índice en la columna de WHERE', TRUE, 12, NOW(), NOW()),
('Aumentar la RAM', FALSE, 12, NOW(), NOW()),
('Cambiar la base de datos', FALSE, 12, NOW(), NOW()),
('No se puede optimizar', FALSE, 12, NOW(), NOW());

-- Exámenes de ejemplo
INSERT INTO `Examen` (`evaluacion`, `estado`, `asignaturaId`, `createdAt`, `updatedAt`) VALUES
('PARCIAL_1', 'GENERADO', 1, NOW(), NOW()),
('PARCIAL_1', 'GENERADO', 2, NOW(), NOW()),
('PARCIAL_1', 'GENERADO', 3, NOW(), NOW());

-- Relacionar preguntas con exámenes (ejemplo: tomar 2 preguntas de cada batería)
INSERT INTO `ExamenPregunta` (`examenId`, `preguntaId`) VALUES
-- Examen Matemáticas
(1, 1), (1, 2),
-- Examen Python
(2, 5), (2, 6),
-- Examen BD
(3, 9), (3, 10);
