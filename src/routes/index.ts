import { Router } from "express";
import customerRoutes from "./customer";
import employeeRoutes from "./employee";

const router = Router()

router.use('/employees', employeeRoutes)
router.use('/customers', customerRoutes)

export default router
