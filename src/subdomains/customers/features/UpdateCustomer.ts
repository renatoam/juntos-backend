import { UpdateCustomerController } from "../infrastructure/controllers/UpdateCustomerController";
import { CustomCustomerRepository } from "../infrastructure/repositories/CustomCustomerRepository";
import { CustomLocationRepository } from "../infrastructure/repositories/CustomLocationRepository";
import { GetCustomerByEmailUseCase } from "../useCases/getCustomerByEmail/GetCustomerByEmailUseCase";
import { UpdateCustomerUseCase } from "../useCases/updateCustomer/UpdateCustomerUseCase";


const customerRepository = new CustomCustomerRepository()
const locationRepository = new CustomLocationRepository()

const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository, locationRepository)
const getCustomerByEmailUseCase = new GetCustomerByEmailUseCase(customerRepository)

export const updateCustomerController = new UpdateCustomerController(updateCustomerUseCase, getCustomerByEmailUseCase)
