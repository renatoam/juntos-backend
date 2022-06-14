import { Employee } from "@backend/employees/domain/Employee";

export interface SaveEmployeesRepository {
  saveEmployee(employee: Employee): Promise<void>
  saveEmployeeBulk(employees: Employee[]): Promise<void>
}
