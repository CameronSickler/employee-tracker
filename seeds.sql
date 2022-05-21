INSERT INTO departments (id, names)
VALUES
(1, 'Sales'),
(2, 'Engineering'),
(3, 'Finance'),
(4, 'Legal');

INSERT INTO roles (id, title, salary, department_id)
VALUES
(1, 'Salesperson', '80000', 1),
(2, 'Lead Engineer', '150000', 2),
(3, 'Software Engineer', '120000', 2),
(4, 'Account Manager', '160000', 3),
(5, 'Accountant', '125000', 3),
(6, 'Legal Team Lead', '250000', 4),
(7, 'Lawyer', '190000', 4);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES
(1, 'Mike', 'Jones', 4, NULL),
(2, 'Sara', 'Thomas', 1, NULL),
(3, 'David', 'White', 1, NULL),
(4, 'Angie', 'Greene', 3, NULL),
(5, 'Taylor', 'Johnson', 6, NULL),
(6, 'Kyle', 'Erickson', 5, 1),
(7, 'Cody', 'Nickels', 7, NULL),
(8, 'Ashley', 'Francis', 2, NULL);