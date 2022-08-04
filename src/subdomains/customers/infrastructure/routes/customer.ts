import { Router } from "express";
import { client } from "../../../../shared/infrastructure/database/postgres";
import { GetAllCustomersController } from "../controllers/GetAllCustomersController";

const customerRoutes = Router()

customerRoutes.get('/', new GetAllCustomersController().run)

customerRoutes.post('/', (request, response) => {
  const data = request.body

  console.log({ data: data.employees[0] })
  response.status(200).send(data)
})

export default customerRoutes
