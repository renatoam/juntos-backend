import { CheckEmployeeUseCase } from "./application/checkEmployeeUseCase";
import { CreateEmployeeUseCase } from "./application/createEmployeeUseCase";
import { GetAllEmployeesUseCase } from "./application/getAllEmployeesUseCase";
import { GetEmployeeByEmailUseCase } from "./application/getEmployeeByEmailUseCase";
import { GetManyEmployeesUseCase } from "./application/getManyEmployeesUseCase";
import { UpdateEmployeeUseCase } from "./application/updateEmployeeUseCase";
import { CreateEmployeeController } from "./infrastructure/controllers/CreateEmployeeController";
import { GetEmployeeByEmailController } from "./infrastructure/controllers/GetEmployeeByEmailController";
import { GetEmployeesController } from "./infrastructure/controllers/GetEmployeesController";
import { UpdateEmployeeController } from "./infrastructure/controllers/UpdateEmployeeController";
import { EmployeeRepository } from "./infrastructure/repositories/EmployeeRepository";


const employeeRepository = new EmployeeRepository()

export const checkIfEmployeeExistsUseCase = new CheckEmployeeUseCase(employeeRepository)

export const getEmployeeByEmailUseCase = new GetEmployeeByEmailUseCase(employeeRepository)
export const getEmployeeByEmailController = new GetEmployeeByEmailController(getEmployeeByEmailUseCase)

export const getManyEmployeesUseCase = new GetManyEmployeesUseCase(employeeRepository)
export const getAllEmployeesUseCase = new GetAllEmployeesUseCase(employeeRepository)
export const getAllEmployeesController = new GetEmployeesController(getAllEmployeesUseCase, getManyEmployeesUseCase)

export const createEmployeeUseCase = new CreateEmployeeUseCase(employeeRepository)
export const createEmployeeController = new CreateEmployeeController(createEmployeeUseCase, getEmployeeByEmailUseCase, checkIfEmployeeExistsUseCase)

export const updateEmployeeUseCase = new UpdateEmployeeUseCase(employeeRepository)
export const updateEmployeeController = new UpdateEmployeeController
  (updateEmployeeUseCase, getEmployeeByEmailUseCase, checkIfEmployeeExistsUseCase)
