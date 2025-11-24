CREATE DATABASE IF NOT EXISTS 4710421_expo;
USE 4710421_expo;
-- Usuarios que compran boletos
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    fecha TEXT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserción de datos de ejemplo para la tabla usuarios
INSERT INTO usuarios (nombre, email, telefono, fecha, total) VALUES
('Ana García', 'ana.garcia@email.com', '5512345678', '2025-05-10', 900.00),
('Luis Pérez', 'luis.perez@email.com', '5587654321', '2025-06-22', 450.00),
('Marta López', 'marta.lopez@email.com', '5511223344', '2025-07-01', 1350.00);

-- Tarjetas asociadas al usuario
CREATE TABLE tarjetas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    numero VARCHAR(20) NOT NULL,
    expiracion VARCHAR(7) NOT NULL,
    cvv VARCHAR(5) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
-- Inserción de datos de ejemplo para la tabla tarjetas
INSERT INTO tarjetas (usuario_id, numero, expiracion, cvv) VALUES
(1, '4111********1234', '12/28', '456'), -- Tarjeta de Ana García
(2, '5555********5678', '07/26', '123'), -- Tarjeta de Luis Pérez
(3, '4000********9012', '03/27', '789'); -- Tarjeta de Marta López
-- Boletos comprados
CREATE TABLE boletos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL CHECK (precio_unitario >= 0),
    total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
-- Inserción de datos de ejemplo para la tabla boletos
INSERT INTO boletos (usuario_id, cantidad, precio_unitario, total) VALUES
(1, 2, 450.00, 900.00), -- 2 boletos para Ana
(2, 1, 450.00, 450.00), -- 1 boleto para Luis
(3, 3, 450.00, 1350.00); -- 3 boletos para Marta

-- Mostrar los datos de la tabla usuarios
SELECT * FROM usuarios;

-- Mostrar los datos de la tabla tarjetas
SELECT * FROM tarjetas;

-- Mostrar los datos de la tabla boletos
SELECT * FROM boletos;

