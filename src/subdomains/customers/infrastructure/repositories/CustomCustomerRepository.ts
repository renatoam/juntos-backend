import { client } from "../../../../shared/infrastructure/database/postgres";
import { LocationToPersistence } from "../../../../shared/infrastructure/mappers/LocationMapperType";
import { Customer } from "../../domain/Customer";
import { CustomerMapper } from "../mappers/CustomerMapper";
import { UpdateCustomerToPersistence } from "../mappers/UpdateCustomerMapperType";
import { CustomerRepository } from "./CustomerRepository";

export class CustomCustomerRepository implements CustomerRepository {
  async updateLocation(location: LocationToPersistence): Promise<void> {
    const insertQueryFields = Object.keys(location)
    const insertQueryValues = Object.values(location).map(value => `'${value}'`)
    const upsertQueryAction = Object.keys(location).map(key => `${key} = excluded.${key}`).join(', ')
    const query = `INSERT INTO locations(${insertQueryFields}) VALUES(${insertQueryValues}) ON CONFLICT (location_id) DO UPDATE SET ${upsertQueryAction};`

    try {
      await client.query(query)
    } catch (error) {
      const errorMessage = (error as Error).message
      throw Error(errorMessage)
    }
  }

  async updateCustomer(updateCustomer: UpdateCustomerToPersistence): Promise<void> {
    const customerFields = updateCustomer.customer

    const insertQueryFields = Object.keys(customerFields)
    const insertQueryValues = Object.values(customerFields).map(value => `'${value}'`)
    const upsertQueryAction = Object.keys(customerFields).map(key => `${key} = excluded.${key}`).join(', ')
    const query = `INSERT INTO customers(${insertQueryFields}) VALUES(${insertQueryValues}) ON CONFLICT (email) DO UPDATE SET ${upsertQueryAction};`

    try {
      await client.query(query)
    } catch (error) {
      const errorMessage = (error as Error).message
      throw Error(errorMessage)
    }

    await this.updateLocation(updateCustomer.location)
  }

  async exists(customerEmail: string): Promise<boolean> {
    try {
      const result = await client.query(`SELECT * FROM customers WHERE email = '${customerEmail}';`)

      return !!result.rows.length
    } catch (error) {
      const errorMessage = (error as Error).message
      throw Error(errorMessage)
    }
  }
  
  async save(customer: Customer): Promise<void> {
    const newCustomer = CustomerMapper.toPersistence(customer)
    const insertQueryFields = Object.keys(newCustomer)
    const insertQueryValues = Object.values(newCustomer).map(value => `'${value}'`)
    const query = `INSERT INTO customers(${insertQueryFields}) VALUES(${insertQueryValues});`

    try {
      await client.query(query)
    } catch (error) {
      const errorMessage = (error as Error).message
      throw Error(errorMessage)
    }
  }

  async remove(customerEmail: string): Promise<boolean> {
    const query = `DELETE FROM customers WHERE email = '${customerEmail}';`

    try {
      const response = await client.query(query)

      return !!response.rowCount
    } catch (error) {
      const errorMessage = (error as Error).message
      throw Error(errorMessage)
    }
  }

  getCustomerById(_customerId: string): Promise<Customer> {
    throw new Error("Method not implemented.");
  }

  // SELECT * FROM customers INNER JOIN locations_customers ON customers.customer_id = locations_customers.customer_id INNER JOIN locations ON locations_customers.location_id = locations.location_id where email = 'renato.alves@example.com';
  
  async getCustomerByEmail(customerEmail: string): Promise<Customer> {
    const query = `SELECT * FROM customers LEFT JOIN locations_customers ON customers.customer_id = locations_customers.customer_id LEFT JOIN locations ON locations_customers.location_id = locations.location_id where email = '${customerEmail}';`

    try {
      const customerResult = await client.query(query)

      if (!customerResult.rows.length) throw Error('Customer does not exist.')

      console.log('customerResult.rows[0]', customerResult.rows[0])
      return CustomerMapper.toDomain(customerResult.rows[0])
    } catch (error) {
      const errorMessage = (error as Error).message
      throw Error(errorMessage)
    }
  }
  
  async getAllCustomers(): Promise<Customer[]> {
    const query = 'SELECT * FROM customers LEFT JOIN locations_customers ON INNER JOIN locations USING(location_id) LIMIT 20;'
    
    try {
      const result = await client.query(query)

      return result.rows.map(customer => CustomerMapper.toDomain(customer))
    } catch (error) {
      const errorMessage = (error as Error).message
      throw Error(errorMessage)
    }
  }
}
