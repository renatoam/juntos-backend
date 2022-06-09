import { AxiosCustomerRepository } from "../../infrastructure/repositories/AxiosCustomerRepository";


export class DeleteCustomerUseCase {
  private customerRepo: AxiosCustomerRepository

  constructor(customerRepo: AxiosCustomerRepository) {
    this.customerRepo = customerRepo
  }

  async execute(customerId: string): Promise<void> {
    return await this.customerRepo.deleteCustomer(customerId)
  }
}
