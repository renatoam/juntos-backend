import { CustomerRepository } from "../../adapters/repositories/CustomerRepository";
import { Customer } from "../../domain/Customer";
import { GetCustomerByLocationDTO } from "./GetCustomersByLocationDTO";

export class GetCustomerbyLocationUseCase {
  private customerRepo: CustomerRepository

  constructor(customerRepo: CustomerRepository) {
    this.customerRepo = customerRepo
  }

  async execute(customersLocation: GetCustomerByLocationDTO): Promise<Customer[] | null> {
    return await this.customerRepo.getCustomersByLocation(customersLocation)
  }
}
