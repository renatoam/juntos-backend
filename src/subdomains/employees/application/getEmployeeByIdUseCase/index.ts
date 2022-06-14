import { GetEmployeeByIdDTO } from "@backend/employees/types";
import { GetEmployeesRepository } from "../../adapters/repositories/GetEmployeesRepository";
import { INVALID_REQUEST_WITH_ID } from "../../infrastructure/constants";

export class GetEmployeeByIdUseCase {
  private getEmployeesRepository: GetEmployeesRepository

  constructor(getEmployeesRepository: GetEmployeesRepository) {
    this.getEmployeesRepository = getEmployeesRepository
  }

  async execute(request: GetEmployeeByIdDTO) {
    try {
      return await this.getEmployeesRepository.getEmployeeById(request)
    } catch (error) {
      throw new Error(INVALID_REQUEST_WITH_ID)
    }
  }
}
