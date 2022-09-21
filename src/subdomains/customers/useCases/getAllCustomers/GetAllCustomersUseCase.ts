import { Customer } from "../../domain/Customer"
import { CustomerProps } from "../../domain/CustomerProps"
import { CustomCustomerRepository } from "../../infrastructure/repositories/CustomCustomerRepository"

export class GetAllCustomersUseCase {
  private customerRepository: CustomCustomerRepository

  constructor(customerRepository: CustomCustomerRepository) {
    this.customerRepository = customerRepository
  }

  async execute(_request?: CustomerProps): Promise<Customer[] | []> {    
    return this.customerRepository.getAllCustomers()
  }
}
