import { CreateCustomerController } from "../infrastructure/controllers/CreateCustomerController"
import { CustomCustomerRepository } from "../infrastructure/repositories/CustomCustomerRepository"
import { CustomLocationCustomerRepository } from "../infrastructure/repositories/CustomLocationCustomerRepository"
import { CustomLocationRepository } from "../infrastructure/repositories/CustomLocationRepository"
import { CreateCustomerUseCase } from "../useCases/CreateCustomerUseCase"
import { GetCustomerByEmailUseCase } from "../useCases/getCustomerByEmail/GetCustomerByEmailUseCase"

const locationCustomerRepository = new CustomLocationCustomerRepository()
const locationRepository = new CustomLocationRepository()
const customerRepository = new CustomCustomerRepository()

const getCustomerByEmailUseCase = new GetCustomerByEmailUseCase(customerRepository)
const createCustomerUseCase = new CreateCustomerUseCase(
  customerRepository, locationRepository, locationCustomerRepository
)

export const createCustomerController = new CreateCustomerController(createCustomerUseCase, getCustomerByEmailUseCase)

