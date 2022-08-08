import { CreateCustomerController } from "../infrastructure/controllers/CreateCustomerController"
import { CustomCustomerRepository } from "../infrastructure/repositories/CustomCustomerRepository"
import { CreateCustomerUseCase } from "../useCases/createCustomer"

const customerRepository = new CustomCustomerRepository()
const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)
const createCustomerController = new CreateCustomerController(createCustomerUseCase)

export { customerRepository, createCustomerController, createCustomerUseCase }

