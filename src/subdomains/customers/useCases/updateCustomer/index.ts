import { Customer } from "../../domain/Customer";
import { CustomCustomerRepository } from "../../infrastructure/repositories/CustomCustomerRepository";

export class UpdateCustomerUseCase {
  private customerRepo: CustomCustomerRepository

  constructor(customerRepo: CustomCustomerRepository) {
    this.customerRepo = customerRepo
  }

  async execute(customerId: string): Promise<Customer | null> {
    return await this.customerRepo.updateCustomer(customerId)
  }
}
