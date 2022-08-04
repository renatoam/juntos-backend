import { Repository } from "../../../../shared/infrastructure/Repository"
import { Customer } from "../../domain/Customer"
import { GetCustomerByLocationDTO } from "../../useCases/getCustomersByLocation/GetCustomersByLocationDTO"

export interface CustomerRepository extends Repository<Customer> {
  getCustomerById(customerId: string): Promise<Customer>
  getCustomerByEmail(customerEmail: string): Promise<Customer>
  getAllCustomers(): Promise<Customer[]>
}
