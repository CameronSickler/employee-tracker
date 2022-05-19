-- drop table commands here
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;


-- create tables here

CREATE TABLE department (
id INTEGER AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
id INTEGER AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL,
department_id INTEGER,
PRIMARY KEY (id),
FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
id INTEGER AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER,
manager_id INTEGER,
PRIMARY KEY (id, manager_id),
FOREIGN KEY (roles_id) REFERENCES role(id)
);