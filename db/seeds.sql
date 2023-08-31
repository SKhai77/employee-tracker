-- Reference source to the "schema.sql" file for this construction.
-- Inserts the names of different departments into department table
INSERT INTO department (name)
VALUES ("Engineering"), 
       ("Finance"), 
       ("Legal"),

-- Inserts the title, salary, and department id of employee role into role table
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant Manager", 160000, 2), 
       ("Accountant", 125000, 2), 
       ("Legal Team Lead", 250000, 3), 
       ("Lawyer", 190000, 3), 
       ("Lead Engineer", 150000, 1),
       ("Software Engineer", 100000, 1), 
       ("Sales Lead", 100000, 4), 
       ("Salesperson", 80000, 4); 
       
-- Inserts the employees' first name, last name, role id, and manager id into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL), 
       ("Mike", "Chan", 2, 1), 
       ("Tom", "Allen", 3, NULL), 
       ("Kunal", "Singh", 4, 3),
       ("Malia", "Brown", 5, NULL), 
       ("Ashley", "Rodriguez", 6, 5),
       ("Sam", "Kash", 7, NULL), 
       ("Kevin", "Tupik", 8, 7); 

