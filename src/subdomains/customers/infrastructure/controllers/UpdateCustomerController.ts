import { Request, Response } from "express";
import { Customer } from "../../domain/Customer";
import { GetCustomerByEmailUseCase } from "../../useCases/getCustomerByEmail/GetCustomerByEmailUseCase";
import { UpdateCustomerUseCase } from "../../useCases/updateCustomer/UpdateCustomerUseCase";
import { RequestUpdateCustomerDTO, UpdateCustomerDTO } from "../dtos/UpdateCustomerDTO";
import { CustomerMapper } from "../mappers/CustomerMapper";

export class UpdateCustomerController {
  async run(request: Request, response: Response) {
    const { email } = request.params
    const requestDTO = request.body as RequestUpdateCustomerDTO
    const updateCustomerUseCase = new UpdateCustomerUseCase()
    const getCustomerByEmail = new GetCustomerByEmailUseCase()
    let customer: Customer

    try {
      await getCustomerByEmail.execute(email)
    } catch (error) {
      const decodedError = error as Error

      return response.status(404).json({
        status: 404,
        description: decodedError.stack,
        message: decodedError.message
      })
    }
  
    try {
      await updateCustomerUseCase.execute(requestDTO)

      try {
        console.log({ email })
        customer = await getCustomerByEmail.execute(email)
        console.log({ customer })
      } catch (error) {
        const decodedError = error as Error
        
        return response.status(200).json({
          status: 200,
          description: decodedError.stack,
          message: 'Customer updated, but there was an error on retrieving.'
        })
      }

      return response.status(200).json({
        message: 'Customer successfully updated!',
        customer: CustomerMapper.toDTO(customer)
      })
    } catch (error) {
      const decodedError = error as Error
      const errorDescription = decodedError.message.toLowerCase()

      switch (errorDescription) {
        case 'not found':
          return response.status(404).json({
            status: 404,
            description: decodedError.stack,
            message: 'Customer does not exists!'
          })
        case 'update':
          return response.status(500).json({
            status: 500,
            description: decodedError.stack,
            message: 'Error on updating customer.'
          })
        default:
          return response.status(500).json({
            status: 500,
            description: decodedError.stack,
            message: 'Error on trying to update customer.'
          })
      }
    }
  }
}
