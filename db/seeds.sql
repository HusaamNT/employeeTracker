use employee_db;

INSERT INTO department (name) VALUES ("Engineering"), ("Mathematics"), ("Computer Science");

INSERT INTO role (title, salary, department_id) 
VALUES 
("Manager", 60000, 1), 
("Coder", 40000, 3), 
("Teacher", 30000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Sean", "New", 2, NULL),
("Husaam", "Tariq", 2, 1),
("Sam", "Jones", 3, 2),
("Hamzah", "Alex", 1, 2);
