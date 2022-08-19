import { Request, Response } from "express"
import { GetAllCustomersUseCase } from "../../useCases/getAllCustomers/GetAllCustomersUseCase"
import { CustomerMapper } from "../mappers/CustomerMapper"

export class GetAllCustomersController {
  async run(_request: Request, response: Response) {
    const useCase = new GetAllCustomersUseCase()
    const rawCustomers = await useCase.execute()
    const customers = rawCustomers.map(customer => CustomerMapper.toDTO(customer))

    return response.status(200).json({ customers })
  }
}
