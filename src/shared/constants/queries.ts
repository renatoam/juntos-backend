export const EXCLUDE_ALL_DB_CONTENT = `
DO $$ DECLARE
  r RECORD;
BEGIN
FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
    EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
END LOOP;
END $$;
`

export const INSERT_DYNAMIC_CUSTOMER = 'INSERT INTO customers(customer_id, created_on, title, first_name, last_name, email, gender, birth_date, registered, phone, cell, thumbnail, medium, large, role_id, location_id) VALUES ($1, to_timestamp($2 / 1000.0), $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);'

export const INSERT_DYNAMIC_EMPLOYEE = 'INSERT INTO employees(employee_id, created_on, title, first_name, last_name, email, gender, birth_date, registered, phone, cell, thumbnail, medium, large, role_id, occupation) VALUES ($1, to_timestamp($2 / 1000.0), $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);'

export const INSERT_DYNAMIC_LOCATION = 'INSERT INTO locations(street, city, state, postcode, latitude, longitude, off, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);'
