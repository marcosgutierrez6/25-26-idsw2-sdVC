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

-- MATEMÁTICAS - 40 Preguntas
INSERT INTO `Pregunta` (`enunciado`, `tema`, `dificultad`, `estado`, `createdAt`, `updatedAt`) VALUES
-- Cálculo - BAJA (10)
('¿Cuál es la derivada de x^2?', 'Cálculo', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la derivada de 3x?', 'Cálculo', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la derivada de una constante?', 'Cálculo', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la integral de x?', 'Cálculo', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué es una derivada?', 'Cálculo', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la derivada de 5x^2?', 'Cálculo', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la integral de 2x?', 'Cálculo', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué es una integral?', 'Cálculo', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la derivada de sin(x)?', 'Cálculo', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la derivada de cos(x)?', 'Cálculo', 'BAJA', 'HABILITADA', NOW(), NOW()),

-- Álgebra - BAJA (10)
('Resuelve: 2x + 5 = 15', 'Álgebra', 'BAJA', 'HABILITADA', NOW(), NOW()),
('Resuelve: x - 3 = 7', 'Álgebra', 'BAJA', 'HABILITADA', NOW(), NOW()),
('Resuelve: 3x = 21', 'Álgebra', 'BAJA', 'HABILITADA', NOW(), NOW()),
('Resuelve: x + 10 = 25', 'Álgebra', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es el valor de x en 4x = 20?', 'Álgebra', 'BAJA', 'HABILITADA', NOW(), NOW()),
('Resuelve: 2x - 8 = 10', 'Álgebra', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la solución de x/2 = 5?', 'Álgebra', 'BAJA', 'HABILITADA', NOW(), NOW()),
('Resuelve: x + 5 = 12', 'Álgebra', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es el valor de x en 6x = 30?', 'Álgebra', 'BAJA', 'HABILITADA', NOW(), NOW()),
('Resuelve: 5x - 3 = 22', 'Álgebra', 'BAJA', 'HABILITADA', NOW(), NOW()),

-- Cálculo - MEDIA (10)
('¿Cuál es el límite de 1/x cuando x tiende a infinito?', 'Cálculo', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es el límite de sin(x)/x cuando x tiende a 0?', 'Cálculo', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('Calcula la segunda derivada de x^3', 'Cálculo', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la derivada de ln(x)?', 'Cálculo', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la derivada de e^x?', 'Cálculo', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('Encuentra los puntos críticos de f(x) = x^2 - 4x', 'Cálculo', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Qué es un punto de inflexión?', 'Cálculo', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('Calcula la integral de x^2 dx', 'Cálculo', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la derivada de x^4 - 2x^2?', 'Cálculo', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('Encuentra el máximo de f(x) = -x^2 + 4x', 'Cálculo', 'MEDIA', 'HABILITADA', NOW(), NOW()),

-- Álgebra Avanzada - ALTA (10)
('Integración por partes: ∫x*e^x dx', 'Álgebra', 'ALTA', 'HABILITADA', NOW(), NOW()),
('Resuelve la ecuación cuadrática: x^2 - 5x + 6 = 0', 'Álgebra', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la fórmula general para ecuaciones cuadráticas?', 'Álgebra', 'ALTA', 'HABILITADA', NOW(), NOW()),
('Factoriza: x^2 + 7x + 12', 'Álgebra', 'ALTA', 'HABILITADA', NOW(), NOW()),
('Resuelve: x^3 - 27 = 0', 'Álgebra', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es el discriminante de x^2 - 4x + 4?', 'Álgebra', 'ALTA', 'HABILITADA', NOW(), NOW()),
('Resuelve el sistema: 2x + y = 5, x - y = 1', 'Álgebra', 'ALTA', 'HABILITADA', NOW(), NOW()),
('Factoriza: x^3 + 8', 'Álgebra', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la suma de las raíces de x^2 - 6x + 8?', 'Álgebra', 'ALTA', 'HABILITADA', NOW(), NOW()),
('Resuelve: (x+2)^2 = 16', 'Álgebra', 'ALTA', 'HABILITADA', NOW(), NOW());

-- PYTHON - 40 Preguntas
INSERT INTO `Pregunta` (`enunciado`, `tema`, `dificultad`, `estado`, `createdAt`, `updatedAt`) VALUES
-- Tipos de datos - BAJA (10)
('¿Cuál es el resultado de print(type([1,2,3]))?', 'Tipos de datos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es el tipo de datos de "hola"?', 'Tipos de datos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es el tipo de datos de 3.14?', 'Tipos de datos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es el tipo de datos de True?', 'Tipos de datos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es el resultado de type(42)?', 'Tipos de datos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es el resultado de type((1,2))?', 'Tipos de datos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es el resultado de type({1,2})?', 'Tipos de datos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es el resultado de type({})?', 'Tipos de datos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es el tipo de None?', 'Tipos de datos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es el resultado de type("123")?', 'Tipos de datos', 'BAJA', 'HABILITADA', NOW(), NOW()),

-- Funciones - BAJA (10)
('¿Qué hace la función len()?', 'Funciones', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué hace la función print()?', 'Funciones', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué hace la función input()?', 'Funciones', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué hace la función range()?', 'Funciones', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué hace la función str()?', 'Funciones', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué hace la función int()?', 'Funciones', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué hace la función float()?', 'Funciones', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué hace la función list()?', 'Funciones', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué hace la función sum()?', 'Funciones', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué hace la función max()?', 'Funciones', 'BAJA', 'HABILITADA', NOW(), NOW()),

-- Estructuras de datos - MEDIA (10)
('¿Cuál es la diferencia entre lista y tupla?', 'Estructuras de datos', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la diferencia entre lista y conjunto?', 'Estructuras de datos', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la diferencia entre tupla y diccionario?', 'Estructuras de datos', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Cómo se accede a un elemento de una lista?', 'Estructuras de datos', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Cómo se accede a un valor de un diccionario?', 'Estructuras de datos', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Qué es el slicing en Python?', 'Estructuras de datos', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es el índice del primer elemento de una lista?', 'Estructuras de datos', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Qué método se usa para agregar elementos a una lista?', 'Estructuras de datos', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Qué método se usa para eliminar elementos de una lista?', 'Estructuras de datos', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la diferencia entre remove() y pop()?', 'Estructuras de datos', 'MEDIA', 'HABILITADA', NOW(), NOW()),

-- POO - ALTA (10)
('¿Cómo se implementa una clase abstracta en Python?', 'POO', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Qué es herencia en POO?', 'POO', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Qué es encapsulación en POO?', 'POO', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Qué es polimorfismo en POO?', 'POO', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la diferencia entre método de clase y método estático?', 'POO', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Qué es un decorador en Python?', 'POO', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Cómo se implementa un contexto manager?', 'POO', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Qué es el método __init__?', 'POO', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Qué es self en una clase?', 'POO', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la diferencia entre composición y herencia?', 'POO', 'ALTA', 'HABILITADA', NOW(), NOW());

-- BASES DE DATOS - 40 Preguntas
INSERT INTO `Pregunta` (`enunciado`, `tema`, `dificultad`, `estado`, `createdAt`, `updatedAt`) VALUES
-- Conceptos - BAJA (10)
('¿Qué es una clave primaria?', 'Conceptos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué es un atributo?', 'Conceptos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué es una entidad?', 'Conceptos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué es una relación?', 'Conceptos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué es una base de datos?', 'Conceptos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué es una tabla?', 'Conceptos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué es una fila?', 'Conceptos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué es una columna?', 'Conceptos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué es un registro?', 'Conceptos', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué es un campo?', 'Conceptos', 'BAJA', 'HABILITADA', NOW(), NOW()),

-- SQL - BAJA (10)
('Escribe una consulta SELECT básica', 'SQL', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la sintaxis SELECT * FROM?', 'SQL', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cómo se filtra con WHERE en SQL?', 'SQL', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la sintaxis INSERT INTO?', 'SQL', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la sintaxis UPDATE?', 'SQL', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la sintaxis DELETE FROM?', 'SQL', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué hace ORDER BY?', 'SQL', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué hace LIMIT?', 'SQL', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Cómo se usa LIKE en SQL?', 'SQL', 'BAJA', 'HABILITADA', NOW(), NOW()),
('¿Qué hace COUNT()?', 'SQL', 'BAJA', 'HABILITADA', NOW(), NOW()),

-- Relaciones - MEDIA (10)
('¿Qué es una clave foránea?', 'Relaciones', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Qué es una relación uno a muchos?', 'Relaciones', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Qué es una relación muchos a muchos?', 'Relaciones', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Qué es una relación uno a uno?', 'Relaciones', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Cómo se realiza un JOIN en SQL?', 'Relaciones', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la diferencia entre INNER JOIN y LEFT JOIN?', 'Relaciones', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Qué es normalización?', 'Relaciones', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la Primera Forma Normal?', 'Relaciones', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la Segunda Forma Normal?', 'Relaciones', 'MEDIA', 'HABILITADA', NOW(), NOW()),
('¿Cuál es la Tercera Forma Normal?', 'Relaciones', 'MEDIA', 'HABILITADA', NOW(), NOW()),

-- Optimización - ALTA (10)
('Optimiza esta consulta con un índice', 'Optimización', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Qué es un índice en bases de datos?', 'Optimización', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Cómo mejora el rendimiento un índice?', 'Optimización', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Qué es un plan de ejecución?', 'Optimización', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Cómo se analiza la performance de una consulta?', 'Optimización', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Cuáles son las mejores prácticas de indexación?', 'Optimización', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Qué es un índice compuesto?', 'Optimización', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Qué es la fragmentación de índices?', 'Optimización', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Cómo se reconstruye un índice?', 'Optimización', 'ALTA', 'HABILITADA', NOW(), NOW()),
('¿Qué es el EXPLAIN en SQL?', 'Optimización', 'ALTA', 'HABILITADA', NOW(), NOW());

-- Respuestas Matemáticas (160 respuestas)
INSERT INTO `Respuesta` (`opcion`, `esCorrecta`, `preguntaId`, `createdAt`, `updatedAt`) VALUES
-- P1-P10: Cálculo Básico
('2x', 1, 1, NOW(), NOW()), ('x', 0, 1, NOW(), NOW()), ('x^2', 0, 1, NOW(), NOW()), ('2', 0, 1, NOW(), NOW()),
('3', 1, 2, NOW(), NOW()), ('6', 0, 2, NOW(), NOW()), ('3x', 0, 2, NOW(), NOW()), ('1', 0, 2, NOW(), NOW()),
('0', 1, 3, NOW(), NOW()), ('1', 0, 3, NOW(), NOW()), ('x', 0, 3, NOW(), NOW()), ('la constante', 0, 3, NOW(), NOW()),
('x^2/2', 1, 4, NOW(), NOW()), ('x', 0, 4, NOW(), NOW()), ('x^3', 0, 4, NOW(), NOW()), ('1', 0, 4, NOW(), NOW()),
('La tasa de cambio de una función', 1, 5, NOW(), NOW()), ('El área bajo una curva', 0, 5, NOW(), NOW()), ('Un límite', 0, 5, NOW(), NOW()), ('Una integral', 0, 5, NOW(), NOW()),
('10x', 1, 6, NOW(), NOW()), ('5x', 0, 6, NOW(), NOW()), ('10', 0, 6, NOW(), NOW()), ('x^2', 0, 6, NOW(), NOW()),
('x^2 + C', 1, 7, NOW(), NOW()), ('2x + C', 0, 7, NOW(), NOW()), ('x + C', 0, 7, NOW(), NOW()), ('2', 0, 7, NOW(), NOW()),
('Una integral indefinida', 1, 8, NOW(), NOW()), ('Una derivada', 0, 8, NOW(), NOW()), ('Un límite', 0, 8, NOW(), NOW()), ('Una función', 0, 8, NOW(), NOW()),
('cos(x)', 1, 9, NOW(), NOW()), ('sin(x)', 0, 9, NOW(), NOW()), ('-sin(x)', 0, 9, NOW(), NOW()), ('1', 0, 9, NOW(), NOW()),
('-sin(x)', 1, 10, NOW(), NOW()), ('cos(x)', 0, 10, NOW(), NOW()), ('sin(x)', 0, 10, NOW(), NOW()), ('1', 0, 10, NOW(), NOW()),

-- P11-P20: Álgebra Básica
('x = 5', 1, 11, NOW(), NOW()), ('x = 10', 0, 11, NOW(), NOW()), ('x = 3', 0, 11, NOW(), NOW()), ('x = 7.5', 0, 11, NOW(), NOW()),
('x = 10', 1, 12, NOW(), NOW()), ('x = 7', 0, 12, NOW(), NOW()), ('x = 4', 0, 12, NOW(), NOW()), ('x = -3', 0, 12, NOW(), NOW()),
('x = 7', 1, 13, NOW(), NOW()), ('x = 21', 0, 13, NOW(), NOW()), ('x = 3', 0, 13, NOW(), NOW()), ('x = 10.5', 0, 13, NOW(), NOW()),
('x = 15', 1, 14, NOW(), NOW()), ('x = 35', 0, 14, NOW(), NOW()), ('x = 5', 0, 14, NOW(), NOW()), ('x = 10', 0, 14, NOW(), NOW()),
('5', 1, 15, NOW(), NOW()), ('20', 0, 15, NOW(), NOW()), ('2', 0, 15, NOW(), NOW()), ('4', 0, 15, NOW(), NOW()),
('x = 9', 1, 16, NOW(), NOW()), ('x = 18', 0, 16, NOW(), NOW()), ('x = 2', 0, 16, NOW(), NOW()), ('x = 1', 0, 16, NOW(), NOW()),
('x = 10', 1, 17, NOW(), NOW()), ('x = 5', 0, 17, NOW(), NOW()), ('x = 2.5', 0, 17, NOW(), NOW()), ('x = 20', 0, 17, NOW(), NOW()),
('x = 7', 1, 18, NOW(), NOW()), ('x = 2', 0, 18, NOW(), NOW()), ('x = 17', 0, 18, NOW(), NOW()), ('x = 12', 0, 18, NOW(), NOW()),
('5', 1, 19, NOW(), NOW()), ('30', 0, 19, NOW(), NOW()), ('1', 0, 19, NOW(), NOW()), ('6', 0, 19, NOW(), NOW()),
('x = 5', 1, 20, NOW(), NOW()), ('x = 25', 0, 20, NOW(), NOW()), ('x = 3', 0, 20, NOW(), NOW()), ('x = 1', 0, 20, NOW(), NOW()),

-- P21-P30: Cálculo Medio
('0', 1, 21, NOW(), NOW()), ('1', 0, 21, NOW(), NOW()), ('Infinito', 0, 21, NOW(), NOW()), ('No existe', 0, 21, NOW(), NOW()),
('1', 1, 22, NOW(), NOW()), ('0', 0, 22, NOW(), NOW()), ('Infinito', 0, 22, NOW(), NOW()), ('No existe', 0, 22, NOW(), NOW()),
('3x^2', 1, 23, NOW(), NOW()), ('6x', 0, 23, NOW(), NOW()), ('x^3', 0, 23, NOW(), NOW()), ('6', 0, 23, NOW(), NOW()),
('1/x', 1, 24, NOW(), NOW()), ('ln(1)', 0, 24, NOW(), NOW()), ('1', 0, 24, NOW(), NOW()), ('0', 0, 24, NOW(), NOW()),
('e^x', 1, 25, NOW(), NOW()), ('x*e^(x-1)', 0, 25, NOW(), NOW()), ('1', 0, 25, NOW(), NOW()), ('e', 0, 25, NOW(), NOW()),
('x = 2', 1, 26, NOW(), NOW()), ('x = 0', 0, 26, NOW(), NOW()), ('x = 4', 0, 26, NOW(), NOW()), ('x = 1', 0, 26, NOW(), NOW()),
('Donde la segunda derivada es cero', 1, 27, NOW(), NOW()), ('Donde la primera derivada es cero', 0, 27, NOW(), NOW()), ('Donde la función es cero', 0, 27, NOW(), NOW()), ('Donde hay máximo', 0, 27, NOW(), NOW()),
('x^3/3 + C', 1, 28, NOW(), NOW()), ('x^3 + C', 0, 28, NOW(), NOW()), ('3x^2 + C', 0, 28, NOW(), NOW()), ('x^2 + C', 0, 28, NOW(), NOW()),
('4x^3 - 4x', 1, 29, NOW(), NOW()), ('4x^3', 0, 29, NOW(), NOW()), ('12x^2 - 4', 0, 29, NOW(), NOW()), ('x^3 - 2x', 0, 29, NOW(), NOW()),
('x = 2', 1, 30, NOW(), NOW()), ('x = 0', 0, 30, NOW(), NOW()), ('x = 4', 0, 30, NOW(), NOW()), ('x = -2', 0, 30, NOW(), NOW()),

-- P31-P40: Álgebra Avanzada
('x*e^x - e^x + C', 1, 31, NOW(), NOW()), ('e^x + C', 0, 31, NOW(), NOW()), ('x*e^x', 0, 31, NOW(), NOW()), ('x^2*e^x + C', 0, 31, NOW(), NOW()),
('x = 2, x = 3', 1, 32, NOW(), NOW()), ('x = 1, x = 6', 0, 32, NOW(), NOW()), ('x = 5', 0, 32, NOW(), NOW()), ('No tiene solución', 0, 32, NOW(), NOW()),
('x = (-b ± √(b²-4ac))/2a', 1, 33, NOW(), NOW()), ('x = b/2a', 0, 33, NOW(), NOW()), ('x = -b/a', 0, 33, NOW(), NOW()), ('x = b²/a', 0, 33, NOW(), NOW()),
('(x+3)(x+4)', 1, 34, NOW(), NOW()), ('(x+7)(x)', 0, 34, NOW(), NOW()), ('(x-3)(x-4)', 0, 34, NOW(), NOW()), ('(x+2)(x+6)', 0, 34, NOW(), NOW()),
('x = 3', 1, 35, NOW(), NOW()), ('x = -3', 0, 35, NOW(), NOW()), ('x = 0', 0, 35, NOW(), NOW()), ('No tiene solución', 0, 35, NOW(), NOW()),
('0', 1, 36, NOW(), NOW()), ('4', 0, 36, NOW(), NOW()), ('8', 0, 36, NOW(), NOW()), ('-4', 0, 36, NOW(), NOW()),
('x = 2, y = 1', 1, 37, NOW(), NOW()), ('x = 3, y = -1', 0, 37, NOW(), NOW()), ('x = 1, y = 3', 0, 37, NOW(), NOW()), ('x = 0, y = 5', 0, 37, NOW(), NOW()),
('(x+2)(x^2-2x+4)', 1, 38, NOW(), NOW()), ('(x+2)^3', 0, 38, NOW(), NOW()), ('(x-2)(x+4)', 0, 38, NOW(), NOW()), ('(x+2)(x+4)', 0, 38, NOW(), NOW()),
('6', 1, 39, NOW(), NOW()), ('8', 0, 39, NOW(), NOW()), ('4', 0, 39, NOW(), NOW()), ('2', 0, 39, NOW(), NOW()),
('x = -6, x = 2', 1, 40, NOW(), NOW()), ('x = 6, x = -2', 0, 40, NOW(), NOW()), ('x = 4', 0, 40, NOW(), NOW()), ('x = 2', 0, 40, NOW(), NOW());

-- Respuestas Python (160 respuestas)
INSERT INTO `Respuesta` (`opcion`, `esCorrecta`, `preguntaId`, `createdAt`, `updatedAt`) VALUES
-- P41-P50: Tipos de datos básicos
('<class list>', 1, 41, NOW(), NOW()), ('<class tuple>', 0, 41, NOW(), NOW()), ('<class array>', 0, 41, NOW(), NOW()), ('<class dict>', 0, 41, NOW(), NOW()),
('<class str>', 1, 42, NOW(), NOW()), ('<class string>', 0, 42, NOW(), NOW()), ('<class text>', 0, 42, NOW(), NOW()), ('<class char>', 0, 42, NOW(), NOW()),
('<class float>', 1, 43, NOW(), NOW()), ('<class double>', 0, 43, NOW(), NOW()), ('<class int>', 0, 43, NOW(), NOW()), ('<class number>', 0, 43, NOW(), NOW()),
('<class bool>', 1, 44, NOW(), NOW()), ('<class boolean>', 0, 44, NOW(), NOW()), ('<class int>', 0, 44, NOW(), NOW()), ('<class str>', 0, 44, NOW(), NOW()),
('<class int>', 1, 45, NOW(), NOW()), ('<class integer>', 0, 45, NOW(), NOW()), ('<class number>', 0, 45, NOW(), NOW()), ('<class float>', 0, 45, NOW(), NOW()),
('<class tuple>', 1, 46, NOW(), NOW()), ('<class list>', 0, 46, NOW(), NOW()), ('<class set>', 0, 46, NOW(), NOW()), ('<class dict>', 0, 46, NOW(), NOW()),
('<class set>', 1, 47, NOW(), NOW()), ('<class list>', 0, 47, NOW(), NOW()), ('<class frozenset>', 0, 47, NOW(), NOW()), ('<class array>', 0, 47, NOW(), NOW()),
('<class dict>', 1, 48, NOW(), NOW()), ('<class dictionary>', 0, 48, NOW(), NOW()), ('<class object>', 0, 48, NOW(), NOW()), ('<class list>', 0, 48, NOW(), NOW()),
('<class NoneType>', 1, 49, NOW(), NOW()), ('<class None>', 0, 49, NOW(), NOW()), ('<class null>', 0, 49, NOW(), NOW()), ('<class void>', 0, 49, NOW(), NOW()),
('<class str>', 1, 50, NOW(), NOW()), ('<class string>', 0, 50, NOW(), NOW()), ('<class int>', 0, 50, NOW(), NOW()), ('<class numeric>', 0, 50, NOW(), NOW()),

-- P51-P60: Funciones básicas
('Retorna la longitud de un objeto', 1, 51, NOW(), NOW()), ('Imprime en pantalla', 0, 51, NOW(), NOW()), ('Crea una lista', 0, 51, NOW(), NOW()), ('Convierte a string', 0, 51, NOW(), NOW()),
('Imprime en pantalla', 1, 52, NOW(), NOW()), ('Lee entrada del usuario', 0, 52, NOW(), NOW()), ('Retorna la longitud', 0, 52, NOW(), NOW()), ('Crea una lista', 0, 52, NOW(), NOW()),
('Lee entrada del usuario', 1, 53, NOW(), NOW()), ('Imprime en pantalla', 0, 53, NOW(), NOW()), ('Retorna la longitud', 0, 53, NOW(), NOW()), ('Crea un rango', 0, 53, NOW(), NOW()),
('Crea una secuencia de números', 1, 54, NOW(), NOW()), ('Crea una lista', 0, 54, NOW(), NOW()), ('Retorna la longitud', 0, 54, NOW(), NOW()), ('Convierte a string', 0, 54, NOW(), NOW()),
('Convierte a string', 1, 55, NOW(), NOW()), ('Retorna la longitud', 0, 55, NOW(), NOW()), ('Convierte a entero', 0, 55, NOW(), NOW()), ('Imprime en pantalla', 0, 55, NOW(), NOW()),
('Convierte a entero', 1, 56, NOW(), NOW()), ('Convierte a string', 0, 56, NOW(), NOW()), ('Retorna la longitud', 0, 56, NOW(), NOW()), ('Convierte a float', 0, 56, NOW(), NOW()),
('Convierte a float', 1, 57, NOW(), NOW()), ('Convierte a entero', 0, 57, NOW(), NOW()), ('Convierte a string', 0, 57, NOW(), NOW()), ('Retorna la longitud', 0, 57, NOW(), NOW()),
('Convierte a lista', 1, 58, NOW(), NOW()), ('Convierte a string', 0, 58, NOW(), NOW()), ('Convierte a tupla', 0, 58, NOW(), NOW()), ('Retorna la longitud', 0, 58, NOW(), NOW()),
('Suma todos los elementos', 1, 59, NOW(), NOW()), ('Retorna el máximo', 0, 59, NOW(), NOW()), ('Retorna el mínimo', 0, 59, NOW(), NOW()), ('Retorna la longitud', 0, 59, NOW(), NOW()),
('Retorna el máximo', 1, 60, NOW(), NOW()), ('Retorna el mínimo', 0, 60, NOW(), NOW()), ('Suma todos', 0, 60, NOW(), NOW()), ('Retorna la longitud', 0, 60, NOW(), NOW()),

-- P61-P70: Estructuras de datos media
('Las tuplas son inmutables, las listas no', 1, 61, NOW(), NOW()), ('Son exactamente lo mismo', 0, 61, NOW(), NOW()), ('Las listas tienen límite de elementos', 0, 61, NOW(), NOW()), ('Las tuplas son más rápidas', 0, 61, NOW(), NOW()),
('Las listas permiten duplicados, los conjuntos no', 1, 62, NOW(), NOW()), ('Son lo mismo', 0, 62, NOW(), NOW()), ('Los conjuntos son ordenados', 0, 62, NOW(), NOW()), ('Las listas son más rápidas', 0, 62, NOW(), NOW()),
('Una tupla es clave-valor, un diccionario no', 1, 63, NOW(), NOW()), ('Son lo mismo', 0, 63, NOW(), NOW()), ('Una tupla es mutable', 0, 63, NOW(), NOW()), ('Un diccionario es ordenado', 0, 63, NOW(), NOW()),
('lista[índice]', 1, 64, NOW(), NOW()), ('lista(índice)', 0, 64, NOW(), NOW()), ('lista.get(índice)', 0, 64, NOW(), NOW()), ('lista@índice', 0, 64, NOW(), NOW()),
('diccionario[clave]', 1, 65, NOW(), NOW()), ('diccionario(clave)', 0, 65, NOW(), NOW()), ('diccionario.get(clave)', 0, 65, NOW(), NOW()), ('diccionario[valor]', 0, 65, NOW(), NOW()),
('Extraer un subconjunto de una secuencia', 1, 66, NOW(), NOW()), ('Dividir una lista', 0, 66, NOW(), NOW()), ('Contar elementos', 0, 66, NOW(), NOW()), ('Buscar un elemento', 0, 66, NOW(), NOW()),
('0', 1, 67, NOW(), NOW()), ('1', 0, 67, NOW(), NOW()), ('-1', 0, 67, NOW(), NOW()), ('Depende de la lista', 0, 67, NOW(), NOW()),
('append()', 1, 68, NOW(), NOW()), ('add()', 0, 68, NOW(), NOW()), ('insert()', 0, 68, NOW(), NOW()), ('extend()', 0, 68, NOW(), NOW()),
('remove()', 1, 69, NOW(), NOW()), ('pop()', 0, 69, NOW(), NOW()), ('delete()', 0, 69, NOW(), NOW()), ('clear()', 0, 69, NOW(), NOW()),
('remove() elimina por valor, pop() por índice', 1, 70, NOW(), NOW()), ('Son iguales', 0, 70, NOW(), NOW()), ('pop() es más rápido', 0, 70, NOW(), NOW()), ('remove() retorna el elemento', 0, 70, NOW(), NOW()),

-- P71-P80: POO avanzada
('Usar ABC y abstractmethod', 1, 71, NOW(), NOW()), ('Usar interface', 0, 71, NOW(), NOW()), ('No se pueden crear en Python', 0, 71, NOW(), NOW()), ('Usar la palabra abstract', 0, 71, NOW(), NOW()),
('Una clase hereda de otra', 1, 72, NOW(), NOW()), ('Código duplicado', 0, 72, NOW(), NOW()), ('Encapsulación', 0, 72, NOW(), NOW()), ('Polimorfismo', 0, 72, NOW(), NOW()),
('Ocultar detalles internos', 1, 73, NOW(), NOW()), ('Herencia de clases', 0, 73, NOW(), NOW()), ('Uso de métodos comunes', 0, 73, NOW(), NOW()), ('Polimorfismo', 0, 73, NOW(), NOW()),
('Misma interfaz, diferente implementación', 1, 74, NOW(), NOW()), ('Herencia de clases', 0, 74, NOW(), NOW()), ('Ocultar datos', 0, 74, NOW(), NOW()), ('Usar abstractas', 0, 74, NOW(), NOW()),
('Método de clase pertenece a la clase, estático es independiente', 1, 75, NOW(), NOW()), ('Son iguales', 0, 75, NOW(), NOW()), ('Estático es más rápido', 0, 75, NOW(), NOW()), ('No hay diferencia', 0, 75, NOW(), NOW()),
('Una función que retorna una función', 1, 76, NOW(), NOW()), ('Un tipo de variable', 0, 76, NOW(), NOW()), ('Un operador especial', 0, 76, NOW(), NOW()), ('Una clase abstracta', 0, 76, NOW(), NOW()),
('Usar with statement y enter/exit', 1, 77, NOW(), NOW()), ('Usar try/except', 0, 77, NOW(), NOW()), ('Usar decoradores', 0, 77, NOW(), NOW()), ('Usar clases abstractas', 0, 77, NOW(), NOW()),
('Inicializa la instancia de la clase', 1, 78, NOW(), NOW()), ('Crea la clase', 0, 78, NOW(), NOW()), ('Define los métodos', 0, 78, NOW(), NOW()), ('Hereda de la clase padre', 0, 78, NOW(), NOW()),
('Referencia a la instancia actual', 1, 79, NOW(), NOW()), ('Referencia a la clase', 0, 79, NOW(), NOW()), ('Variables globales', 0, 79, NOW(), NOW()), ('Variables estáticas', 0, 79, NOW(), NOW()),
('Composición es más flexible', 1, 80, NOW(), NOW()), ('Son iguales', 0, 80, NOW(), NOW()), ('Herencia es más flexible', 0, 80, NOW(), NOW()), ('Composición no existe en Python', 0, 80, NOW(), NOW());

-- Respuestas Bases de Datos (160 respuestas)
INSERT INTO `Respuesta` (`opcion`, `esCorrecta`, `preguntaId`, `createdAt`, `updatedAt`) VALUES
-- P81-P90: Conceptos
('Identifica únicamente cada fila', 1, 81, NOW(), NOW()), ('Es igual que una clave foránea', 0, 81, NOW(), NOW()), ('Solo para números', 0, 81, NOW(), NOW()), ('Puede haber varias en una tabla', 0, 81, NOW(), NOW()),
('Una característica de una entidad', 1, 82, NOW(), NOW()), ('Una relación', 0, 82, NOW(), NOW()), ('Una restricción', 0, 82, NOW(), NOW()), ('Una tabla', 0, 82, NOW(), NOW()),
('Una cosa del mundo real', 1, 83, NOW(), NOW()), ('Una relación entre tablas', 0, 83, NOW(), NOW()), ('Una columna', 0, 83, NOW(), NOW()), ('Una fila', 0, 83, NOW(), NOW()),
('Asociación entre entidades', 1, 84, NOW(), NOW()), ('Una tabla', 0, 84, NOW(), NOW()), ('Una columna', 0, 84, NOW(), NOW()), ('Una fila', 0, 84, NOW(), NOW()),
('Colección organizada de datos', 1, 85, NOW(), NOW()), ('Un archivo', 0, 85, NOW(), NOW()), ('Una tabla', 0, 85, NOW(), NOW()), ('Una consulta', 0, 85, NOW(), NOW()),
('Estructura que almacena datos', 1, 86, NOW(), NOW()), ('Una fila', 0, 86, NOW(), NOW()), ('Una columna', 0, 86, NOW(), NOW()), ('Un registro', 0, 86, NOW(), NOW()),
('Una línea de datos en una tabla', 1, 87, NOW(), NOW()), ('Una columna', 0, 87, NOW(), NOW()), ('Una clave primaria', 0, 87, NOW(), NOW()), ('Una tabla', 0, 87, NOW(), NOW()),
('Una característica de una fila', 1, 88, NOW(), NOW()), ('Una tabla', 0, 88, NOW(), NOW()), ('Una restricción', 0, 88, NOW(), NOW()), ('Una relación', 0, 88, NOW(), NOW()),
('Una línea en una tabla', 1, 89, NOW(), NOW()), ('Una columna', 0, 89, NOW(), NOW()), ('Un campo', 0, 89, NOW(), NOW()), ('Una tabla', 0, 89, NOW(), NOW()),
('Una columna en una tabla', 1, 90, NOW(), NOW()), ('Una fila', 0, 90, NOW(), NOW()), ('Una tabla', 0, 90, NOW(), NOW()), ('Una relación', 0, 90, NOW(), NOW()),

-- P91-P100: SQL básico
('SELECT * FROM tabla', 1, 91, NOW(), NOW()), ('GET * FROM tabla', 0, 91, NOW(), NOW()), ('FETCH FROM tabla', 0, 91, NOW(), NOW()), ('QUERY tabla', 0, 91, NOW(), NOW()),
('SELECT * FROM tabla', 1, 92, NOW(), NOW()), ('SELECT tabla', 0, 92, NOW(), NOW()), ('GET * tabla', 0, 92, NOW(), NOW()), ('FETCH tabla', 0, 92, NOW(), NOW()),
('SELECT columna FROM tabla WHERE condición', 1, 93, NOW(), NOW()), ('SELECT columna FROM tabla FILTER condición', 0, 93, NOW(), NOW()), ('SELECT columna WHERE condición FROM tabla', 0, 93, NOW(), NOW()), ('SELECT WHERE columna FROM tabla', 0, 93, NOW(), NOW()),
('INSERT INTO tabla VALUES (...)', 1, 94, NOW(), NOW()), ('INSERT tabla VALUES (...)', 0, 94, NOW(), NOW()), ('ADD INTO tabla (...)', 0, 94, NOW(), NOW()), ('CREATE tabla VALUES (...)', 0, 94, NOW(), NOW()),
('UPDATE tabla SET columna = valor', 1, 95, NOW(), NOW()), ('MODIFY tabla SET columna = valor', 0, 95, NOW(), NOW()), ('CHANGE tabla columna = valor', 0, 95, NOW(), NOW()), ('ALTER tabla columna = valor', 0, 95, NOW(), NOW()),
('DELETE FROM tabla', 1, 96, NOW(), NOW()), ('DROP tabla', 0, 96, NOW(), NOW()), ('REMOVE FROM tabla', 0, 96, NOW(), NOW()), ('ERASE tabla', 0, 96, NOW(), NOW()),
('Ordena los resultados', 1, 97, NOW(), NOW()), ('Limita las filas', 0, 97, NOW(), NOW()), ('Filtra resultados', 0, 97, NOW(), NOW()), ('Agrupa datos', 0, 97, NOW(), NOW()),
('Limita el número de filas', 1, 98, NOW(), NOW()), ('Ordena los datos', 0, 98, NOW(), NOW()), ('Filtra datos', 0, 98, NOW(), NOW()), ('Agrupa datos', 0, 98, NOW(), NOW()),
('Busca coincidencias con patrones', 1, 99, NOW(), NOW()), ('Filtra por tipo', 0, 99, NOW(), NOW()), ('Busca valores exactos', 0, 99, NOW(), NOW()), ('Ordena datos', 0, 99, NOW(), NOW()),
('Cuenta filas', 1, 100, NOW(), NOW()), ('Suma valores', 0, 100, NOW(), NOW()), ('Promedia valores', 0, 100, NOW(), NOW()), ('Agrupa datos', 0, 100, NOW(), NOW()),

-- P101-P110: Relaciones
('Referencia a la clave primaria de otra tabla', 1, 101, NOW(), NOW()), ('Una clave duplicada', 0, 101, NOW(), NOW()), ('Siempre es numérica', 0, 101, NOW(), NOW()), ('No puede ser nula', 0, 101, NOW(), NOW()),
('Una tabla se relaciona con muchas otras', 1, 102, NOW(), NOW()), ('Una tabla con varias columnas', 0, 102, NOW(), NOW()), ('Una columna con muchos valores', 0, 102, NOW(), NOW()), ('Un registro con varios campos', 0, 102, NOW(), NOW()),
('Dos tablas con muchas a muchas', 1, 103, NOW(), NOW()), ('Una tabla grande', 0, 103, NOW(), NOW()), ('Una columna con duplicados', 0, 103, NOW(), NOW()), ('Un registro compartido', 0, 103, NOW(), NOW()),
('Una tabla se relaciona con una', 1, 104, NOW(), NOW()), ('Una columna única', 0, 104, NOW(), NOW()), ('Un registro especial', 0, 104, NOW(), NOW()), ('Una tabla pequeña', 0, 104, NOW(), NOW()),
('Combina datos de múltiples tablas', 1, 105, NOW(), NOW()), ('Copia datos', 0, 105, NOW(), NOW()), ('Agrupa datos', 0, 105, NOW(), NOW()), ('Ordena datos', 0, 105, NOW(), NOW()),
('INNER retorna solo coincidencias, LEFT retorna todas del lado izquierdo', 1, 106, NOW(), NOW()), ('Son iguales', 0, 106, NOW(), NOW()), ('LEFT es más rápido', 0, 106, NOW(), NOW()), ('INNER retorna más filas', 0, 106, NOW(), NOW()),
('Organizar datos sin redundancia', 1, 107, NOW(), NOW()), ('Crear más tablas', 0, 107, NOW(), NOW()), ('Agregar índices', 0, 107, NOW(), NOW()), ('Copiar datos', 0, 107, NOW(), NOW()),
('Eliminar dependencias de no-clave', 1, 108, NOW(), NOW()), ('Tener solo claves primarias', 0, 108, NOW(), NOW()), ('Tener solo una columna', 0, 108, NOW(), NOW()), ('No tener duplicados', 0, 108, NOW(), NOW()),
('Eliminar dependencias transitivas', 1, 109, NOW(), NOW()), ('Solo tener dos columnas', 0, 109, NOW(), NOW()), ('No tener relaciones', 0, 109, NOW(), NOW()), ('Tener solo una clave', 0, 109, NOW(), NOW()),
('Eliminar dependencias no-clave', 1, 110, NOW(), NOW()), ('Solo tener claves', 0, 110, NOW(), NOW()), ('No tener columnas', 0, 110, NOW(), NOW()), ('Tener una tabla', 0, 110, NOW(), NOW()),

-- P111-P120: Optimización
('Crear un índice en la columna de WHERE', 1, 111, NOW(), NOW()), ('Aumentar la RAM', 0, 111, NOW(), NOW()), ('Cambiar la base de datos', 0, 111, NOW(), NOW()), ('No se puede optimizar', 0, 111, NOW(), NOW()),
('Estructura que acelera búsquedas', 1, 112, NOW(), NOW()), ('Una copia de tabla', 0, 112, NOW(), NOW()), ('Una vista', 0, 112, NOW(), NOW()), ('Una relación', 0, 112, NOW(), NOW()),
('Reduce tiempo de búsqueda', 1, 113, NOW(), NOW()), ('Aumenta el tamaño', 0, 113, NOW(), NOW()), ('Copia datos', 0, 113, NOW(), NOW()), ('Agrupa datos', 0, 113, NOW(), NOW()),
('Forma en que se ejecuta una consulta', 1, 114, NOW(), NOW()), ('Una tabla temporal', 0, 114, NOW(), NOW()), ('Un índice', 0, 114, NOW(), NOW()), ('Una vista', 0, 114, NOW(), NOW()),
('Usando herramientas de análisis como EXPLAIN', 1, 115, NOW(), NOW()), ('Aumentando RAM', 0, 115, NOW(), NOW()), ('Cambiando indices', 0, 115, NOW(), NOW()), ('Clonando la tabla', 0, 115, NOW(), NOW()),
('Indexar columnas de WHERE y JOIN', 1, 116, NOW(), NOW()), ('Indexar todas las columnas', 0, 116, NOW(), NOW()), ('Crear múltiples índices simples', 0, 116, NOW(), NOW()), ('No indexar nada', 0, 116, NOW(), NOW()),
('Índice sobre múltiples columnas', 1, 117, NOW(), NOW()), ('Índice duplicado', 0, 117, NOW(), NOW()), ('Índice único', 0, 117, NOW(), NOW()), ('Índice secundario', 0, 117, NOW(), NOW()),
('Pérdida de eficiencia del índice', 1, 118, NOW(), NOW()), ('Pérdida de datos', 0, 118, NOW(), NOW()), ('Aumento de espacio', 0, 118, NOW(), NOW()), ('Pérdida de campos', 0, 118, NOW(), NOW()),
('Usando REBUILD o REORGANIZE', 1, 119, NOW(), NOW()), ('Eliminando el índice', 0, 119, NOW(), NOW()), ('Creando un nuevo índice', 0, 119, NOW(), NOW()), ('Copiando los datos', 0, 119, NOW(), NOW()),
('Muestra el plan de ejecución', 1, 120, NOW(), NOW()), ('Ejecuta la consulta', 0, 120, NOW(), NOW()), ('Crea un índice', 0, 120, NOW(), NOW()), ('Optimiza automáticamente', 0, 120, NOW(), NOW());

-- Asociar preguntas con baterías
INSERT INTO `BateriaDePreguntas_Pregunta` (`bateriaId`, `preguntaId`) VALUES
-- Batería Matemáticas (Preguntas 1-40)
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10),
(1, 11), (1, 12), (1, 13), (1, 14), (1, 15), (1, 16), (1, 17), (1, 18), (1, 19), (1, 20),
(1, 21), (1, 22), (1, 23), (1, 24), (1, 25), (1, 26), (1, 27), (1, 28), (1, 29), (1, 30),
(1, 31), (1, 32), (1, 33), (1, 34), (1, 35), (1, 36), (1, 37), (1, 38), (1, 39), (1, 40),

-- Batería Python (Preguntas 41-80)
(2, 41), (2, 42), (2, 43), (2, 44), (2, 45), (2, 46), (2, 47), (2, 48), (2, 49), (2, 50),
(2, 51), (2, 52), (2, 53), (2, 54), (2, 55), (2, 56), (2, 57), (2, 58), (2, 59), (2, 60),
(2, 61), (2, 62), (2, 63), (2, 64), (2, 65), (2, 66), (2, 67), (2, 68), (2, 69), (2, 70),
(2, 71), (2, 72), (2, 73), (2, 74), (2, 75), (2, 76), (2, 77), (2, 78), (2, 79), (2, 80),

-- Batería BD (Preguntas 81-120)
(3, 81), (3, 82), (3, 83), (3, 84), (3, 85), (3, 86), (3, 87), (3, 88), (3, 89), (3, 90),
(3, 91), (3, 92), (3, 93), (3, 94), (3, 95), (3, 96), (3, 97), (3, 98), (3, 99), (3, 100),
(3, 101), (3, 102), (3, 103), (3, 104), (3, 105), (3, 106), (3, 107), (3, 108), (3, 109), (3, 110),
(3, 111), (3, 112), (3, 113), (3, 114), (3, 115), (3, 116), (3, 117), (3, 118), (3, 119), (3, 120);

-- Exámenes
INSERT INTO `Examen` (`evaluacion`, `estado`, `asignaturaId`, `createdAt`, `updatedAt`) VALUES
('PARCIAL_1', 'GENERADO', 1, NOW(), NOW()),
('PARCIAL_1', 'GENERADO', 2, NOW(), NOW()),
('PARCIAL_1', 'GENERADO', 3, NOW(), NOW());

-- Relacionar algunas preguntas con exámenes
INSERT INTO `ExamenPregunta` (`examenId`, `preguntaId`) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
(2, 41), (2, 42), (2, 43), (2, 44), (2, 45),
(3, 81), (3, 82), (3, 83), (3, 84), (3, 85);
