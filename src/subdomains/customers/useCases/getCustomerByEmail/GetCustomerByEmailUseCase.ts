import { Customer } from "../../domain/Customer";
import { CustomCustomerRepository } from "../../infrastructure/repositories/CustomCustomerRepository";

export class GetCustomerByEmailUseCase {
  private customerRepository: CustomCustomerRepository

  constructor(customerRepository: CustomCustomerRepository) {
    this.customerRepository = customerRepository
  }
  async execute(customerEmail: string): Promise<Customer[]> {    
    try {
      return await this.customerRepository.getCustomerByEmail(customerEmail)
    } catch (error) {
      const decodedError = error as Error
      throw Error(decodedError.message)
    }
  }
}
