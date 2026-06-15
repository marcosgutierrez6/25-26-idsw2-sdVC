-- DATOS DE PRUEBA PARA PRUEBAS DE EXAMEN

DELETE FROM `BateriaDePreguntas_Pregunta`;
DELETE FROM `ExamenPregunta`;
DELETE FROM `AlumnoExamen`;
DELETE FROM `AlumnoAsignatura`;
DELETE FROM `Respuesta`;
DELETE FROM `Pregunta`;
DELETE FROM `Examen`;
DELETE FROM `BateriaDePreguntas`;
DELETE FROM `Alumno`;
DELETE FROM `Asignatura`;
DELETE FROM `Profesor`;
DELETE FROM `Grado`;

ALTER TABLE `Grado` AUTO_INCREMENT = 1;
ALTER TABLE `Profesor` AUTO_INCREMENT = 1;
ALTER TABLE `Asignatura` AUTO_INCREMENT = 1;
ALTER TABLE `Alumno` AUTO_INCREMENT = 1;
ALTER TABLE `BateriaDePreguntas` AUTO_INCREMENT = 1;
ALTER TABLE `Pregunta` AUTO_INCREMENT = 1;
ALTER TABLE `Respuesta` AUTO_INCREMENT = 1;
ALTER TABLE `Examen` AUTO_INCREMENT = 1;

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

-- Preguntas
INSERT INTO `Pregunta` (`enunciado`, `tema`, `dificultad`, `estado`, `createdAt`, `updatedAt`) VALUES
('¿Cuál es la derivada de x^2?', 'Cálculo', 'BAJA', 'HABILITADA', NOW(), NOW()),
('Resuelve la ecuación: 2x + 5 = 15', 'Álgebra', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es el límite de 1/x cuando x tiende a infinito?', 'Cálculo', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('Integración por partes: ∫x*e^x dx', 'Cálculo', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es el resultado de print(type([1,2,3]))?', 'Tipos de datos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué hace la función len() en Python?', 'Funciones', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la diferencia entre una lista y una tupla?', 'Estructuras de datos', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Cómo se implementa una clase abstracta en Python?', 'POO', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Qué es una clave primaria?', 'Conceptos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('Escribe una consulta SELECT básica', 'SQL', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué es una clave foránea?', 'Relaciones', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('Optimiza esta consulta con un índice', 'Optimización', 'ALTA', 'HABILITADA', NOW(), NOW());

-- Respuestas
INSERT INTO `Respuesta` (`opcion`, `esCorrecta`, `preguntaId`, `createdAt`, `updatedAt`) VALUES
('2x', 1, 1, NOW(), NOW()),
('x', 0, 1, NOW(), NOW()),
('x^2', 0, 1, NOW(), NOW()),
('2', 0, 1, NOW(), NOW()),
('x = 5', 1, 2, NOW(), NOW()),
('x = 10', 0, 2, NOW(), NOW()),
('x = 3', 0, 2, NOW(), NOW()),
('x = 7.5', 0, 2, NOW(), NOW()),
('0', 1, 3, NOW(), NOW()),
('1', 0, 3, NOW(), NOW()),
('Infinito', 0, 3, NOW(), NOW()),
('No existe', 0, 3, NOW(), NOW()),
('x*e^x - e^x + C', 1, 4, NOW(), NOW()),
('e^x + C', 0, 4, NOW(), NOW()),
('x*e^x', 0, 4, NOW(), NOW()),
('x^2*e^x + C', 0, 4, NOW(), NOW()),
('<class list>', 1, 5, NOW(), NOW()),
('<class tuple>', 0, 5, NOW(), NOW()),
('<class array>', 0, 5, NOW(), NOW()),
('<class dict>', 0, 5, NOW(), NOW()),
('Retorna la longitud de un objeto', 1, 6, NOW(), NOW()),
('Retorna el tipo de datos', 0, 6, NOW(), NOW()),
('Crea una nueva lista', 0, 6, NOW(), NOW()),
('Ordena los elementos', 0, 6, NOW(), NOW()),
('Las tuplas son inmutables, las listas no', 1, 7, NOW(), NOW()),
('Son exactamente lo mismo', 0, 7, NOW(), NOW()),
('Las listas usan corchetes, las tuplas no', 0, 7, NOW(), NOW()),
('Las tuplas tienen más elementos', 0, 7, NOW(), NOW()),
('Usar ABC y abstractmethod', 1, 8, NOW(), NOW()),
('Usar interface', 0, 8, NOW(), NOW()),
('No se pueden crear en Python', 0, 8, NOW(), NOW()),
('Usar la palabra abstract', 0, 8, NOW(), NOW()),
('Identifica únicamente cada fila', 1, 9, NOW(), NOW()),
('Es igual que una clave foránea', 0, 9, NOW(), NOW()),
('Solo para números', 0, 9, NOW(), NOW()),
('Puede haber varias en una tabla', 0, 9, NOW(), NOW()),
('SELECT * FROM tabla', 1, 10, NOW(), NOW()),
('GET * FROM tabla', 0, 10, NOW(), NOW()),
('FETCH FROM tabla', 0, 10, NOW(), NOW()),
('QUERY tabla', 0, 10, NOW(), NOW()),
('Referencia a la clave primaria de otra tabla', 1, 11, NOW(), NOW()),
('Una clave duplicada', 0, 11, NOW(), NOW()),
('Siempre es numérica', 0, 11, NOW(), NOW()),
('No puede ser nula', 0, 11, NOW(), NOW()),
('Crear un índice en la columna de WHERE', 1, 12, NOW(), NOW()),
('Aumentar la RAM', 0, 12, NOW(), NOW()),
('Cambiar la base de datos', 0, 12, NOW(), NOW()),
('No se puede optimizar', 0, 12, NOW(), NOW());

-- Asociar preguntas con baterías
INSERT INTO `BateriaDePreguntas_Pregunta` (`bateriaId`, `preguntaId`) VALUES
(1, 1), (1, 2), (1, 3), (1, 4),
(2, 5), (2, 6), (2, 7), (2, 8),
(3, 9), (3, 10), (3, 11), (3, 12);

-- Exámenes
INSERT INTO `Examen` (`evaluacion`, `estado`, `asignaturaId`, `createdAt`, `updatedAt`) VALUES
('PARCIAL_1', 'GENERADO', 1, NOW(), NOW()),
('PARCIAL_1', 'GENERADO', 2, NOW(), NOW()),
('PARCIAL_1', 'GENERADO', 3, NOW(), NOW());

-- Relacionar preguntas con exámenes
INSERT INTO `ExamenPregunta` (`examenId`, `preguntaId`) VALUES
(1, 1), (1, 2),
(2, 5), (2, 6),
(3, 9), (3, 10);
