import { Occupation } from "../../subdomains/employees/types"

export type IdentifierType = string | number

export enum RequestMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete'
}

export enum SearchKey {
  id = 'id',
  email = 'email'
}

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

export type PersonType = 'customers' | 'employees'

export interface PersonProps {
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
