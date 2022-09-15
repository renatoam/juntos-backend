import { LocationType, PictureType, NameType, RoleType } from "../../../../shared/types"

export interface CustomerDTO {
  id: string
  name: NameType
  email: string
  gender: string
  birthdate: Date
  registered: Date
  phone: {
    main: string
    cell: string
  }
  picture: PictureType
  role: RoleType
  location: LocationType
}
