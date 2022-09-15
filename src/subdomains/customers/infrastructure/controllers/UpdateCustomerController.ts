import { Request, Response } from "express";
import { Customer } from "../../domain/Customer";
import { GetCustomerByEmailUseCase } from "../../useCases/getCustomerByEmail/GetCustomerByEmailUseCase";
import { UpdateCustomerUseCase } from "../../useCases/updateCustomer/UpdateCustomerUseCase";
import { UpdateCustomerDTO } from "../dtos/UpdateCustomerDTO";
import { CustomerMapper } from "../mappers/CustomerMapper";

export class UpdateCustomerController {
  async run(request: Request, response: Response) {
    const { email } = request.params
    const requestDTO = request.body as UpdateCustomerDTO
    const updateCustomerUseCase = new UpdateCustomerUseCase()
    const getCustomerByEmailUseCase = new GetCustomerByEmailUseCase()
    let customer: Customer[]

    try {
      const rawCustomer = await getCustomerByEmailUseCase.execute(requestDTO.email)

      if (!rawCustomer.length) {
        return response.status(404).json({
          status: 409,
          message: 'Customer does not exist.'
        })
      }
    } catch (error) {
      const errorMessage = (error as Error).message
      return response.status(500).json({ message: errorMessage })
    }
  
    try {
      await updateCustomerUseCase.execute(requestDTO)

      try {
        customer = await getCustomerByEmailUseCase.execute(email)
      } catch {
        return response.status(500)
          .json({ message: 'Customer updated, but there was an error on retrieving.' })
      }

      return response.status(200).json({
        message: 'Customer successfully updated!',
        customer: CustomerMapper.toDTO(customer[0])
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
