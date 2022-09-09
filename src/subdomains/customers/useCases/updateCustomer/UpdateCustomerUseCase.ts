import { RequestUpdateCustomerDTO } from "../../infrastructure/dtos/UpdateCustomerDTO";
import { UpdateCustomerMapper } from "../../infrastructure/mappers/UpdateCustomerMapper";
import { CustomCustomerRepository } from "../../infrastructure/repositories/CustomCustomerRepository";

export class UpdateCustomerUseCase {
  async execute(requestUpdateCustomerDTO: RequestUpdateCustomerDTO): Promise<void> {
    const customerRepository = new CustomCustomerRepository()
    const updateCustomer = UpdateCustomerMapper.toPersistence(requestUpdateCustomerDTO)

    try {
      await customerRepository.updateCustomer(updateCustomer)
    } catch (error) {
      throw new Error('Update')
    }
  }
}
