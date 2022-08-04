import { CustomCustomerRepository } from "../../infrastructure/repositories/CustomCustomerRepository";


export class DeleteCustomerUseCase {
  private customerRepo: CustomCustomerRepository

  constructor(customerRepo: CustomCustomerRepository) {
    this.customerRepo = customerRepo
  }

  async execute(customerId: string): Promise<void> {
    return await this.customerRepo.deleteCustomer(customerId)
  }
}
