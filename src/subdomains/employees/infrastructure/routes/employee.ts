import { Router } from "express";

const employeeRoutes = Router()

employeeRoutes.get('/', (_, res) => {
  return res.send('GET route for employees')
})

export default employeeRoutes
