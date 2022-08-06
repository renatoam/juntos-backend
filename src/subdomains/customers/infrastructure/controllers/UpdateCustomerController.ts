import { Request, Response } from "express";
import { Customer } from "../../domain/Customer";
import { GetCustomerByEmailUseCase } from "../../useCases/getCustomerByEmail";
import { CustomCustomerRepository } from "../repositories/CustomCustomerRepository";

export class UpdateCustomerController {
  async run(request: Request, response: Response) {
    const { email } = request.params
    const useCase = new GetCustomerByEmailUseCase()
    const customerRepository = new CustomCustomerRepository()
    let customer: Customer | undefined
  
    try {
      customer = await useCase.execute(email)
    } catch (error) {
      return response.status(500).json('Internal Server Error')
    }
  
    if (!customer) return response.status(404).json('Customer does not exist!')
  
    try {
      await customerRepository.update(email, request.body)
      customer = await customerRepository.getCustomerByEmail(email)
    } catch (error) {
      return response.status(500).json('Error on updating customer!')
    }
  
    return response.status(200).json({ customer })
  }
}
