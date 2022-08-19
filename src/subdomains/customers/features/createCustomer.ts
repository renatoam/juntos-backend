import { CreateCustomerController } from "../infrastructure/controllers/CreateCustomerController"
import { CustomCustomerRepository } from "../infrastructure/repositories/CustomCustomerRepository"
import { CreateCustomerUseCase } from "../useCases/createCustomer/CreateCustomerUseCase"

const customerRepository = new CustomCustomerRepository()
const createCustomerUseCase = new CreateCustomerUseCase()
const createCustomerController = new CreateCustomerController()

export { customerRepository, createCustomerController, createCustomerUseCase }

