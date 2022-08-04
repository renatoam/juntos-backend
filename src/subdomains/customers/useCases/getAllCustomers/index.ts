import { client } from "../../../../shared/infrastructure/database/postgres"
import { Customer } from "../../domain/Customer"
import { CustomerProps } from "../../domain/CustomerProps"

export class GetAllCustomersUseCase {
  // private customerRepo: AxiosCustomerRepository

  // constructor(customerRepo: AxiosCustomerRepository) {
  //   this.customerRepo = customerRepo
  // }

  async execute(_request?: CustomerProps): Promise<Customer[] | null> {
    const result = await client.query('SELECT * FROM customers LIMIT 20;')
    
    return result.rows
  }
}
