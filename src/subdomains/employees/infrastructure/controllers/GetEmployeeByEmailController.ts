import { NextApiRequest, NextApiResponse } from "next";
import { GetEmployeeByEmailUseCase } from "../../application/getEmployeeByEmailUseCase";
import { GetEmployeeByEmailDTO } from "../../types";
import { RETRIEVE_EMPLOYEE_ERROR } from "../constants";

export class GetEmployeeByEmailController {
  private useCase: GetEmployeeByEmailUseCase

  constructor(useCase: GetEmployeeByEmailUseCase) {
    this.useCase = useCase
  }

  async run(request: NextApiRequest, response: NextApiResponse) {
    const requestQuery = request.query as GetEmployeeByEmailDTO

    try {
      const employee = await this.useCase.execute(requestQuery)

      response.status(200).json({ employee })
    } catch (error) {
      throw new Error(RETRIEVE_EMPLOYEE_ERROR)
    }
  }
}
