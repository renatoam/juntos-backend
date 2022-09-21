import { CustomCustomerRepository } from "../infrastructure/repositories/CustomCustomerRepository";

export class DeleteCustomerUseCase {
  private customerRepository: CustomCustomerRepository

  constructor(customerRepository: CustomCustomerRepository) {
    this.customerRepository = customerRepository
  }

  async execute(customerEmail: string): Promise<boolean> {
    try {
      return await this.customerRepository.remove(customerEmail)
    } catch (error) {
      throw Error(`${(error as Error).message}`)
    }
  }
}
