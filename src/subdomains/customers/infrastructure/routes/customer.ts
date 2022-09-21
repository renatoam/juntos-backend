import { Router } from "express";
import { createCustomerController } from "../../features/CreateCustomer";
import { deleteCustomersController } from "../../features/DeleteCustomer";
import { getCustomerByEmailController } from "../../features/GetCustomerByEmail";
import { getAllCustomersController } from "../../features/GetCustomers";
import { updateCustomerController } from "../../features/UpdateCustomer";

const customerRoutes = Router()

customerRoutes.get('/', getAllCustomersController.run.bind(getAllCustomersController))
customerRoutes.get('/:email', getCustomerByEmailController.run.bind(getCustomerByEmailController))
customerRoutes.put('/:email', updateCustomerController.run.bind(updateCustomerController))
customerRoutes.post('/create', createCustomerController.run.bind(createCustomerController))
customerRoutes.delete('/:email', deleteCustomersController.run.bind(deleteCustomersController))

export default customerRoutes
