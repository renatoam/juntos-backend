import { CreateCustomerController } from "../infrastructure/controllers/CreateCustomerController"
import { AxiosCustomerRepository } from "../infrastructure/repositories/AxiosCustomerRepository"
import { CreateCustomerUseCase } from "../useCases/createCustomer"

const customerRepository = new AxiosCustomerRepository()
const createCustomerUseCase = new CreateCustomerUseCase(customerRepository)
const createCustomerController = new CreateCustomerController(createCustomerUseCase)

export { customerRepository, createCustomerController, createCustomerUseCase }

