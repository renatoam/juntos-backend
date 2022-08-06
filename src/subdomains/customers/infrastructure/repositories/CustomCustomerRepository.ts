import { client } from "../../../../shared/infrastructure/database/postgres";
import { CustomerRepository } from "../../adapters/repositories/CustomerRepository";
import { Customer } from "../../domain/Customer";

type FieldType = keyof Customer

export class CustomCustomerRepository implements CustomerRepository {
  async update(customerEmail: string, updatedFields: Partial<Customer>): Promise<void> {
    const fieldsToUpdate = Object.keys(updatedFields) as FieldType[]
    const querySetStatement = fieldsToUpdate.map((field: FieldType) => `${field} = '${updatedFields[field]}'`)
    const query = `UPDATE customers SET ${querySetStatement.join(',')} WHERE email = '${customerEmail}';`
    
    await client.query(query)
  }
  exists(_t: Customer): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  save(_t: Customer): Promise<void> {
    throw new Error("Method not implemented.");
  }
  remove(_t: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getCustomerById(_customerId: string): Promise<Customer> {
    throw new Error("Method not implemented.");
  }
  
  async getCustomerByEmail(customerEmail: string): Promise<any> {
    const result = await client.query(`SELECT * FROM customers WHERE email = '${customerEmail}';`)
    // const customer = Customer.create({
    //   name: result.
    // })
    console.log({ result: result.rows })
    return result.rows[0] 
  }
  
  async getAllCustomers(): Promise<Customer[]> {
    const result = await client.query('SELECT * FROM customers LIMIT 20;')
    
    return result.rows
  }
}
