import { IdentifierType } from "../../../../shared/types"

export interface CustomerToPersistence {
  customer_id: IdentifierType
  created_on: string
  title: string
  first_name: string
  last_name: string
  email: string
  gender: string
  birth_date: Date
  registered: Date
  phone: string
  cell: string
  thumbnail: string
  medium: string
  large: string
  role_id: number
  location_id?: string
}
