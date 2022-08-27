import { VIEWER_ROLE_ID } from "../constants"
import { CustomerLocation } from "../domain/Person"
import { LocationType, PersonProps } from "../types"

export function extractPersonData(person: Partial<PersonProps>) {
  const extractedData = [
    person.id,
    Date.now(),
    person.name?.title,
    person.name?.first,
    person.name?.last,
    person.email,
    person.gender,
    person.dob?.date,
    person.registered?.date,
    person.phone,
    person.cell,
    person.picture?.thumbnail,
    person.picture?.medium,
    person.picture?.large,
    person.role_id || VIEWER_ROLE_ID
  ]

  if (person.type === 'employees')
    extractedData.push(person.occupation)

  return extractedData
}

export function extractLocationData(location: LocationType) {
  return [
    location.id,
    location?.street,
    location?.city,
    location?.state,
    location?.postcode,
    location?.coordinates.latitude,
    location?.coordinates.longitude,
    location?.timezone.offset,
    location?.timezone.description
  ]
}

export function extractLocationCustomerData(relation: CustomerLocation) {
  return [
    relation.locationId,
    relation.customerId
  ]
}
