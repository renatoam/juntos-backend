import { SaveEmployeesRepository } from "@backend/employees/adapters/repositories/SaveEmployeesRepository"
import { CreateEmployeeDTO, EmployeeDTO } from "@backend/employees/types"
import { UseCase } from "@backend/shared/application/UseCase"
import { RequestMethods } from "@backend/shared/types"

export class UpdateEmployeeUseCase implements UseCase<EmployeeDTO, void> {
  private updateEmployeeRepository: SaveEmployeesRepository

  constructor(updateEmployeeRepository: SaveEmployeesRepository) {
    this.updateEmployeeRepository = updateEmployeeRepository
  }

  async execute(request: CreateEmployeeDTO) {
    await this.updateEmployeeRepository.saveEmployee(request, RequestMethods.PUT)
  }
}
