import { Request, Response } from "express";
import { CreateCustomerUseCase } from "../../useCases/createCustomer";
import { CreateCustomerDTO } from "../dtos/CreateCustomerDTO";

export class CreateCustomerController {
  async run(request: Request, response: Response) {
    const createCustomerDTO = request.body as CreateCustomerDTO
    const createCustomerUseCase = new CreateCustomerUseCase()

    try {
      const customer = await createCustomerUseCase.execute(createCustomerDTO)

      return response.status(200).json({
        message: 'Customer successfully created!',
        customer
      })
    } catch (error) {
      const decodedError = error as Error
      const errorDescription = decodedError.message.toLowerCase()

      switch (errorDescription) {
        case 'conflict':
          return response.status(409).json({
            status: 409,
            description: decodedError.stack,
            message: 'Customer already exists!'
          })
        case 'location':
          return response.status(500).json({
            status: 500,
            description: decodedError.stack,
            message: 'Error on saving location.'
          })
        case 'create':
          return response.status(500).json({
            status: 500,
            description: decodedError.stack,
            message: 'Error on creating new customer.'
          })
        default:
          return response.status(500).json({
            status: 500,
            description: decodedError.stack,
            message: 'Error on trying to create customer.'
          })
      }
    }
  }   
}
