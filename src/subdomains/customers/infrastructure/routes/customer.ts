import { Router } from "express";
import { createCustomerController } from "../../features/CreateCustomer";
import { getCustomerByEmailController } from "../../features/GetCustomerByEmail";
import { updateCustomerController } from "../../features/UpdateCustomer";
import { DeleteCustomerController } from "../controllers/DeleteCustomerController";
import { GetAllCustomersController } from "../controllers/GetAllCustomersController";

const customerRoutes = Router()

customerRoutes.get('/', new GetAllCustomersController().run)
customerRoutes.get('/:email', getCustomerByEmailController.run.bind(getCustomerByEmailController))
customerRoutes.put('/:email', updateCustomerController.run.bind(updateCustomerController))
customerRoutes.post('/create', createCustomerController.run.bind(createCustomerController))
customerRoutes.delete('/:email', new DeleteCustomerController().run)

export default customerRoutes
