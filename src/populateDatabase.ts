import { readFileSync } from 'fs'
import { v4 as uuid } from 'uuid'
import { client } from './shared/infrastructure/database/postgres'
import { runMigrations } from './shared/infrastructure/database/postgres/runMigrations'
import { CustomerProps } from './subdomains/customers/domain/CustomerProps'

const EXCLUDE_ALL_DB_CONTENT = `
DO $$ DECLARE
  r RECORD;
BEGIN
FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
    EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
END LOOP;
END $$;
`
const QUERY_CUSTOMERS_EXISTS = "SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'customers');"
const INSERT_DYNAMIC_CUSTOMER = 'INSERT INTO customers(customer_id, created_on, title, first_name, last_name, email, gender, birth_date, registered, phone, cell, role_id) VALUES ($1, to_timestamp($2 / 1000.0), $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);'
const VIEWER_ROLE_ID = 3
const extractCustomerData = (item: CustomerProps) => ([
  uuid(),
  Date.now(),
  item.name.title,
  item.name.first,
  item.name.last,
  item.email,
  item.gender,
  item.dob?.date,
  item.registered?.date,
  item.phone,
  item.cell,
  VIEWER_ROLE_ID
])

export async function populateDatabase() {
  const bufferData = readFileSync('customers.json')
  const jsonData = bufferData.toString('utf-8')
  const jsData = JSON.parse(jsonData)

  client.connect()

  try {
    await client.query(EXCLUDE_ALL_DB_CONTENT)
  } catch (error) {
    console.error("Something goes wrong on cleaning database. Please, try again later.")
  }
  
  try {
    runMigrations()
  } catch (error) {
    console.error("Something goes wrong on running migrations. Please, try again later.")
  }
  
  setTimeout(() => {
    jsData.results.map(async (item: CustomerProps) => {
      try {
        const customerData = extractCustomerData(item)
        await client.query(INSERT_DYNAMIC_CUSTOMER, customerData)
      } catch (error) {
        console.error({ error })
      }
    })
  }, 1000)
}

