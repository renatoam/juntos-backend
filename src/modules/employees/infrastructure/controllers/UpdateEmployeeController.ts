import { CheckEmployeeUseCase } from "@backend/employees/application/checkEmployeeUseCase";
import { GetEmployeeByEmailUseCase } from "@backend/employees/application/getEmployeeByEmailUseCase";
import { UpdateEmployeeUseCase } from "@backend/employees/application/updateEmployeeUseCase";
import { CheckEmployeeDTO, GetEmployeeByEmailDTO, UpdateEmployeeDTO } from "@backend/employees/types";
import { NextApiRequest, NextApiResponse } from "next";
import { EMPLOYEE_DOESNT_EXIST, RETRIEVE_EMPLOYEE_ERROR, UPDATE_EMPLOYEE } from "../constants";

export class UpdateEmployeeController {
  private updateEmployeeUseCase: UpdateEmployeeUseCase
  private getEmployeeByEmail: GetEmployeeByEmailUseCase
  private checkEmployeeUseCase: CheckEmployeeUseCase

  constructor(
    updateEmployeeUseCase: UpdateEmployeeUseCase,
    getEmployeeByEmail: GetEmployeeByEmailUseCase,
    checkEmployeeUseCase: CheckEmployeeUseCase
  ) {
    this.updateEmployeeUseCase = updateEmployeeUseCase
    this.getEmployeeByEmail = getEmployeeByEmail
    this.checkEmployeeUseCase = checkEmployeeUseCase
  }

  async run(request: NextApiRequest, response: NextApiResponse) {
    const requestBody = request.body as UpdateEmployeeDTO
    const { id } = request.query as { id: string | number }

    const checkDTO: CheckEmployeeDTO = {
      id,
      email: requestBody.email
    }
    const getByEmailDTO: GetEmployeeByEmailDTO = {
      email: requestBody.email
    }
    const updateEmployeeDTO: UpdateEmployeeDTO = {
      id,
      name: requestBody.name,
      email: requestBody.email,
      occupation: requestBody.occupation,
      birthday: requestBody.birthday,
      hire: requestBody.hire,
    }

    const employeeExists = await this.checkEmployeeUseCase.execute(checkDTO)

    if (!employeeExists)
      return response.status(400).json({ message: EMPLOYEE_DOESNT_EXIST })

    try {
      try {
        await this.updateEmployeeUseCase.execute(updateEmployeeDTO)
      } catch (error) {
        return response.status(500).json(UPDATE_EMPLOYEE)
      }

      const employee = await this.getEmployeeByEmail.execute(getByEmailDTO)
      return response.status(200).json(employee)
    } catch (error) {
      return response.status(500).json(RETRIEVE_EMPLOYEE_ERROR)
    }
  }
}