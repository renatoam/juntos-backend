import path from "path"
import { v4 as uuid } from 'uuid'
import { fileURLToPath } from "url"
import { PersonCollection } from "../domain/PersonCollection"
import { PersonProps, PersonType } from "../types"
import { readLocalFile } from "./readLocalFile"

export const getDirname = (meta: ImportMeta) => {
  const __filename = fileURLToPath(meta.url)
  return path.dirname(__filename)
}

export function populatePersonCollection(person: PersonProps, personCollection: PersonCollection) {
  if (person.type === 'employees') {
    const { location, ...employeeProps } = person

    personCollection.addEmployee({
      ...employeeProps,
      id: uuid()
    })

    return personCollection
  }

  const { occupation, ...customerProps } = person
  const newCustomer = {
    ...customerProps,
    id: uuid()
  }
  const newLocation = {
    ...customerProps.location,
    id: uuid()
  }

  personCollection.addCustomer(newCustomer)
  personCollection.addLocation(newLocation)
  personCollection.addCustomerLocationRelation({
    customerId: newCustomer.id,
    locationId: newLocation.id
  })

  return personCollection
}

export async function createPersonCollectionFromFile(personTypes: PersonType[]) {
  const personCollection = PersonCollection.create()
  const files = personTypes.map(type => readLocalFile<PersonProps>(type))
  
  const refinedPerson: PersonCollection = await new Promise((resolve) => {
    files.forEach(file => {
      file?.forEach(rawPerson => {
        resolve(populatePersonCollection(rawPerson, personCollection))
      })
    })
  })

  return refinedPerson
}

export function calculateAge(date: Date): number {
  const currentYear = new Date().getFullYear()
  const incomingYear = new Date(date).getFullYear()

  return currentYear - incomingYear
}
