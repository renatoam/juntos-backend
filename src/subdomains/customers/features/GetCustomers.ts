import { GetAllCustomersController } from "../infrastructure/controllers/GetAllCustomersController";
import { CustomCustomerRepository } from "../infrastructure/repositories/CustomCustomerRepository";
import { GetAllCustomersUseCase } from "../useCases/getAllCustomers/GetAllCustomersUseCase";

const customerRepository = new CustomCustomerRepository()
const getAllCustomerUseCase = new GetAllCustomersUseCase(customerRepository)
export const getAllCustomersController = new GetAllCustomersController(getAllCustomerUseCase)
