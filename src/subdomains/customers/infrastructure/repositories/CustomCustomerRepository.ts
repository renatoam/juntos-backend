import { client } from "../../../../shared/infrastructure/database/postgres";
import { LocationMapper } from "../../../../shared/infrastructure/mappers/LocationMapper";
import { LocationType } from "../../../../shared/types";
import { Customer } from "../../domain/Customer";
import { RequestUpdateCustomerDTO } from "../dtos/UpdateCustomerDTO";
import { CustomerMapper } from "../mappers/CustomerMapper";
import { UpdateCustomerMapper } from "../mappers/UpdateCustomerMapper";
import { CustomerRepository } from "./CustomerRepository";

export class CustomCustomerRepository implements CustomerRepository {
  async updateLocation(location: LocationType): Promise<void> {
    const locationToPersistence = LocationMapper.toPersistence(location)
    const insertQueryFields = Object.keys(locationToPersistence)
    const insertQueryValues = Object.values(locationToPersistence).map(value => `'${value}'`)
    const upsertQueryAction = Object.keys(locationToPersistence).map(key => `${key} = excluded.${key}`).join(', ')
    const query = `INSERT INTO locations(${insertQueryFields}) VALUES(${insertQueryValues}) ON CONFLICT (location_id) DO UPDATE SET ${upsertQueryAction};`

    try {
      await client.query(query)
    } catch (error) {
      const errorMessage = (error as Error).message
      throw Error(errorMessage)
    }
  }

  async updateCustomer(updateCustomer: RequestUpdateCustomerDTO): Promise<void> {
    const domainCustomer = UpdateCustomerMapper.toDomain(updateCustomer)
    const customerFields = CustomerMapper.toPersistence(domainCustomer)

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

  getCustomerById(_customerId: string): Promise<Customer[]> {
    throw new Error("Method not implemented.");
  }
  
  async getCustomerByEmail(customerEmail: string): Promise<Customer[]> {
    const query = `SELECT c.*, l.* FROM customers c INNER JOIN locations_customers lc ON c.customer_id = lc.customer_id INNER JOIN locations l ON l.location_id = lc.location_id WHERE c.email = '${customerEmail}';`

    try {
      const customerResult = await client.query(query)

      if (!customerResult.rows.length) return customerResult.rows
      
      return customerResult.rows.map(row => CustomerMapper.toDomain(row))
    } catch {
      throw Error('Error on querying customer on database')
    }
  }
  
  async getAllCustomers(): Promise<Customer[]> {
    const query = 'SELECT * FROM customers c INNER JOIN locations_customers lc ON c.customer_id = lc.customer_id INNER JOIN locations l USING(location_id) LIMIT 20;'
    
    try {
      const result = await client.query(query)

      return result.rows.map(customer => CustomerMapper.toDomain(customer))
    } catch (error) {
      const errorMessage = (error as Error).message
      throw Error(errorMessage)
    }
  }
}
