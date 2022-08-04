import { Request, Response } from "express"
import { GetAllCustomersUseCase } from "../../useCases/getAllCustomers"

export class GetAllCustomersController {
  async run(_request: Request, response: Response) {
    const useCase = new GetAllCustomersUseCase()
    const customers = await useCase.execute()

    return response.status(200).send({customers})
  }
}
