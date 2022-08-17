import { Customer } from "../../domain/Customer"
import { CustomerProps } from "../../domain/CustomerProps"
import { CustomCustomerRepository } from "../../infrastructure/repositories/CustomCustomerRepository"

export class GetAllCustomersUseCase {
  async execute(_request?: CustomerProps): Promise<Customer[] | null> {
    const customerRepository = new CustomCustomerRepository()
    
    return customerRepository.getAllCustomers()
  }
}
