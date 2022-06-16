import { Router } from "express";
import { createReadStream, readFile, readFileSync } from "fs";
import { client } from "../shared/infrastructure/database/postgres";

const customerRoutes = Router()

customerRoutes.get('/', (_, response) => {
  try {
    client.query('SELECT * FROM customers', (err, res) => {
      if (err) response.status(500).send('Erro no PG')
      response.status(200).send(res)
    })
  } catch (error) {
    response.send(500).send({
      message: 'Ai deu ruim pra mim',
      error
    })
  }
})

customerRoutes.post('/', (request, response) => {
  const data = request.body

  console.log({ data: data.employees[0] })
  response.status(200).send(data)
})

export default customerRoutes
