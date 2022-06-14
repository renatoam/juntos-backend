import { UseCase } from "../../../../shared/application/UseCase";
import { Customer } from "../../domain/Customer";
import { AxiosCustomerRepository } from "../../infrastructure/repositories/AxiosCustomerRepository";


export class CreateCustomerUseCase implements UseCase<any, any> {
  private customerRepo: AxiosCustomerRepository

  constructor(customerRepo: AxiosCustomerRepository) {
    this.customerRepo = customerRepo
  }

  async execute(customer: Customer): Promise<Customer | null> {
    return await this.customerRepo.save(customer)
  }
}
