import { CheckEmployeeRepository } from "@backend/employees/adapters/repositories/CheckEmployeeRepository";
import { RemoveEmployeeRepository } from "@backend/employees/adapters/repositories/RemoveEmployeesRepository";
import { SaveEmployeesRepository } from "@backend/employees/adapters/repositories/SaveEmployeesRepository";
import { GetManyEmployeesDTO } from "@backend/employees/application/getManyEmployeesUseCase/getAllEmployeeDTO";
import { Employee } from "@backend/employees/domain/Employee";
import { UniqueEntityID } from "@backend/shared/domain/UniqueEntityID";
import { Helper } from "../../../shared/infrastructure/Helpers";
import { RequestMethods, SearchKey } from "../../../shared/types";
import { GetEmployeesRepository } from "../../adapters/repositories/GetEmployeesRepository";
import { BASE_URL, CACHE_KEY } from "../constants";

export class EmployeeRepository implements
  GetEmployeesRepository,
  SaveEmployeesRepository,
  CheckEmployeeRepository,
  RemoveEmployeeRepository {
  private helper: Helper<Employee> = new Helper()

  private async getEmployeeFromRemote(
    id: UniqueEntityID | string,
    searchKey: SearchKey
  ): Promise<Employee> {
    const remoteEmployees: Employee[] = await this.helper.getDataFromRemote(BASE_URL)

    return this.helper.findFromAList(remoteEmployees, id.toString(), searchKey)
  }

  private getEmployeeFromCache(
    id: UniqueEntityID | string,
    searchKey: SearchKey
  ): Employee | undefined {
    const cachedEmployees: Employee[] = this.helper.getDataFromCache(CACHE_KEY)

    return this.helper.findFromAList(cachedEmployees, id.toString(), searchKey)
  }

  private async getEmployees(): Promise<Employee[]> {
    if (this.helper.isCached(CACHE_KEY)) return this.helper.getDataFromCache(CACHE_KEY)

    const employees = await this.helper.getDataFromRemote(BASE_URL)
    this.helper.saveMassiveToCache(employees, CACHE_KEY)

    return employees
  }

  async getEmployeeById(id: UniqueEntityID): Promise<Employee> {
    if (this.helper.isCached(CACHE_KEY))
      return this.getEmployeeFromCache(id, SearchKey.id)

    return this.getEmployeeFromRemote(id, SearchKey.id)
  }

  async getEmployeeByEmail(email: string): Promise<Employee> {
    if (this.helper.isCached(CACHE_KEY))
      return this.getEmployeeFromCache(email, SearchKey.email)

    return this.getEmployeeFromRemote(email, SearchKey.email)
  }

  async getAllEmployees(): Promise<Employee[]> {
    return this.getEmployees()
  }

  async getManyEmployees(filter: GetManyEmployeesDTO): Promise<Employee[]> {
    let employees = await this.getEmployees()
    const { name, occupation, birthday, hire, limit, offset } = filter

    if (name)
      employees = employees.filter(employee => employee.name.includes(name))

    if (occupation)
      employees = employees.filter(employee => employee.occupation.includes(occupation))

    if (birthday) {
      const fieldCondition = birthday.toString().split(':')
      const operator = fieldCondition[0]
      const value = fieldCondition[1] as unknown as Date

      if (operator === 'eq')
        employees = employees.filter(employee => employee.birthday === value)

      if (operator === 'gt')
        employees = employees.filter(employee => employee.birthday > value)

      if (operator === 'lt')
        employees = employees.filter(employee => employee.birthday < value)
    }

    if (hire) {
      const fieldCondition = hire.toString().split(':')
      const operator = fieldCondition[0]
      const value = fieldCondition[1] as unknown as Date

      if (operator === 'eq')
        employees = employees.filter(employee => employee.hire === value)

      if (operator === 'gt')
        employees = employees.filter(employee => employee.hire > value)

      if (operator === 'lt')
        employees = employees.filter(employee => employee.hire < value)
    }

    if (!limit && offset) {
      const startIndex = offset + 1

      employees = employees.slice(startIndex, (startIndex) + limit)
    }

    return employees
  }

  private async checkEmployee(searchItem: string | number, searchKey: SearchKey) {
    const employees = await this.getEmployees()
    const employee = this.helper.findFromAList(employees, searchItem, searchKey)

    return !!employee
  }

  async checkEmployeeById(employeeId: UniqueEntityID): Promise<boolean> {
    return this.checkEmployee(employeeId.toValue(), SearchKey.id)
  }

  async checkEmployeeByEmail(employeeEmail: string): Promise<boolean> {
    return this.checkEmployee(employeeEmail, SearchKey.email)
  }

  async saveEmployee(employee: Employee): Promise<void> {
    const alreadyExists = await this.checkEmployeeById(employee.id)
    const requestMethod = alreadyExists ? RequestMethods.PUT : RequestMethods.POST

    this.helper.saveNewRegisterToCache<Employee>(employee, CACHE_KEY, alreadyExists)
    return this.helper.saveNewRegisterToRemote<Employee>(BASE_URL, employee, requestMethod)
  }

  async saveEmployeeBulk(employees: Employee[]) {
    await this.helper.saveToRemoteBulk<Employee>(BASE_URL, employees)
    this.helper.saveMassiveToCache<Employee>(employees, CACHE_KEY)
  }

  async removeEmployeeById(employeeId: UniqueEntityID): Promise<void> {
    this.helper.removeItemFromCache(CACHE_KEY, employeeId)
    await this.helper.removeItemFromRemote(BASE_URL, employeeId)
  }

  async removeMassive(employeesIds: UniqueEntityID[]): Promise<void> {
    employeesIds.forEach(employeeId => {
      this.helper.removeItemFromCache(CACHE_KEY, employeeId)
    });

    const requests = employeesIds.map(async employeeId => {
      return this.helper.removeItemFromRemote(BASE_URL, employeeId)
    })

    await Promise.all(requests)
  }
}
