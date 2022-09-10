import { client } from "../../../../shared/infrastructure/database/postgres";
import { LocationMapper } from "../../../../shared/infrastructure/mappers/LocationMapper";
import { LocationType } from "../../../../shared/types";
import { insertInto } from "../../../../shared/utils/queryFunctions";
import { LocationRepository } from "./LocationRepository";

export class CustomLocationRepository implements LocationRepository {
  getLocationByState(state: string): Promise<LocationType> {
    throw new Error("Method not implemented.");
  }
  exists(t: string): Promise<boolean> {
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