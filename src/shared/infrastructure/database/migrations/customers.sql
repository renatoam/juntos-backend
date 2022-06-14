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
  phone VARCHAR(20),
  cell VARCHAR(20)
);
