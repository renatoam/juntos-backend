CREATE TABLE IF NOT EXISTS address (
  location_id UUID PRIMARY KEY,
  street VARCHAR(50) NOT NULL,
  city VARCHAR(20) NOT NULL,
  state VARCHAR(15) NOT NULL,
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
