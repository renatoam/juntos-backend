import { RemoveEmployeeRepository } from "@backend/employees/adapters/repositories/RemoveEmployeesRepository";
import { RemoveEmployeeDTO } from "@backend/employees/types";
import { UseCase } from "../../../../shared/application/UseCase";

export class RemoveEmployeeUseCase implements UseCase<RemoveEmployeeDTO, void> {
  private removeEmployeeRepository: RemoveEmployeeRepository

  constructor(removeEmployeeRepository: RemoveEmployeeRepository) {
    this.removeEmployeeRepository = removeEmployeeRepository
  }

  async execute({ id, email }: RemoveEmployeeDTO): Promise<void> {
    if (id) return this.removeEmployeeRepository.removeEmployeeById(id)

    return this.removeEmployeeRepository.removeEmployeeByEmail(email)
  }
}
