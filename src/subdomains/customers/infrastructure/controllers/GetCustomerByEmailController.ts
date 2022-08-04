import { Request, Response } from "express";
import { GetCustomerByEmailUseCase } from "../../useCases/getCustomerByEmail";
import { CustomCustomerRepository } from "../repositories/CustomCustomerRepository";

export class GetCustomerByEmailController {
  async run(request: Request, response: Response) {
    const useCase = new GetCustomerByEmailUseCase()
    const customer = await useCase.execute(request.params.email)

    return response.status(200).json({ customer })
  }
}
