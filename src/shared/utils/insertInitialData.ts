import { PersonCollection } from "../domain/PersonCollection"
import { client } from "../infrastructure/database/postgres"
import { extractLocationCustomerData, extractLocationData, extractPersonData } from "./extractData"

export async function insertInitialEmployeeData(query: string, personCollection: PersonCollection) {
  personCollection.employees.forEach(async employee => {
    try {
      const extractedPersonData = extractPersonData(employee)
      await client.query(query, extractedPersonData)
    } catch (error) {
      console.error({ error })
    }
  })
}

export async function insertInitialCustomerData(query: string, personCollection: PersonCollection) {
  personCollection.customers.forEach(async customer => {
    try {
      const extractedCustomerData = extractPersonData(customer)
      await client.query(query, extractedCustomerData)
    } catch (error) {
      console.error({ error })
    }
  })
}

export async function insertInitialLocationData(query: string, personCollection: PersonCollection) {
  personCollection.locations.forEach(async location => {
    try {
      const extractedLocationData = extractLocationData(location)
      await client.query(query, extractedLocationData)
    } catch (error) {
      console.error({ error })
    }
  })
}

export async function insertInitialLocationCustomerData(query: string, personCollection: PersonCollection) {
  personCollection.customerLocation.forEach(async relation => {
    try {
      const extractedLocationData = extractLocationCustomerData(relation)
      await client.query(query, extractedLocationData)
    } catch (error) {
      console.error({ error })
    }
  })
}
