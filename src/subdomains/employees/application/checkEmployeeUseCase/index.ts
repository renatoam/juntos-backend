import { CheckEmployeeRepository } from '@backend/employees/adapters/repositories/CheckEmployeeRepository'
import { CheckEmployeeDTO } from '@backend/employees/types'
import { UseCase } from '../../../../shared/application/UseCase'

export class CheckEmployeeUseCase implements UseCase<CheckEmployeeDTO, boolean> {
  private checkEmployeeRepository: CheckEmployeeRepository

  constructor(checkEmployeeRepository: CheckEmployeeRepository) {
    this.checkEmployeeRepository = checkEmployeeRepository
  }

  async execute({ email, id }: CheckEmployeeDTO): Promise<boolean> {
    if (id) return this.checkEmployeeRepository.checkEmployeeById(id)

    return this.checkEmployeeRepository.checkEmployeeByEmail(email)
  }
}