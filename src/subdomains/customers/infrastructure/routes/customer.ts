import { Router } from "express";
import { client } from "../../../../shared/infrastructure/database/postgres";
import { LocationMapper } from "../../../../shared/infrastructure/mappers/LocationMapper";
import { Customer } from "../../domain/Customer";
import { GetAllCustomersController } from "../controllers/GetAllCustomersController";
import { GetCustomerByEmailController } from "../controllers/GetCustomerByEmailController";
import { UpdateCustomerController } from "../controllers/UpdateCustomerController";
import { CustomCustomerRepository } from "../repositories/CustomCustomerRepository";

const customerRoutes = Router()

customerRoutes.get('/', new GetAllCustomersController().run)
customerRoutes.get('/:email', new GetCustomerByEmailController().run)

customerRoutes.put('/:email', new UpdateCustomerController().run)

customerRoutes.post('/create', async (request, response) => {
  const data = request.body as Customer
  const customerRepository = new CustomCustomerRepository()
  const doesCustomerExists = await customerRepository.exists(data.email)

  if (doesCustomerExists) return response.status(409).json({
    description: 'Conflict',
    message: 'Customer already exists!'
  })

  const location = LocationMapper.toPersistence(data.location)
  const insertQueryFields = Object.keys(location).join(',')
  const insertQueryValues = Object.values(location).map(value => `'${value}'`).join(',')

  const newCustomer = Customer.create({
    name: data.name,
    type: 'customers',
    cell: data.cell,
    dob: data.dob,
    email: data.email,
    gender: data.gender,
    location: data.location,
    occupation: data.occupation,
    phone: data.phone,
    picture: data.picture,
    registered: data.registered,
    role_id: data.role_id
  })

  await client
  .query(`INSERT INTO locations(${insertQueryFields}) VALUES (${insertQueryValues});`)
await client
  .query(`INSERT INTO locations_customers(location_id, customer_id) VALUES ('${location.location_id}', '${newCustomer.id}');`)

  try {
    await customerRepository.save(newCustomer)
    const customer = await customerRepository.getCustomerByEmail(newCustomer.email)

    return response.status(200).json({
      message: 'Customer successfully created!',
      customer
    })
  } catch (error) {
    return response.status(500).json(`Error on creating customer: ${error}`)
  }
})

export default customerRoutes
