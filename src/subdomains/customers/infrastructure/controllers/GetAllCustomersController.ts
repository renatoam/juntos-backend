import { Request, Response } from "express"
import { GetAllCustomersUseCase } from "../../useCases/getAllCustomers/GetAllCustomersUseCase"
import { CustomerMapper } from "../mappers/CustomerMapper"

export class GetAllCustomersController {
  private getAllCustomerUseCase: GetAllCustomersUseCase

  constructor(getAllCustomerUseCase: GetAllCustomersUseCase) {
    this.getAllCustomerUseCase = getAllCustomerUseCase
  }

  async run(_request: Request, response: Response) {
    const rawCustomers = await this.getAllCustomerUseCase.execute()
    const customers = rawCustomers.map(customer => CustomerMapper.toDTO(customer))

    return response.status(200).json({ customers })
  }
}
