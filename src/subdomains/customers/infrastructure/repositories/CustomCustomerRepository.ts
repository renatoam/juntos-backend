import { client } from "../../../../shared/infrastructure/database/postgres";
import { LocationType } from "../../../../shared/types";
import { Customer } from "../../domain/Customer";
import { CustomerMapper } from "../mappers/CustomerMapper";
import { UpdateCustomerToPersistence } from "../mappers/UpdateCustomerMapperType";
import { CustomerRepository } from "./CustomerRepository";

export class CustomCustomerRepository implements CustomerRepository {
  async updateLocation(location: LocationType): Promise<void> {
      console.log({ location })
  }

  async updateCustomer(updateCustomer: UpdateCustomerToPersistence): Promise<void> {
    const customerFields = updateCustomer.customer
    // const locationFields = updateCustomer.location

    const insertQueryFields = Object.keys(customerFields)
    const insertQueryValues = Object.values(customerFields).map(value => `'${value}'`)
    const upsertQueryStatement = Object.keys(customerFields).map(key => `${key} = excluded.${key}`).join(', ')
    const query = `INSERT INTO customers(${insertQueryFields}) VALUES(${insertQueryValues}) ON CONFLICT (email) DO UPDATE SET ${upsertQueryStatement};`

    await client.query(query)
  }

  async exists(customerEmail: string): Promise<boolean> {
    const result = await client.query(`SELECT * FROM customers WHERE email = '${customerEmail}';`)

    return !!result.rows.length
  }
  
  async save(customer: Customer): Promise<void> {
    const newCustomer = CustomerMapper.toPersistence(customer)
    const insertQueryFields = Object.keys(newCustomer)
    const insertQueryValues = Object.values(newCustomer).map(value => `'${value}'`)
    const query = `INSERT INTO customers(${insertQueryFields}) VALUES(${insertQueryValues});`

    await client.query(query)
  }

  async remove(customerEmail: string): Promise<boolean> {
    const query = `DELETE FROM customers WHERE email = '${customerEmail}';`
    const response = await client.query(query)

    return !!response.rowCount
  }

  getCustomerById(_customerId: string): Promise<Customer> {
    throw new Error("Method not implemented.");
  }
  
  async getCustomerByEmail(customerEmail: string): Promise<Customer> {
    const customerResult = await client.query(`SELECT * FROM customers LEFT JOIN locations_customers ON customers.customer_id = locations_customers.customer_id LEFT JOIN locations ON locations_customers.location_id = locations.location_id where email = '${customerEmail}';`)

    if (!customerResult.rows.length) throw Error('Customer does not exist.')

    return CustomerMapper.toDomain(customerResult.rows[0])
  }
  
  async getAllCustomers(): Promise<Customer[]> {
    const result = await client.query('SELECT * FROM customers LEFT JOIN locations_customers ON INNER JOIN locations USING(location_id) LIMIT 20;')

    return result.rows.map(customer => CustomerMapper.toDomain(customer))
  }
}
