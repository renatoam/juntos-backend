import { readFileSync } from 'fs'
import { v4 as uuid } from 'uuid'
import { client } from './shared/infrastructure/database/postgres'
import { CustomerProps } from './subdomains/customers/domain/CustomerProps'

const QUERY_CUSTOMERS_EXISTS = "SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = 'customers');"
const INSERT_DYNAMIC_CUSTOMER = 'INSERT INTO customers(customer_id, created_on, title, first_name, last_name, email, gender, birth_date, registered, phone, cell, role_id) VALUES ($1, to_timestamp($2 / 1000.0), $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);'
const VIEWER_ROLE_ID = 'c81bc81b-dead-4e5d-abff-90865d1e13b3'
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

export function getDataFromJson() {
  const bufferData = readFileSync('data.json')
  const jsonData = bufferData.toString('utf-8')
  const jsData = JSON.parse(jsonData)

  jsData.results.map(async (item: CustomerProps) => {
    try {
      const result = await client.query(QUERY_CUSTOMERS_EXISTS)

      if (!!result.rows[0].exists) return
    } catch (error) {
      console.error("Something goes wrong on trying check database status. Please, try again later.")
    }

    try {
      const customerData = extractCustomerData(item)
      client.query(INSERT_DYNAMIC_CUSTOMER, customerData)
    } catch (error) {
      console.error({ error })
    }
  })
}

