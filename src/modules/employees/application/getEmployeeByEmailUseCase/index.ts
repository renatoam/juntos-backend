import { GetEmployeeByEmailDTO } from "@backend/employees/types";
import { GetEmployeesRepository } from "../../adapters/repositories/GetEmployeesRepository";
import { INVALID_REQUEST_WITH_EMAIL } from "../../infrastructure/constants";

export class GetEmployeeByEmailUseCase {
  private getEmployeesRepository: GetEmployeesRepository

  constructor(getEmployeesRepository: GetEmployeesRepository) {
    this.getEmployeesRepository = getEmployeesRepository
  }

  async execute(request: GetEmployeeByEmailDTO) {
    try {
      return await this.getEmployeesRepository.getEmployeeByEmail(request)
    } catch (error) {
      throw new Error(INVALID_REQUEST_WITH_EMAIL)
    }
  }
}
