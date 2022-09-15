import { CustomCustomerRepository } from "../../infrastructure/repositories/CustomCustomerRepository";

export class DeleteCustomerUseCase {
  async execute(customerEmail: string): Promise<boolean> {
    const customerRepository = new CustomCustomerRepository()

    try {
      return await customerRepository.remove(customerEmail)
    } catch (error) {
      throw Error(`${(error as Error).message}`)
    }
  }
}
