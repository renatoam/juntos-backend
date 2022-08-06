import { Router } from "express";
import { Customer } from "../../domain/Customer";
import { GetCustomerByEmailUseCase } from "../../useCases/getCustomerByEmail";
import { GetAllCustomersController } from "../controllers/GetAllCustomersController";
import { GetCustomerByEmailController } from "../controllers/GetCustomerByEmailController";
import { CustomCustomerRepository } from "../repositories/CustomCustomerRepository";

const customerRoutes = Router()

type FieldType = keyof Customer

customerRoutes.get('/', new GetAllCustomersController().run)
customerRoutes.get('/:email', new GetCustomerByEmailController().run)

customerRoutes.put('/:email', async (request: any, response: any) => {
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
})

customerRoutes.post('/', (request, response) => {
  const data = request.body

  console.log({ data: data.employees[0] })
  response.status(200).send(data)
})

export default customerRoutes
