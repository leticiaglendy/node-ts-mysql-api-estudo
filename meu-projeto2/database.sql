CREATE DATABASE IF NOT EXISTS teste_db;

USE teste_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100)
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10, 2)
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  product_id INT,
  quantity INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO users (name, email) VALUES
('João Silva', 'joao@example.com'),
('Maria Souza', 'maria@example.com'),
('Carlos Lima', 'carlos@example.com');

INSERT INTO products (name, price) VALUES
('Notebook Lenovo', 3500.00),
('Teclado Mecânico', 250.00),
('Mouse Gamer', 180.00);

INSERT INTO orders (user_id, product_id, quantity) VALUES
(1, 1, 1),  -- João comprou 1 Notebook
(2, 2, 2),  -- Maria comprou 2 Teclados
(3, 3, 1);  -- Carlos comprou 1 Mouse

SELECT * FROM users;
SELECT * FROM products;
SELECT * FROM orders;
