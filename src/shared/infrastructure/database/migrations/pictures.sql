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
