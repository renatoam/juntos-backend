import { Router } from "express";
import { createCustomerController } from "../createCustomer";

const router = Router()

router.post('/create', createCustomerController.execute)
