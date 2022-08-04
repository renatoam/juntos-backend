import { Customer } from "../../domain/Customer";
import { CustomCustomerRepository } from "../../infrastructure/repositories/CustomCustomerRepository";

export class GetCustomerUseCase {
  private customerRepo: CustomCustomerRepository

  constructor(customerRepo: CustomCustomerRepository) {
    this.customerRepo = customerRepo
  }

  async execute(customerId: string): Promise<Customer | null> {
    return await this.customerRepo.getCustomer(customerId)
  }
}
