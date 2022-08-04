import { Router } from "express";
import customerRoutes from "../subdomains/customers/infrastructure/routes/customer";
import employeeRoutes from "../subdomains/employees/infrastructure/routes/employee";

const router = Router()

router.use('/employees', employeeRoutes)
router.use('/customers', customerRoutes)

export default router
