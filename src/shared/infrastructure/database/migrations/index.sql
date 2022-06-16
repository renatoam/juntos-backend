CREATE TABLE IF NOT EXISTS roles (
  role_id UUID PRIMARY KEY,
  description VARCHAR(20)
);

-- INSERT INTO roles(role_id, description) VALUES ('a81bc81b-dead-4e5d-abff-90865d1e13b1', 'ADMIN');
-- INSERT INTO roles(role_id, description) VALUES ('b81bc81b-dead-4e5d-abff-90865d1e13b2', 'EDITOR');
-- INSERT INTO roles(role_id, description) VALUES ('c81bc81b-dead-4e5d-abff-90865d1e13b3', 'VIEWER');

CREATE TABLE IF NOT EXISTS customers (
  customer_id UUID PRIMARY KEY,
  created_on TIMESTAMP NOT NULL, 
  title VARCHAR(10),
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  gender VARCHAR(10),
  birth_date DATE NOT NULL,
  registered DATE NOT NULL,
  phone VARCHAR(30),
  cell VARCHAR(30),
  role_id UUID,
  CONSTRAINT fk_role
    FOREIGN KEY (role_id)
      REFERENCES roles(role_id)
);

ALTER TABLE customers
ALTER COLUMN created_on TYPE TIMESTAMP;

-- INSERT INTO customers(customer_id, created_on, title, first_name, last_name, email, gender, birth_date, registered, phone, cell, role_id) VALUES ('b81bc81b-dead-4e5d-abff-90865d1e13b0', now(), 'Mr.', 'Renato', 'Melo', 'renato@alves.com', 'male', '1992-03-03', '2016-11-12 19:10:25-07', null, '11973021653', 'c81bc81b-dead-4e5d-abff-90865d1e13b3');

CREATE TABLE IF NOT EXISTS employees (
  employee_id UUID PRIMARY KEY,
  created_on TIMESTAMP NOT NULL, 
  title VARCHAR(10),
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  gender VARCHAR(10),
  birth_date DATE NOT NULL,
  hire DATE NOT NULL,
  phone VARCHAR(30),
  cell VARCHAR(30),
  occupation VARCHAR(50),
  role_id UUID,
  CONSTRAINT fk_role
    FOREIGN KEY (role_id)
      REFERENCES roles(role_id)
);

-- INSERT INTO employees(employee_id, created_on, title, first_name, last_name, email, gender, birth_date, hire, phone, cell, occupation, role_id) VALUES ('e81bc81b-dead-4e5d-abff-90865d1e13b1', now(), 'Ms.', 'Saori', 'Kido', 'atena@outlook.com', 'female', '1973-01-09', '1983-01-24 19:10:25-07', null, '11973021653', 'God of Justice and War', 'a81bc81b-dead-4e5d-abff-90865d1e13b1');

CREATE TABLE IF NOT EXISTS locations (
  location_id UUID PRIMARY KEY,
  street VARCHAR(50) NOT NULL,
  city VARCHAR(30) NOT NULL,
  state VARCHAR(20) NOT NULL,
  postcode NUMERIC NOT NULL,
  latitude VARCHAR(20),
  longitude VARCHAR(20),
  offsett VARCHAR(10),
  description VARCHAR(50),
  customer_id UUID,
  CONSTRAINT fk_customer_location
    FOREIGN KEY(customer_id)
      REFERENCES customers(customer_id)
);

CREATE TABLE IF NOT EXISTS pictures (
  picture_id UUID PRIMARY KEY,
  thumbnail VARCHAR(100) NOT NULL,
  medium VARCHAR(100),
  large VARCHAR(100),
  customer_id UUID,
  CONSTRAINT fk_customer_picture
    FOREIGN KEY(customer_id)
      REFERENCES customers(customer_id)
);

CREATE TABLE IF NOT EXISTS permissions (
  permission_id UUID PRIMARY KEY,
  description VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS permissions_roles (
  role_id UUID,
  permission_id UUID,
    CONSTRAINT pk_permission_roles
      PRIMARY KEY(permission_id, role_id),
    CONSTRAINT fk_permission_roles
      FOREIGN KEY(permission_id)
        REFERENCES permissions(permission_id),
    CONSTRAINT fk_roles_permission
      FOREIGN KEY(role_id)
        REFERENCES roles(role_id)
);
