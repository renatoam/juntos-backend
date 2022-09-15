import { Repository } from "../../../../shared/infrastructure/Repository"
import { LocationType } from "../../../../shared/types"
import { Customer } from "../../domain/Customer"
import { UpdateCustomerDTO } from "../dtos/UpdateCustomerDTO"

export interface CustomerRepository extends Repository<Customer> {
  getCustomerById(customerId: string): Promise<Customer[]>
  getCustomerByEmail(customerEmail: string): Promise<Customer[]>
  getAllCustomers(): Promise<Customer[]>
  updateCustomer(customer: UpdateCustomerDTO): Promise<void>
  updateLocation(location: LocationType): Promise<void>
}
