import { LocationType, NameType, PhoneType, PictureType } from "../../../../shared/types"

export interface UpdateCustomerDTO {
  id: string
  name: NameType
  email: string
  gender: string
  birthdate: Date
  registered: Date
  phone: PhoneType
  picture: PictureType
  location: LocationType
  role_id: number
}
