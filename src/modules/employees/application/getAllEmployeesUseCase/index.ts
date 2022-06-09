import { GetEmployeesRepository } from "../../adapters/repositories/GetEmployeesRepository";

export class GetAllEmployeesUseCase {
  private employeeRepository: GetEmployeesRepository

  constructor(employeeRepository: GetEmployeesRepository) {
    this.employeeRepository = employeeRepository
  }

  async execute() {
    return await this.employeeRepository.getAllEmployees()
  }
}
