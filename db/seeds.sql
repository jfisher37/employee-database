INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 1),
       ("Engineer", 75000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Merv", "Schneider", 1, null),
       ("Mary", "Stillman", 2, 1);