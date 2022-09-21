import { Customer } from "../domain/Customer";
import { Location } from "../domain/Location";
import { CreateCustomerDTO } from "../infrastructure/dtos/CreateCustomerDTO";
import { CustomerRepository } from "../infrastructure/repositories/CustomerRepository";
import { LocationCustomerRepository } from "../infrastructure/repositories/LocationCustomerRepository";
import { LocationRepository } from "../infrastructure/repositories/LocationRepository";

export class CreateCustomerUseCase {
  private customerRepository: CustomerRepository
  private locationRepository: LocationRepository
  private locationCustomerRepository: LocationCustomerRepository

  constructor(
    customerRepository: CustomerRepository,
    locationRepository: LocationRepository,
    locationCustomerRepository: LocationCustomerRepository
  ) {
    this.customerRepository = customerRepository
    this.locationRepository = locationRepository
    this.locationCustomerRepository = locationCustomerRepository
  }

  async execute(createCustomerDTO: CreateCustomerDTO): Promise<void> {
    const newCustomer = Customer.create({ ...createCustomerDTO, role: { id: createCustomerDTO.role_id } })
    const newLocation = Location.create(createCustomerDTO.location)

    try {
      await this.customerRepository.save(newCustomer)
    } catch (error) {
      throw new Error(`${(error as Error).message}`)
    }

    try {
      await this.locationRepository.save(newLocation)
    } catch {
      throw new Error('Location')
    }

    try {
      await this.locationCustomerRepository.save({ location_id: newLocation.id, customer_id: newCustomer.id })
    } catch {
      throw new Error('LocationCustomer')
    }
  }
}
