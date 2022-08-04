import { Router } from "express";
import { client } from "../../../../shared/infrastructure/database/postgres";

const customerRoutes = Router()

customerRoutes.get('/', async (_, response) => {
  const result = await client.query('SELECT * FROM customers LIMIT 20;')
  const customers = result.rows
  
  response.status(200).send({customers})
})

customerRoutes.post('/', (request, response) => {
  const data = request.body

  console.log({ data: data.employees[0] })
  response.status(200).send(data)
})

export default customerRoutes
