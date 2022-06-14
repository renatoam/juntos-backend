import { CreateEmployeeDTO } from "@backend/employees/application/createEmployeeUseCase/createEmployeeDTO";
import { GetEmployeeByEmailDTO } from "@backend/employees/application/getEmployeeByEmailUseCase/getEmployeeByEmailDTO";
import { NextApiRequest, NextApiResponse } from "next";
import { CheckEmployeeUseCase } from "../../application/checkEmployeeUseCase";
import { CreateEmployeeUseCase } from "../../application/createEmployeeUseCase";
import { GetEmployeeByEmailUseCase } from "../../application/getEmployeeByEmailUseCase";
import { CREATE_EMPLOYEE_ERROR, EMPLOYEE_EXISTS, ONLY_POST_METHOD, RETRIEVE_ONCREATE_EMPLOYEE_ERROR } from "../constants";

export class CreateEmployeeController {
  private createEmployeeUseCase: CreateEmployeeUseCase
  private getEmployeeByEmailUseCase: GetEmployeeByEmailUseCase
  private checkEmployeeUseCase: CheckEmployeeUseCase

  constructor(
    createEmployeeUseCase: CreateEmployeeUseCase,
    getEmployeeByEmailUseCase: GetEmployeeByEmailUseCase,
    checkEmployeeUseCase: CheckEmployeeUseCase
  ) {
    this.createEmployeeUseCase = createEmployeeUseCase
    this.getEmployeeByEmailUseCase = getEmployeeByEmailUseCase
    this.checkEmployeeUseCase = checkEmployeeUseCase
  }

  async run(request: NextApiRequest, response: NextApiResponse) {
    if (request.method !== 'POST') {
      return response.status(405).send({ message: ONLY_POST_METHOD })
    }

    const body = request.body as CreateEmployeeDTO
    const employeeExists = await this.checkEmployeeUseCase.execute(body)
    const getEmployeeDTO: GetEmployeeByEmailDTO = {
      email: body.email
    }

    if (employeeExists) {
      try {
        const employee = await this.getEmployeeByEmailUseCase.execute(getEmployeeDTO)

        return response.status(200).json({
          message: EMPLOYEE_EXISTS,
          employee
        })
      } catch (error) {
        return response.status(500).json({ message: RETRIEVE_ONCREATE_EMPLOYEE_ERROR })
      }
    }

    try {
      try {
        await this.createEmployeeUseCase.execute(body)
      } catch (error) {
        return response.status(500).json({ message: CREATE_EMPLOYEE_ERROR })
      }

      const employee = await this.getEmployeeByEmailUseCase.execute(getEmployeeDTO)

      return response.status(200).json(employee)
    } catch (error) {
      return response.status(500).json({ message: RETRIEVE_ONCREATE_EMPLOYEE_ERROR })
    }
  }
}
