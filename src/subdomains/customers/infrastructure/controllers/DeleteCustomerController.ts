import { Request, Response } from "express";
import { CustomCustomerRepository } from "../repositories/CustomCustomerRepository";

export class DeleteCustomerController {
  async run(request: Request, response: Response) {
    const { email } = request.params
    const customerRepository = new CustomCustomerRepository()

    try {
      const wasDeleted = await customerRepository.remove(email)

      if (wasDeleted) return response.status(201).end()
      
      return response.status(400).json('Customer does not exist!')
    } catch (error) {
      return response.status(500).json({ message: 'Something went wrong!' })
    }
  }
}