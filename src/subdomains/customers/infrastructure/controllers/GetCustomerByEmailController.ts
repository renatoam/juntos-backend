import { Request, Response } from "express";
import { CustomCustomerRepository } from "../repositories/CustomCustomerRepository";

export class GetCustomerByEmailController {
  async run(request: Request, response: Response) {
    const customerRepository = new CustomCustomerRepository()
    const customerEmail = request.params.email
    const customer = await customerRepository.getCustomerByEmail(customerEmail)

    return response.status(200).json({ customer })
  }
}
