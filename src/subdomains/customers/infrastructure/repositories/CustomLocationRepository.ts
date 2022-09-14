import { client } from "../../../../shared/infrastructure/database/postgres";
import { LocationMapper } from "../../../../shared/infrastructure/mappers/LocationMapper";
import { LocationType } from "../../../../shared/types";
import { insertInto } from "../../../../shared/utils/queryFunctions";
import { LocationRepository } from "./LocationRepository";

export class CustomLocationRepository implements LocationRepository {
  getLocationByState(state: string): Promise<LocationType> {
    throw new Error("Method not implemented.");
  }

  async getLocationByCustomer(customerId: string): Promise<LocationType> {
    const query = `SELECT l.* FROM locations l INNER JOIN locations_customers lc USING(location_id) WHERE lc.customer_id = '${customerId}';`

    const result = await client.query(query)
    const location = LocationMapper.toDomain(result.rows[0])

    return location
  } 

  exists(locationId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async save(location: LocationType): Promise<void> {
    const locationToPersistence = LocationMapper.toPersistence(location)
    const insertLocationQuery = insertInto('locations', locationToPersistence)

    await client.query(insertLocationQuery)
  }

  remove(t: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}