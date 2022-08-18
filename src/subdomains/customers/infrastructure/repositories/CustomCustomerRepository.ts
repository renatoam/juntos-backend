import { client } from "../../../../shared/infrastructure/database/postgres";
import { CustomerRepository } from "./CustomerRepository";
import { Customer } from "../../domain/Customer";
import { CustomerMapper } from "../mappers/CustomerMapper";

type FieldType = keyof Customer

export class CustomCustomerRepository implements CustomerRepository {
  async update(customerEmail: string, updatedFields: Partial<Customer>): Promise<void> {
    const fieldsToUpdate = Object.keys(updatedFields) as FieldType[]
    const querySetStatement = fieldsToUpdate.map((field: FieldType) => `${field} = '${updatedFields[field]}'`)
    const query = `UPDATE customers SET ${querySetStatement.join(',')} WHERE email = '${customerEmail}';`
    
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
    const customerResult = await client.query(`SELECT * FROM customers WHERE email = '${customerEmail}';`)
    const rawCustomer = customerResult.rows[0]

    const locationResult = await client.query(`SELECT * FROM locations INNER JOIN locations_customers USING(location_id) INNER JOIN customers USING(customer_id) WHERE customer_id = '${rawCustomer.customer_id}';`)
    const rawLocation = locationResult.rows[0]

    return CustomerMapper.toDomain(rawCustomer, rawLocation)
  }
  
  async getAllCustomers(): Promise<Customer[]> {
    const result = await client.query('SELECT * FROM customers LIMIT 20;')
    
    return result.rows
  }
}
