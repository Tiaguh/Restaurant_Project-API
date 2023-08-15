CREATE DATABASE Restaurant_Project;

USE Restaurant_Project;

-- DROP DATABASE Restaurant_Project;

CREATE TABLE Menu (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    description VARCHAR(400) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    img VARCHAR(255),
    
    PRIMARY KEY(id)
);

CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(250)
);

CREATE TABLE Admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Purchase (
    id INT NOT NULL AUTO_INCREMENT,
    methodo_pay VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    item_id INT NOT NULL,
    user_id INT NOT NULL,
        
    PRIMARY KEY(id),
    
    CONSTRAINT FK_item_purchase FOREIGN KEY(item_id) REFERENCES Menu(id),
    CONSTRAINT FK_user_purchase FOREIGN KEY(user_id) REFERENCES User(id)
);

CREATE TABLE Cart (
    id INT NOT NULL AUTO_INCREMENT,
    item_id INT NOT NULL,
    user_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT '1',
    
    PRIMARY KEY(id),
    
    CONSTRAINT FK_cart_item FOREIGN KEY(item_id) REFERENCES Menu(id),
    CONSTRAINT FK_cart_user FOREIGN KEY(user_id) REFERENCES User(id)
);
