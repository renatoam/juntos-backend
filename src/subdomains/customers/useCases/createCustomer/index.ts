import { client } from "../../../../shared/infrastructure/database/postgres";
import { LocationMapper } from "../../../../shared/infrastructure/mappers/LocationMapper";
import { insertInto } from "../../../../shared/utils/queryFunctions";
import { Customer } from "../../domain/Customer";
import { CreateCustomerDTO } from "../../infrastructure/dtos/CreateCustomerDTO";
import { CustomCustomerRepository } from "../../infrastructure/repositories/CustomCustomerRepository";

export class CreateCustomerUseCase {
  async execute(createCustomerDTO: CreateCustomerDTO): Promise<Customer | string> {
    const customerRepository = new CustomCustomerRepository()
    const doesCustomerExists = await customerRepository.exists(createCustomerDTO.email)
  
    if (doesCustomerExists) throw new Error('Conflict')
  
    const newCustomer = Customer.create({
      name: createCustomerDTO.name,
      type: 'customers',
      cell: createCustomerDTO.cell,
      dob: createCustomerDTO.dob,
      email: createCustomerDTO.email,
      gender: createCustomerDTO.gender,
      location: createCustomerDTO.location,
      phone: createCustomerDTO.phone,
      picture: createCustomerDTO.picture,
      registered: createCustomerDTO.registered,
      role_id: createCustomerDTO.role_id
    })

    const location = LocationMapper.toPersistence(createCustomerDTO.location)
    const insertQueryFields = Object.keys(location)
    const insertQueryValues = Object.values(location)
    const locationCustomerFields = ['location_id', 'customer_id']
    const locationCustomerValues = [location.location_id, newCustomer.id.toString()]
    const locationQuery = insertInto('locations', insertQueryFields, insertQueryValues)
    const locationCustomerQuery = insertInto('locations_customers', locationCustomerFields, locationCustomerValues)
  
    try {
      await client.query(locationQuery)
      await client.query(locationCustomerQuery)
    } catch {
      throw new Error('Location')
    }
  
    try {
      let customer

      await customerRepository.save(newCustomer)
      
      try {
        customer = await customerRepository.getCustomerByEmail(newCustomer.email)
      } catch (error) {
        customer = 'It was not possible retrieve the new customer.'
      }
  
      return customer
    } catch (error) {
      throw new Error('Create')
    }
  }
}
