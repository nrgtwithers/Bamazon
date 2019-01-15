DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER(30) NOT NULL,
    stock_quantity INTEGER(30) NOT NULL,
    PRIMARY KEY (ID)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Drums","Music",1500, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pianos","Music",2000,5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Guitars","Music",1100,12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Notebooks","School",3,100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Calculator","School",125,50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pens","School",6,1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Blankets","Bedding",100,100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Body Pillows","Bedding",50,50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bowls","Kitchen",10,2000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Knives","Kitchen",99,100);

SELECT * FROM products;