import { LocationType } from "../../types"
import { LocationToPersistence } from "./LocationMapperType"

export class LocationMapper {
  public static toPersistence(location: LocationType): LocationToPersistence {
    return {
      location_id: location.id!,
      street: location.street,
      city: location.city,
      state: location.state,
      postcode: location.postcode,
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
      off: location.timezone.offset,
      description: location.timezone.description,
    }
  }
}
