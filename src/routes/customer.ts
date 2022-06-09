import { Router } from "express";

const customerRoutes = Router()

customerRoutes.get('/', (_, res) => {
  return res.send('GET Route for customers')
})

export default customerRoutes
