import { Customer } from "../../domain/Customer";
import { CustomCustomerRepository } from "../../infrastructure/repositories/CustomCustomerRepository";

export class GetCustomerByEmailUseCase {
  // private customerRepo: CustomCustomerRepository

  // constructor(customerRepo: CustomCustomerRepository) {
  //   this.customerRepo = customerRepo
  // }

  async execute(customerEmail: string): Promise<Customer> {
    const customerRepository = new CustomCustomerRepository()
    
    return customerRepository.getCustomerByEmail(customerEmail)
  }
}
