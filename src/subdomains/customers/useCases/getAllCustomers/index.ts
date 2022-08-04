import { client } from "../../../../shared/infrastructure/database/postgres"
import { Customer } from "../../domain/Customer"
import { CustomerProps } from "../../domain/CustomerProps"
import { CustomCustomerRepository } from "../../infrastructure/repositories/CustomCustomerRepository"

export class GetAllCustomersUseCase {
  // private customerRepo: AxiosCustomerRepository

  // constructor(customerRepo: AxiosCustomerRepository) {
  //   this.customerRepo = customerRepo
  // }

  async execute(_request?: CustomerProps): Promise<Customer[] | null> {
    const customerRepository = new CustomCustomerRepository()
    
    return customerRepository.getAllCustomers()
  }
}
