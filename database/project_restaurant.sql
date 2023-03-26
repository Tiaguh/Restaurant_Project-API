CREATE DATABASE IF NOT EXISTS Restaurant_Project;

USE Restaurant_Project;

-- DROP DATABASE Restaurant_Project;

CREATE TABLE IF NOT EXISTS Menu(
	id_item INT NOT NULL AUTO_INCREMENT,
    item_name VARCHAR(45) NOT NULL,
    item_description VARCHAR(400) NOT NULL,
    item_price decimal(5,2) NOT NULL,
	
	PRIMARY KEY(id_item)
);

CREATE TABLE IF NOT EXISTS Users(
	id int primary key auto_increment,
    name varchar(50) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    address VARCHAR (250)
);

CREATE TABLE IF NOT EXISTS Purchase(
	id_purchase INT NOT NULL AUTO_INCREMENT,
    methodo_pay VARCHAR (20) NOT NULL,
    quant int not null,
	PRIMARY KEY(id_purchase),
    
    FK_item_request INT NOT NULL,
	FK_id_user INT NOT NULL,
    
    CONSTRAINT FK_item_request FOREIGN KEY(FK_item_request) REFERENCES Menu(id_item),
	CONSTRAINT FK_id_User FOREIGN KEY(FK_id_user) REFERENCES Users(id)
);

INSERT INTO Menu VALUES
(default, "sushi", "uma delicia", 1.99);

INSERT INTO Users VALUES 
(default, "Tiago", "sla@sla.sla", "12345", "logo ali");

INSERT INTO Purchase VALUES
(default, "fiado", "5", 1, 1);

-- -------------------------------------------------------------------
CREATE VIEW PurchaseView AS 
	SELECT id as user_id, methodo_pay, quant, name, item_name, item_price, item_description, (item_price * quant) AS total FROM Purchase 
    JOIN Users u ON u.id =  FK_id_user
    JOIN Menu ON id_item = FK_item_request;
-- --------------------------------------------------------------------------

SELECT * FROM PurchaseView;
SELECT * FROM PurchaseView WHERE user_id = 1; -- pega as compras apenas do usuario cm id 1