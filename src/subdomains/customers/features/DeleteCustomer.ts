import { DeleteCustomerController } from "../infrastructure/controllers/DeleteCustomerController"
import { CustomCustomerRepository } from "../infrastructure/repositories/CustomCustomerRepository"
import { DeleteCustomerUseCase } from "../useCases/DeleteCustomerUseCase"

const customerRepository = new CustomCustomerRepository()
const deleteCustomerUseCase = new DeleteCustomerUseCase(customerRepository)
export const deleteCustomersController = new DeleteCustomerController(deleteCustomerUseCase)
