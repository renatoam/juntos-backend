import { Repository } from "../../../../shared/infrastructure/Repository";
import { LocationType } from "../../../../shared/types";

export interface LocationRepository extends Repository<LocationType> {
  getLocationByState(state: string): Promise<LocationType>
}
