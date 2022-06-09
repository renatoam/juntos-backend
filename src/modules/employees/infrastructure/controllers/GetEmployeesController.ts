import { GetManyEmployeesUseCase } from "@backend/employees/application/getManyEmployeesUseCase";
import { EmployeeDTO, GetManyEmployeesFilter } from "@backend/employees/types";
import { NextApiRequest, NextApiResponse } from "next";
import { GetAllEmployeesUseCase } from "../../application/getAllEmployeesUseCase";
import { RETRIEVE_EMPLOYEES_ERROR } from "../constants";

export class GetEmployeesController {
  private getAllEmployeesUseCase: GetAllEmployeesUseCase
  private getManyEmployeesUseCase: GetManyEmployeesUseCase

  constructor(
    getAllEmployeesUseCase: GetAllEmployeesUseCase,
    getManyEmployeesUseCase: GetManyEmployeesUseCase
  ) {
    this.getAllEmployeesUseCase = getAllEmployeesUseCase
    this.getManyEmployeesUseCase = getManyEmployeesUseCase
  }

  async run(request: NextApiRequest, response: NextApiResponse) {
    const filter = request.query as GetManyEmployeesFilter
    const IsThereFilter = !!Object.keys(filter).length

    try {
      let employees: EmployeeDTO[]

      if (IsThereFilter) employees = await this.getManyEmployeesUseCase.execute(filter)
      else employees = await this.getAllEmployeesUseCase.execute()

      return response.status(200).json(employees)
    } catch (error) {
      return response.status(500).json({
        error,
        description: RETRIEVE_EMPLOYEES_ERROR,
      })
    }
  }
}
