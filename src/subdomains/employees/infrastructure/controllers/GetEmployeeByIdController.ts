import { GetEmployeeByIdUseCase } from "@backend/employees/application/getEmployeeByIdUseCase";
import { NextApiRequest, NextApiResponse } from "next";
import { GetEmployeeByIdDTO } from "../../types";
import { RETRIEVE_EMPLOYEE_ERROR } from "../constants";

export class GetEmployeeByIdController {
  private useCase: GetEmployeeByIdUseCase

  constructor(useCase: GetEmployeeByIdUseCase) {
    this.useCase = useCase
  }

  async run(request: NextApiRequest, response: NextApiResponse) {
    const requestQuery = request.query as GetEmployeeByIdDTO

    try {
      const employee = await this.useCase.execute(requestQuery)

      response.status(200).json({ employee })
    } catch (error) {
      throw new Error(RETRIEVE_EMPLOYEE_ERROR)
    }
  }
}
