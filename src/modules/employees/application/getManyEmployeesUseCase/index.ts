import { GetManyEmployeesFilter } from "@backend/employees/types";
import { GetEmployeesRepository } from "../../adapters/repositories/GetEmployeesRepository";

export class GetManyEmployeesUseCase {
  private getEmployeesRepository: GetEmployeesRepository

  constructor(getEmployeesRepository: GetEmployeesRepository) {
    this.getEmployeesRepository = getEmployeesRepository
  }

  async execute(filter: GetManyEmployeesFilter) {
    return this.getEmployeesRepository.getManyEmployees(filter)
  }
}
