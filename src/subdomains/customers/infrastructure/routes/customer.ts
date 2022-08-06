import { Router } from "express";
import { GetAllCustomersController } from "../controllers/GetAllCustomersController";
import { GetCustomerByEmailController } from "../controllers/GetCustomerByEmailController";
import { UpdateCustomerController } from "../controllers/UpdateCustomerController";

const customerRoutes = Router()

customerRoutes.get('/', new GetAllCustomersController().run)
customerRoutes.get('/:email', new GetCustomerByEmailController().run)

customerRoutes.put('/:email', new UpdateCustomerController().run)

customerRoutes.post('/', (request, response) => {
  const data = request.body

  console.log({ data: data.employees[0] })
  response.status(200).send(data)
})

export default customerRoutes
