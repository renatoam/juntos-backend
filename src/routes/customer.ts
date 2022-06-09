import { Router } from "express";

const customerRoutes = Router()

customerRoutes.get('/', (_, res) => {
  return res.send('GET route for customer!')
})

export default customerRoutes
