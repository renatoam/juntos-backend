import { PersonProps } from "../types"
import { v4 as uuid } from 'uuid'
import { VIEWER_ROLE_ID } from "../constants"

export function extractPersonData(item: PersonProps) {
  const extractedData = [
    uuid(),
    Date.now(),
    item.name.title,
    item.name.first,
    item.name.last,
    item.email,
    item.gender,
    item.dob?.date,
    item.registered?.date,
    item.phone,
    item.cell,
    item.picture?.thumbnail,
    item.picture?.medium,
    item.picture?.large,
    item.role_id || VIEWER_ROLE_ID
  ]

  if (item.type === 'employees')
    extractedData.push(item.occupation)

  return extractedData
}

export function extractLocationData(item: PersonProps) {
  return [
    uuid(),
    item.location?.street,
    item.location?.city,
    item.location?.state,
    item.location?.postcode,
    item.location?.coordinates.latitude,
    item.location?.coordinates.longitude,
    item.location?.timezone.offset,
    item.location?.timezone.description
  ]
}
