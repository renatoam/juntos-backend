import { Customer } from "../../domain/Customer"
import { CustomerProps } from "../../domain/CustomerProps"
import { AxiosCustomerRepository } from "../../infrastructure/repositories/AxiosCustomerRepository"

export class GetAllCustomersUseCase {
  private customerRepo: AxiosCustomerRepository

  constructor(customerRepo: AxiosCustomerRepository) {
    this.customerRepo = customerRepo
  }

  async execute(_request: CustomerProps): Promise<Customer[] | null> {
    const allCustomers = await this.customerRepo.getAllCustomers()

    return allCustomers.data.results
  }
}
