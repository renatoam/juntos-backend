import { RemoveEmployeeRepository } from "@backend/employees/adapters/repositories/RemoveEmployeesRepository";
import { UseCase } from "../../../shared/application/UseCase";
import { RemoveManyEmployeesDTO } from "./removeManyEmployeesDTO";

export class RemoveManyEmployeesUseCase implements UseCase<RemoveManyEmployeesDTO, void> {
  private removeEmployeeRepository: RemoveEmployeeRepository

  constructor(removeEmployeeRepository: RemoveEmployeeRepository) {
    this.removeEmployeeRepository = removeEmployeeRepository
  }

  async execute({ employeesIds }: RemoveManyEmployeesDTO): Promise<void> {
    return this.removeEmployeeRepository.removeMassive(employeesIds)
  }
}
