import { client } from "../../../../shared/infrastructure/database/postgres";
import { LocationMapper } from "../../../../shared/infrastructure/mappers/LocationMapper";
import { insertInto } from "../../../../shared/utils/queryFunctions";
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

      console.log('Salvou customer')
    } catch {
      throw new Error('Create')
    }

    try {
      await locationRepository.save(newLocation)
      console.log('Salvou location')
    } catch {
      throw new Error('Location')
    }

    try {
      await locationCustomerRepository.save({ customer_id: newCustomer.id, location_id: newLocation.id })
      console.log('Salvou location_customer')
    } catch {
      throw new Error('LocationCustomer')
    }
  }
}
