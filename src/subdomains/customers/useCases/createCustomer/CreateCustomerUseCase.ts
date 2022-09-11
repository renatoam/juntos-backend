import { Customer } from "../../domain/Customer";
import { Location } from "../../domain/Location";
import { CreateCustomerDTO } from "../../infrastructure/dtos/CreateCustomerDTO";
import { CustomCustomerRepository } from "../../infrastructure/repositories/CustomCustomerRepository";
import { CustomLocationCustomerRepository } from "../../infrastructure/repositories/CustomLocationCustomerRepository";
import { CustomLocationRepository } from "../../infrastructure/repositories/CustomLocationRepository";

export class CreateCustomerUseCase {
  async execute(createCustomerDTO: CreateCustomerDTO): Promise<void> {
    const customerRepository = new CustomCustomerRepository()
    const locationRepository = new CustomLocationRepository()
    const locationCustomerRepository = new CustomLocationCustomerRepository()
    const newCustomer = Customer.create(createCustomerDTO)
    const newLocation = Location.create(createCustomerDTO.location)

    try {
      await customerRepository.save(newCustomer)
    } catch {
      throw new Error('Create')
    }

    try {
      await locationRepository.save(newLocation)
    } catch {
      throw new Error('Location')
    }

    try {
      await locationCustomerRepository.save({ location_id: newLocation.id, customer_id: newCustomer.id })
    } catch {
      throw new Error('LocationCustomer')
    }
  }
}
