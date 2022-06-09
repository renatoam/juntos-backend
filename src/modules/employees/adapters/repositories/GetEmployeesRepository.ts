import { GetManyEmployeesDTO } from "@backend/employees/application/getManyEmployeesUseCase/getAllEmployeeDTO";
import { Employee } from "@backend/employees/domain/Employee";
import { UniqueEntityID } from "@backend/shared/domain/UniqueEntityID";

export interface GetEmployeesRepository {
  // Implement ValueObject
  getEmployeeById(employeeId: UniqueEntityID): Promise<Employee>
  getEmployeeByEmail(employeeEmail: string): Promise<Employee>
  getAllEmployees(): Promise<Employee[]>
  getManyEmployees(filter: GetManyEmployeesDTO): Promise<Employee[]>
}
