import { Router } from "express";
import { client } from "../postgres";

const customerRoutes = Router()

customerRoutes.get('/', (_, res) => {
  client.connect()
  client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
  })

  return res.send('GET route for customer!')
})

export default customerRoutes
