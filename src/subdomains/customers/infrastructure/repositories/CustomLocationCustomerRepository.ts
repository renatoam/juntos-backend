import { client } from "../../../../shared/infrastructure/database/postgres";
import { insertInto } from "../../../../shared/utils/queryFunctions";

interface LocationCustomerProps {
  customer_id: string
  location_id: string
}

// I'm not implementing the Repository base since I should make it more generic
// In this case, I would need provide different arguments typs for the methods
export class CustomLocationCustomerRepository {
  async exists(relation: LocationCustomerProps): Promise<boolean> {
    const locationCustomerQuery = `SELECT location_id, customer_id FROM locations_customers
      WHERE location_id = '${relation.location_id}' AND customer_id = '${relation.customer_id}';`
    const result = await client.query(locationCustomerQuery)

    return !!result.rows.length
  }
  
  async save(relation: LocationCustomerProps): Promise<void> {
    const locationCustomerQuery = insertInto('locations_customers', relation)
    await client.query(locationCustomerQuery)
  }
  
  remove(t: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}