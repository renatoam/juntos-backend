import { Request, Response } from "express"
import { client } from "../../../../shared/infrastructure/database/postgres"

export class GetAllCustomersController {
  async run(_request: Request, response: Response) {
    const result = await client.query('SELECT * FROM customers LIMIT 20;')
    const customers = result.rows

    return response.status(200).send({customers})
  }
}
