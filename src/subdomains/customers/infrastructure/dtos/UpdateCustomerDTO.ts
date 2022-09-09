import { LocationType, NameType, PhoneType, PictureType } from "../../../../shared/types"

export interface RequestUpdateCustomerDTO {
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

export interface UpdateCustomerDTO {
  id: string
  gender: string
  name: NameType
  email: string
  phone: string
  cell: string
  role_id: string
  picture: PictureType
}
