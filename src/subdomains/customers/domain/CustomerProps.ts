import { PersonProps } from "../../../shared/types"

export type PictureType = {
  large: string
  medium: string
  thumbnail: string
}

export interface CustomerProps extends PersonProps {
  picture?: PictureType
}

export interface CustomerJsonToPersistence {
  customer_id: string
  created_on: number
  title: string
  first_name: string
  last_name: string
  email: string
  gender: string
  birth_date: string
  registered: string
  phone: string
  cell: string
  role_id: string
}
