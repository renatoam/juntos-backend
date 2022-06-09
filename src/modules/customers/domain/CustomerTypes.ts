import { CustomerEmail } from "./valueObjects/CustomerEmail"
import { CustomerName } from "./valueObjects/CustomerName"

export type GenderType = 'female' | 'male' | 'other'

export type NameType = {
  title: string
  first: string
  last: string
}

export type CoordinateType = {
  latitude: string
  longitude: string
}

export type TimezoneType = {
  offset: string
  description: string
}

export type LocationType = {
  street: string
  city: string
  state: string
  postcode: number
  coordinates: CoordinateType
  timezone: TimezoneType
}

export type DobType = {
  date: Date
  age: number
}

export type RegisteredType = {
  date: Date
  age: number
}

export type PictureType = {
  large: string
  medium: string
  thumbnail: string
}

export interface CustomerProps {
  gender?: string
  name: CustomerName
  location?: LocationType
  email?: CustomerEmail
  dob?: DobType
  registered?: RegisteredType
  phone?: string
  cell?: string
  picture?: PictureType
}
