CREATE DATABASE Restaurant_Project;

USE Restaurant_Project;

-- DROP DATABASE Restaurant_Project;

CREATE TABLE MenuItem (
    item_id INT NOT NULL AUTO_INCREMENT,
    item_name VARCHAR(45) NOT NULL,
    item_description VARCHAR(400) NOT NULL,
    item_price DECIMAL(5,2) NOT NULL,
    PRIMARY KEY(id_item)
);

CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(250)
);

CREATE TABLE Purchase (
    id_purchase INT NOT NULL AUTO_INCREMENT,
    methodo_pay VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FK_item_request INT NOT NULL,
    FK_id_user INT NOT NULL,
    
    PRIMARY KEY(id_purchase),
    
    CONSTRAINT FK_item_request FOREIGN KEY(FK_item_request) REFERENCES MenuItem(id_item),
    CONSTRAINT FK_id_User FOREIGN KEY(FK_id_user) REFERENCES User(id)
);

--  CREATE VIEW PurchaseView AS 
-- 	SELECT id as user_id, methodo_pay, quant, name, item_name, item_price, item_description, (item_price * quant) AS total FROM Purchase 
--     JOIN Users u ON u.id =  FK_id_user
--     JOIN Menu ON id_item = FK_item_request;