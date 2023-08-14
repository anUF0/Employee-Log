-- Inserts Dummy Names into 'departments' Table --
INSERT INTO departments(name) VALUES
  ('Engineering'),
  ('Finance'),
  ('Legal'),
  ('Sales');

-- Inserts Dummy Names into 'roles' Table --
INSERT INTO roles
(title, salary, department_id)
VALUES
('Particle Beam Engineer', 125000, 1), -- 1 --
('Propulsion Technician',100000, 1), -- 2 --
('Accountant', 100000, 2), -- 3 --
('Chef', 120000, 2), -- 4 --
('Head of Legal', 120000, 2), -- 5 --
('Prosecutor', 90000, 3), -- 6 --
('Attorney', 110000, 3), -- 7 --
('Salt Merchant', 50000, 4), -- 8 --
('Sales Head', 125000, 4); -- 9 --

--  Inserts Dummy Names into 'employees' Table --
INSERT INTO employees
(first_name, last_name, role_id, manager_id)
VALUES
('Jimmy','Schmitz',1, null), -- 1 --
('Tem','Ray', 2, 1), -- 2 --
('Evelynn','Raine', 2, null),  -- 3 --
('Derrick','Savage', 4, 3),  -- 4 --
('Cap','Com', 5, null),  -- 5 -- --
('Phoenix','Wright', 7, 5),  -- 6 --
('Miles','Edgeworth', 6, 5), -- 7 --
('Barbra','White', 9, null),  -- 8 --
('Joan', 'Fishhook', 8, 8);  -- 9 --