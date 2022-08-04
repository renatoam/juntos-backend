import { client } from "../../../../shared/infrastructure/database/postgres";
import { CustomerRepository } from "../../adapters/repositories/CustomerRepository";
import { Customer } from "../../domain/Customer";

const BASE_URL = 'https://jsm-challenges.s3.amazonaws.com/frontend-challenge.json'
const CACHE_KEY = 'customer'

export class CustomCustomerRepository implements CustomerRepository {
  exists(t: Customer): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  save(t: Customer): Promise<void> {
    throw new Error("Method not implemented.");
  }
  remove(t: string): Promise<void | Error> {
    throw new Error("Method not implemented.");
  }
  getCustomerById(customerId: string): Promise<Customer> {
    throw new Error("Method not implemented.");
  }
  getCustomerByEmail(customerEmail: string): Promise<Customer> {
    throw new Error("Method not implemented.");
  }
  async getAllCustomers(): Promise<Customer[]> {
    const result = await client.query('SELECT * FROM customers LIMIT 20;')
    
    return result.rows
  }
}
