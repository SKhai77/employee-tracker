-- Reference source to the "schema.sql" file for this construction.
-- Inserts the names of different departments into department table
INSERT INTO department (name)
VALUES ("Engineering"), -- Every tables has their own individual id starting from number 1 and the number will Increase Automatically since it is made to do AUTO_INCREMENT in the Schema.sql file.
       ("Finance"), -- Department ID 2. Because this is in the Second line of this department table.
       ("Legal"), -- Department ID 3. Because this is in the Third line of this department table.
       ("Sales"); -- Department ID 4. Because this is in the Fourth line of this department table.

-- Inserts the title, salary, and department id of employee role into role table
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant Manager", 160000, 2), -- The depmart_id is '2' as the Accountant Manager is under Finance which is in the "second line" of the "department" table (see above "department table).
       ("Accountant", 125000, 2), -- This position is under Finance and the id is 2 as it is in the second line of the department table.
       ("Legal Team Lead", 250000, 3), -- This position is under Legal and the id is 3 as it is in the Third line of the department table.
       ("Lawyer", 190000, 3), -- This position is under Legal and the id is 3 as it is in the Third line of the department table.
       ("Lead Engineer", 150000, 1), -- This position is under Enginnering and the id is 1 as it is in the First line of the department table.
       ("Software Engineer", 100000, 1), -- This position is under Enginnering and the id is 1 as it is in the First line of the department table.
       ("Sales Lead", 100000, 4), -- This position is under Sales and the id is 4 as it is in the Fourth line of the department table.
       ("Salesperson", 80000, 4); -- This position is under Sales and the id is 4 as it is in the Fourth line of the department table.
       
-- Inserts the employees' first name, last name, role id, and manager id into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL), -- John Doe is assigned as 'Accountant Manager' which is under the 'role' table in the very first(1) line of the table(see above "role" table). That is why the "role_id" is '1'. "NULL" means he has no manager.
       ("Mike", "Chan", 2, 1), -- Assigned as 'Accountant' and the id is '2'. His manager is John Doe and the id is '1'.
       ("Tom", "Allen", 3, NULL), -- Assigned as Legal Team Lead
       ("Kunal", "Singh", 4, 3), -- Assigned as Lawyer
       ("Malia", "Brown", 5, NULL), -- Assigned as Lead Engineer
       ("Ashley", "Rodriguez", 6, 5), -- Assigned as Software Engineer
       ("Sam", "Kash", 7, NULL), -- Assigned as Sales Lead
       ("Kevin", "Tupik", 8, 7); -- Assigned as Salesperson

