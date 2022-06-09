import { Repository } from "../../../shared/infrastructure/Repository"
import { Customer } from "../../domain/Customer"
import { GetCustomerByLocationDTO } from "../../useCases/getCustomersByLocation/GetCustomersByLocationDTO"

export interface CustomerRepository extends Repository<Customer> {
  getCustomerById(customerId: string): Promise<Customer | null>
  getCustomerByEmail(customerEmail: string): Promise<Customer | null>
  getCustomersByAge(customersAge: number): Promise<Customer[] | null>
  getCustomersByName(customersName: string): Promise<Customer[] | null>
  getCustomersByGender(customersGender: string): Promise<Customer[] | null>
  getCustomersByLocation(customersLocation: GetCustomerByLocationDTO): Promise<Customer[] | null>
  getCustomersByRegisterTime(customersRegisterTime: number): Promise<Customer[] | null>
  getAllCustomers(): Promise<Customer[] | null>
}
