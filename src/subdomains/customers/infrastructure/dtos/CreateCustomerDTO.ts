import { LocationType, NameType, PersonType, PhoneType, PictureType } from "../../../../shared/types"

export interface CreateCustomerDTO {
  type: PersonType
  gender: string
  name: NameType
  location: LocationType
  email: string
  birthdate: Date
  registered: Date
  phone: PhoneType
  role_id: number
  picture: PictureType
}
