import { GetCustomerByEmailController } from "../infrastructure/controllers/GetCustomerByEmailController";
import { CustomCustomerRepository } from "../infrastructure/repositories/CustomCustomerRepository";
import { GetCustomerByEmailUseCase } from "../useCases/getCustomerByEmail/GetCustomerByEmailUseCase";


const customerRepository = new CustomCustomerRepository()
const getCustomerByEmailUseCase = new GetCustomerByEmailUseCase(customerRepository)

export const getCustomerByEmailController = new GetCustomerByEmailController(getCustomerByEmailUseCase)
