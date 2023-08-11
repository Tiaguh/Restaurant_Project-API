CREATE DATABASE Restaurant_Project;

USE Restaurant_Project;

-- DROP DATABASE Restaurant_Project;

CREATE TABLE MenuItem (
    item_id INT NOT NULL AUTO_INCREMENT,
    item_name VARCHAR(45) NOT NULL,
    item_description VARCHAR(400) NOT NULL,
    item_price DECIMAL(5,2) NOT NULL,
    item_img VARCHAR(255),
    
    PRIMARY KEY(item_id)
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
    id_purchase INT NOT NULL AUTO_INCREMENT,
    methodo_pay VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FK_item_request INT NOT NULL,
    FK_id_user INT NOT NULL,
    
    PRIMARY KEY(id_purchase),
    
    CONSTRAINT FK_item_request FOREIGN KEY(FK_item_request) REFERENCES MenuItem(item_id),
    CONSTRAINT FK_id_User FOREIGN KEY(FK_id_user) REFERENCES User(id)
);

CREATE TABLE Cart (
    id_cart INT NOT NULL AUTO_INCREMENT,
    item_id INT NOT NULL,
    user_id INT NOT NULL,
    quantity INT NOT NULL,
    
    PRIMARY KEY(id_cart),
    
    CONSTRAINT FK_cart_item FOREIGN KEY(item_id) REFERENCES MenuItem(item_id),
    CONSTRAINT FK_cart_user FOREIGN KEY(user_id) REFERENCES User(id)
);
