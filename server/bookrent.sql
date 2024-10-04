create database PizzaOrder;



CREATE TABLE users(
  user_id VARCHAR(255) PRIMARY KEY,
  user_email VARCHAR(255) UNIQUE,
  user_password VARCHAR(255),
  user_phone VARCHAR(255),
  user_restaurant VARCHAR(255),
  user_location VARCHAR(255),
  user_type VARCHAR(255),
  user_profile VARCHAR(255),
  user_status VARCHAR(255)
); 

ALTER TABLE users ADD user_name varchar(255) AFTER user_id;



CREATE TABLE customers(
  customer_id VARCHAR(255) PRIMARY KEY,
  customer_email VARCHAR(255) UNIQUE,
  customer_password VARCHAR(255),
  customer_location VARCHAR(255),
  customer_phone VARCHAR(255)
); 



CREATE TABLE roles(
  role_id VARCHAR(255) PRIMARY KEY,
  role_name VARCHAR(255) UNIQUE,
  permissions VARCHAR(255),
  created_at VARCHAR(255),
  role_status VARCHAR(255)
);


CREATE TABLE menus(
  menu_id VARCHAR(255) PRIMARY KEY,
  menu_name VARCHAR(255),
  topping VARCHAR(255),
  price VARCHAR(255),
  photo VARCHAR(255),
  restaurant VARCHAR(255)
); 

CREATE TABLE orders(
  order_id VARCHAR(255) PRIMARY KEY,
  customer_id VARCHAR(255),
  menu_name VARCHAR(255),
  topping VARCHAR(255),
  price VARCHAR(255),
  quantity INT,
  restaurant VARCHAR(255),
  order_status VARCHAR(255),
  created_at VARCHAR(255)
); 

CREATE TABLE accounts(
  user_id VARCHAR(255) PRIMARY KEY,
  user_email VARCHAR(255) UNIQUE,
  user_password VARCHAR(255),
  user_role VARCHAR(255)
); 
