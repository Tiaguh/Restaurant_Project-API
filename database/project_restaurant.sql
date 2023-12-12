CREATE DATABASE Restaurant_Project;

USE Restaurant_Project;

-- DROP DATABASE Restaurant_Project;

-- Tabela que guarda os itens que o cliente pode comprar, bem como descrição e preço do produto.
CREATE TABLE Menu (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    description VARCHAR(400) NOT NULL,
    price DECIMAL(5, 2) NOT NULL,
    image_url VARCHAR(255),
    PRIMARY KEY(id)
);


-- Guarda as informações do usuário, como email e senha.
CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL
);

-- Guarda informações para administradores poderem logar.
CREATE TABLE Admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Guarda os pedidos dos usuários.
CREATE TABLE Requests (
    id_request INT NOT NULL AUTO_INCREMENT,
    date DATE DEFAULT CURRENT_DATE,
    hour TIME DEFAULT CURRENT_TIME,
    item_id INT NOT NULL,
    user_id INT NOT NULL,
    quantity INT NOT NULL,
    STATUS VARCHAR(20) NOT NULL DEFAULT 'Pendente',
    PRIMARY KEY(id_request),
    
    CONSTRAINT FK_item_request FOREIGN KEY(item_id) REFERENCES Menu(id),
    CONSTRAINT FK_user_request FOREIGN KEY(user_id) REFERENCES User(id)
);

-- Armazena os itens que o usuário coloca no carrinho.
CREATE TABLE Cart (
    id INT NOT NULL AUTO_INCREMENT,
    item_id INT NOT NULL,
    user_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT '1',
    PRIMARY KEY(id),

    CONSTRAINT FK_cart_item FOREIGN KEY(item_id) REFERENCES Menu(id),
    CONSTRAINT FK_cart_user FOREIGN KEY(user_id) REFERENCES User(id)
);