import { SaveEmployeesRepository } from "@backend/employees/adapters/repositories/SaveEmployeesRepository";
import { CreateEmployeeDTO } from "@backend/employees/types";
import { RequestMethods } from "@backend/shared/types";
import { UseCase } from "../../../../shared/application/UseCase";

export class CreateEmployeeUseCase implements UseCase<CreateEmployeeDTO, void> {
  private saveEmployeeRepository: SaveEmployeesRepository

  constructor(saveEmployeeRepository: SaveEmployeesRepository) {
    this.saveEmployeeRepository = saveEmployeeRepository
  }

  async execute(request?: CreateEmployeeDTO): Promise<void> {
    await this.saveEmployeeRepository.saveEmployee(request, RequestMethods.POST)
  }
}
