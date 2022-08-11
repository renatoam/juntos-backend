import { Router } from "express";
import { CreateCustomerController } from "../controllers/CreateCustomerController";
import { DeleteCustomerController } from "../controllers/DeleteCustomerController";
import { GetAllCustomersController } from "../controllers/GetAllCustomersController";
import { GetCustomerByEmailController } from "../controllers/GetCustomerByEmailController";
import { UpdateCustomerController } from "../controllers/UpdateCustomerController";

const customerRoutes = Router()

customerRoutes.get('/', new GetAllCustomersController().run)
customerRoutes.get('/:email', new GetCustomerByEmailController().run)
customerRoutes.put('/:email', new UpdateCustomerController().run)
customerRoutes.post('/create', new CreateCustomerController().run)
customerRoutes.delete('/:email', new DeleteCustomerController().run)

export default customerRoutes
