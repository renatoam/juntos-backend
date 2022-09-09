CREATE TABLE IF NOT EXISTS roles (
  role_id SERIAL PRIMARY KEY,
  description VARCHAR(20)
);

INSERT INTO roles(description) VALUES ('ADMIN');
INSERT INTO roles(description) VALUES ('EDITOR');
INSERT INTO roles(description) VALUES ('VIEWER');

CREATE TABLE IF NOT EXISTS locations (
  location_id UUID PRIMARY KEY,
  street VARCHAR(50) NOT NULL,
  city VARCHAR(30) NOT NULL,
  state VARCHAR(20) NOT NULL,
  postcode NUMERIC NOT NULL,
  latitude VARCHAR(20),
  longitude VARCHAR(20),
  off VARCHAR(10),
  description VARCHAR(50)
);

INSERT INTO locations(location_id, street, city, state, postcode, latitude, longitude, off, description) VALUES ('47793726-4d8d-4920-9608-aae2e26b9313', '3833 rua santa catarina', 'umuarama', 'santa catarina', 43646, '-50.7186', '-20.4596', '+3:00', 'Baghdad, Riyadh, Moscow, St. Petersburg');

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
  thumbnail VARCHAR(100),
  medium VARCHAR(100),
  large VARCHAR(100),
  role_id INTEGER,
  CONSTRAINT fk_role
    FOREIGN KEY (role_id)
      REFERENCES roles(role_id)
);

INSERT INTO customers(customer_id, created_on, title, first_name, last_name, email, gender, birth_date, registered, phone, cell, thumbnail, medium, large, role_id) VALUES ('828e9367-0ad5-47f0-8415-a0c243b7f500', now(), 'Mr.', 'Renato', 'Alves', 'renato@gmail.com', 'male', '1992-03-03', '2016-11-21', '11973021653', null, null, null, null, 3);

-- INSERT INTO customers(customer_id, created_on, title, first_name, last_name, email, gender, birth_date, registered, phone, cell, thumbnail, medium, large, role_id) VALUES ('828e9367-0ad5-47f0-8415-a0c243b7f500', now(), 'Mr.', 'Renato', 'Alves', 'renato@gmail.com', 'male', '1992-03-03', '2016-11-21', '11973021653', null, null, null, null, 3) ON CONFLICT (customer_id) DO UPDATE SET email = 'renato@hotmail.com';

CREATE TABLE IF NOT EXISTS employees (
  employee_id UUID PRIMARY KEY,
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
  thumbnail VARCHAR(100),
  medium VARCHAR(100),
  large VARCHAR(100),
  role_id INTEGER,
  occupation VARCHAR(50),
  CONSTRAINT fk_role
    FOREIGN KEY (role_id)
      REFERENCES roles(role_id)
);

INSERT INTO employees(employee_id, created_on, title, first_name, last_name, email, gender, birth_date, registered, phone, cell, thumbnail, medium, large, role_id, occupation) VALUES ('545e9367-0ad5-47f0-8415-a0c243b7f512', now(), 'Mr.', 'Renato', 'Melo', 'alves@gmail.com', 'male', '1992-03-03', '2016-11-21', '11973021653', null, null, null, null, 1, 'Software Engineer');

CREATE TABLE IF NOT EXISTS permissions (
  permission_id SERIAL PRIMARY KEY,
  description VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS permissions_roles (
  role_id INTEGER,
  permission_id INTEGER,
  CONSTRAINT pk_permission_roles
    PRIMARY KEY(permission_id, role_id),
  CONSTRAINT fk_permission_roles
    FOREIGN KEY(permission_id)
      REFERENCES permissions(permission_id),
  CONSTRAINT fk_roles_permission
    FOREIGN KEY(role_id)
      REFERENCES roles(role_id)
);

CREATE TABLE IF NOT EXISTS locations_customers (
  location_id UUID,
  customer_id UUID,
  CONSTRAINT pk_locations_customers
    PRIMARY KEY(location_id, customer_id)
);

INSERT INTO locations_customers(location_id, customer_id) VALUES('47793726-4d8d-4920-9608-aae2e26b9313', '828e9367-0ad5-47f0-8415-a0c243b7f500');
