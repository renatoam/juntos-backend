import { Request, Response } from "express";
import { DeleteCustomerUseCase } from "../../useCases/deleteCustomer";

export class DeleteCustomerController {
  async run(request: Request, response: Response) {
    const { email } = request.params
    const deleteCustomerUseCase = new DeleteCustomerUseCase()

    try {
      const wasDeleted = await deleteCustomerUseCase.execute(email)

      if (wasDeleted) return response.status(200).end()
      
      return response.status(404).json({
        status: 404,
        description: '',
        message: 'Customer does not exist.'
      })
    } catch (error) {
      const decodedError = error as Error

      return response.status(500).json({
        status: 500,
        description: decodedError.stack,
        message: 'Something went wrong!'
      })
    }
  }
}