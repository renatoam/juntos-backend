import { LocationType } from "../../../../shared/types";
import { UpdateCustomerDTO } from "../../infrastructure/dtos/UpdateCustomerDTO";
import { CustomCustomerRepository } from "../../infrastructure/repositories/CustomCustomerRepository";
import { CustomLocationRepository } from "../../infrastructure/repositories/CustomLocationRepository";

export class UpdateCustomerUseCase {
  async execute(requestUpdateCustomerDTO: UpdateCustomerDTO): Promise<void> {
    const customerRepository = new CustomCustomerRepository()
    const locationRepository = new CustomLocationRepository()
    let location: LocationType

    try {
      location = await locationRepository.getLocationByCustomer(requestUpdateCustomerDTO.id)
    } catch (error) {
      throw Error('Location')
    }

    try {
      const customerToUpdate = {
        ...requestUpdateCustomerDTO,
        location: { ...requestUpdateCustomerDTO.location, id: location.id }
      }

      await customerRepository.updateCustomer(customerToUpdate)
    } catch (error) {
      throw Error((error as Error).message)
    }
  }
}
