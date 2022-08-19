import { Request, Response } from "express";
import { GetCustomerByEmailUseCase } from "../../useCases/getCustomerByEmail";
import { CustomerMapper } from "../mappers/CustomerMapper";

export class GetCustomerByEmailController {
  async run(request: Request, response: Response) {
    const useCase = new GetCustomerByEmailUseCase()
    const rawCustomer = await useCase.execute(request.params.email)
    const customer = CustomerMapper.toDTO(rawCustomer)

    return response.status(200).json({ customer })
  }
}
