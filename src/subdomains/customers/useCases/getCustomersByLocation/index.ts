import { CustomerRepository } from "../../infrastructure/repositories/CustomerRepository";
import { Customer } from "../../domain/Customer";
import { GetCustomerByLocationDTO } from "./GetCustomersByLocationDTO";

export class GetCustomerbyLocationUseCase {
  private customerRepo: CustomerRepository

  constructor(customerRepo: CustomerRepository) {
    this.customerRepo = customerRepo
  }

  async execute(_customersLocation: GetCustomerByLocationDTO): Promise<Customer[] | null> {
    return null
  }
}
