import { UniqueEntityID } from "@backend/shared/domain/UniqueEntityID"

export interface RemoveEmployeeRepository {
  removeEmployeeById(employeeId: UniqueEntityID): Promise<void>
  removeMassive(employeesIds: Array<UniqueEntityID>): Promise<void>
}
