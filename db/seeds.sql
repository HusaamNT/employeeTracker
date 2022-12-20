use employee_db;

INSERT INTO department (name) VALUES ("Engineering"), ("Mathematics"), ("Computer Science");

INSERT INTO role (title, salary, department_id) 
VALUES 
("Manager", 60000, 1), 
("Coder", 40000, 3), 
("Teacher", 30000, 2);

