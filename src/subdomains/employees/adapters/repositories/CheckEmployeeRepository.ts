import { UniqueEntityID } from "@backend/shared/domain/UniqueEntityID"

export interface CheckEmployeeRepository {
  checkEmployeeById(employeeId: UniqueEntityID): Promise<boolean>
  checkEmployeeByEmail(employeeEmail: string): Promise<boolean>
}
