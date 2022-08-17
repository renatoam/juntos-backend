import { DobType, LocationType, NameType, PersonType, PictureType, RegisteredType } from "../../../../shared/types"
import { Occupation } from "../../../employees/types"

export interface CreateCustomerDTO {
  type: PersonType
  gender: string
  name: NameType
  location: LocationType
  email: string
  dob: DobType
  registered: RegisteredType
  phone: string
  cell: string
  role_id: string
  occupation: Occupation
  picture: PictureType
}