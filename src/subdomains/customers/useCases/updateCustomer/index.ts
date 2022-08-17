import { Customer } from "../../domain/Customer";
import { CustomCustomerRepository } from "../../infrastructure/repositories/CustomCustomerRepository";

export class UpdateCustomerUseCase {
  async execute(customerEmail: string, fieldsToUpdate: Partial<Customer>): Promise<Customer | Error> {
    const customerRepository = new CustomCustomerRepository()
    const doesCustomerExists = await customerRepository.exists(customerEmail)

    if (!doesCustomerExists) return new Error('Customer does not exists!')

    try {
      await customerRepository.update(customerEmail, fieldsToUpdate)
      return customerRepository.getCustomerByEmail(customerEmail)
    } catch (error) {
      return new Error(`Error on updating customer: ${error}`)
    }
  }
}
