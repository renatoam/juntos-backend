import { UseCase } from "../../../../shared/application/UseCase";
import { Customer } from "../../domain/Customer";
import { CustomCustomerRepository } from "../../infrastructure/repositories/CustomCustomerRepository";


export class CreateCustomerUseCase implements UseCase<any, any> {
  private customerRepo: CustomCustomerRepository

  constructor(customerRepo: CustomCustomerRepository) {
    this.customerRepo = customerRepo
  }

  async execute(customer: Customer): Promise<Customer | null> {
    return await this.customerRepo.save(customer)
  }
}
