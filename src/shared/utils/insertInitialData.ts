import { client } from "../infrastructure/database/postgres"
import { PersonProps, PersonType } from "../types"
import { extractLocationData, extractPersonData } from "./extractData"
import { readLocalFile } from "./readLocalFile"

export async function insertInitialPersonData(personType: PersonType, query: string) {
  const fileData = readLocalFile<PersonProps>(personType)

  fileData?.forEach(async item => {
    try {
      const extractedData = extractPersonData(item)
      await client.query(query, extractedData)
    } catch (error) {
      console.error({ error })
    }
  })
}

export async function insertInitialLocationData(personType: PersonType, query: string) {
  const fileData = readLocalFile<PersonProps>(personType)

  fileData.forEach(async item => {
    try {
      const extractData = extractLocationData(item)
      await client.query(query, extractData)
    } catch (error) {
      console.error({ error })
    }
  })
}
