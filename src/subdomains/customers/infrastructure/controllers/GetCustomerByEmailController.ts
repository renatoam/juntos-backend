import { Request, Response } from "express";
import { GetCustomerByEmailUseCase } from "../../useCases/getCustomerByEmail/GetCustomerByEmailUseCase";
import { CustomerMapper } from "../mappers/CustomerMapper";

export class GetCustomerByEmailController {
  async run(request: Request, response: Response) {
    const useCase = new GetCustomerByEmailUseCase()

    try {
      const rawCustomer = await useCase.execute(request.params.email)
      const customer = CustomerMapper.toDTO(rawCustomer)
      
      return response.status(200).json({ customer })
    } catch (error) {
      const decodedError = error as Error
      
      return response.status(404).json({ message: decodedError })
    }

  }
}
