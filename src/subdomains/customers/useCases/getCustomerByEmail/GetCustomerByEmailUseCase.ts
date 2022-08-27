import { Customer } from "../../domain/Customer";
import { CustomCustomerRepository } from "../../infrastructure/repositories/CustomCustomerRepository";

export class GetCustomerByEmailUseCase {
  async execute(customerEmail: string): Promise<Customer> {
    const customerRepository = new CustomCustomerRepository()
    
    try {
      return await customerRepository.getCustomerByEmail(customerEmail)
    } catch (error) {
      const decodedError = error as Error
      throw Error(decodedError.message)
    }
  }
}
