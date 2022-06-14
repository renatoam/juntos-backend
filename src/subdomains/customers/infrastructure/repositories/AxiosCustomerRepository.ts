import { CustomerRepository } from "../../adapters/repositories/CustomerRepository";
import { Customer } from "../../domain/Customer";
import { GetCustomerByLocationDTO } from "../../useCases/getCustomersByLocation/GetCustomersByLocationDTO";

const BASE_URL = 'https://jsm-challenges.s3.amazonaws.com/frontend-challenge.json'
const CACHE_KEY = 'customer'

export class AxiosCustomerRepository implements CustomerRepository {
  getCustomerById(customerId: string): Promise<Customer> {
    throw new Error("Method not implemented.");
  }
  getCustomerByEmail(customerEmail: string): Promise<Customer> {
    throw new Error("Method not implemented.");
  }
  getCustomersByAge(customersAge: number): Promise<Customer[]> {
    throw new Error("Method not implemented.");
  }
  getCustomersByName(customersName: string): Promise<Customer[]> {
    throw new Error("Method not implemented.");
  }
  getCustomersByGender(customersGender: string): Promise<Customer[]> {
    throw new Error("Method not implemented.");
  }
  getCustomersByLocation(customersLocation: GetCustomerByLocationDTO): Promise<Customer[]> {
    throw new Error("Method not implemented.");
  }
  getCustomersByRegisterTime(customersRegisterTime: number): Promise<Customer[]> {
    throw new Error("Method not implemented.");
  }
  getAllCustomers(): Promise<Customer[]> {
    throw new Error("Method not implemented.");
  }
  exists(t: Customer): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  save(t: Customer): Promise<Customer> {
    throw new Error("Method not implemented.");
  }
  remove(t: Customer): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
