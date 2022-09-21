import { Request, Response } from "express";
import { DeleteCustomerUseCase } from "../../useCases/DeleteCustomerUseCase";

export class DeleteCustomerController {
  private deleteCustomerUseCase: DeleteCustomerUseCase

  constructor(deleteCustomerUseCase: DeleteCustomerUseCase) {
    this.deleteCustomerUseCase = deleteCustomerUseCase
  }

  async run(request: Request, response: Response) {
    const { email } = request.params

    try {
      const wasDeleted = await this.deleteCustomerUseCase.execute(email)

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