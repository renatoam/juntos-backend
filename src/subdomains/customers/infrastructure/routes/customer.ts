import { Router } from "express";
import { GetAllCustomersController } from "../controllers/GetAllCustomersController";
import { CustomCustomerRepository } from "../repositories/CustomCustomerRepository";

const customerRoutes = Router()

customerRoutes.get('/', new GetAllCustomersController().run)
customerRoutes.get('/:email', async (request, response) => {
  const customerRepository = new CustomCustomerRepository()
  const customerEmail = request.params.email
  const customer = await customerRepository.getCustomerByEmail(customerEmail)

  return response.status(200).json({ customer })
})

customerRoutes.post('/', (request, response) => {
  const data = request.body

  console.log({ data: data.employees[0] })
  response.status(200).send(data)
})

export default customerRoutes
