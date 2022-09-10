import { LocationToPersistence } from "../../../../shared/infrastructure/mappers/LocationMapperType"
import { Repository } from "../../../../shared/infrastructure/Repository"
import { Customer } from "../../domain/Customer"
import { UpdateCustomerToPersistence } from "../mappers/UpdateCustomerMapperType"

export interface CustomerRepository extends Repository<Customer> {
  getCustomerById(customerId: string): Promise<Customer>
  getCustomerByEmail(customerEmail: string): Promise<Customer>
  getAllCustomers(): Promise<Customer[]>
  updateCustomer(updateCustomerToPersistence: UpdateCustomerToPersistence): Promise<void>
  updateLocation(location: LocationToPersistence): Promise<void>
}
