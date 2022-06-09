import { Customer } from "../../domain/Customer";
import { AxiosCustomerRepository } from "../../infrastructure/repositories/AxiosCustomerRepository";

export class GetCustomerUseCase {
  private customerRepo: AxiosCustomerRepository

  constructor(customerRepo: AxiosCustomerRepository) {
    this.customerRepo = customerRepo
  }

  async execute(customerId: string): Promise<Customer | null> {
    return await this.customerRepo.getCustomer(customerId)
  }
}
