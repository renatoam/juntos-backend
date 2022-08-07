import { Request, Response } from "express";
import { UpdateCustomerUseCase } from "../../useCases/updateCustomer";

export class UpdateCustomerController {
  async run(request: Request, response: Response) {
    const { email } = request.params
    const fieldsToUpdate = request.body
    const updateCustomerUseCase = new UpdateCustomerUseCase()
  
    try {
      const customer = await updateCustomerUseCase.execute(email, fieldsToUpdate)

      return response.status(200).json({
        message: 'Customer successfully updated!',
        customer
      })
    } catch (error) {
      return error
    }
  }
}
