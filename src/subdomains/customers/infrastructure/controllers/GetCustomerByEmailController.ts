import { Request, Response } from "express";
import { GetCustomerByEmailUseCase } from "../../useCases/getCustomerByEmail/GetCustomerByEmailUseCase";
import { CustomerMapper } from "../mappers/CustomerMapper";

export class GetCustomerByEmailController {
  private getCustomerByEmailUseCase: GetCustomerByEmailUseCase

  constructor(getCustomerByEmailUseCase: GetCustomerByEmailUseCase) {
    this.getCustomerByEmailUseCase = getCustomerByEmailUseCase
  }
  async run(request: Request, response: Response) {
    try {
      const rawCustomer = await this.getCustomerByEmailUseCase.execute(request.params.email)

      if (!rawCustomer.length) {
        return response.status(404).json({ message: 'Customer does not exist' })
      }

      const customer = CustomerMapper.toDTO(rawCustomer[0])
      
      return response.status(200).json({ customer })
    } catch (error) {
      const decodedError = error as Error
      
      return response.status(500).json({ message: decodedError })
    }
  }
}
