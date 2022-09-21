import { LocationType } from "../../../../shared/types";
import { UpdateCustomerDTO } from "../../infrastructure/dtos/UpdateCustomerDTO";
import { CustomCustomerRepository } from "../../infrastructure/repositories/CustomCustomerRepository";
import { CustomLocationRepository } from "../../infrastructure/repositories/CustomLocationRepository";

export class UpdateCustomerUseCase {
  private customerRepository: CustomCustomerRepository
  private locationRepository: CustomLocationRepository

  constructor(
    customerRepository: CustomCustomerRepository,
    locationRepository: CustomLocationRepository
  ) {
    this.customerRepository = customerRepository
    this.locationRepository = locationRepository
  }

  async execute(requestUpdateCustomerDTO: UpdateCustomerDTO): Promise<void> {
    let location: LocationType

    try {
      location = await this.locationRepository.getLocationByCustomer(requestUpdateCustomerDTO.id)
    } catch (error) {
      throw Error('Location')
    }

    try {
      const customerToUpdate = {
        ...requestUpdateCustomerDTO,
        location: { ...requestUpdateCustomerDTO.location, id: location.id }
      }

      await this.customerRepository.updateCustomer(customerToUpdate)
    } catch (error) {
      throw Error((error as Error).message)
    }
  }
}
