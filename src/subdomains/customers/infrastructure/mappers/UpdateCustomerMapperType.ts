import { LocationToPersistence } from "../../../../shared/infrastructure/mappers/LocationMapperType"

export interface UpdateCustomerToPersistence {
  customer: {
    customer_id: string
    created_on: string
    title: string
    first_name: string
    last_name: string
    email: string
    birth_date: Date
    registered: Date
    gender: string
    phone: string
    cell: string
    thumbnail: string
    medium: string
    large: string
    role_id: number
  }
  location: LocationToPersistence
}
