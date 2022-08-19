import { LocationType } from "../../../../shared/types"

export interface CustomerDTO {
  id: string
  name: {
    title: string
    firstname: string
    lastname: string
  }
  email: string
  gender: string
  birthdate: Date
  registered: Date
  phone: {
    main: string
    cell: string
  }
  picture: {
    thumbnail: string
    medium: string
    large: string
  }
  role: string
  location: LocationType
}
