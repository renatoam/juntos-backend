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
  firstName: string
  lastName: string
}

// criei dois, porque os json são só first e last, ai me deu preguiça de mexer
export type PersonNameType = {
  title: string
  first: string
  last: string
}

export type PhoneType = {
  main: string
  cell: string
}

export type RoleType = {
  id: number
  description?: string
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
  id?: string
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
  id?: string
  type: PersonType
  gender: string
  name: PersonNameType
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
