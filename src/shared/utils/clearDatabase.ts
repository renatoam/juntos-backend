import { EXCLUDE_ALL_DB_CONTENT } from "../constants"
import { CLEANING_DATABASE_ERROR } from "../constants/messages"
import { client } from "../infrastructure/database/postgres"

export const clearDatabase = async () => {
  try {
    await client.query(EXCLUDE_ALL_DB_CONTENT)
  } catch (error) {
    throw Error(`${CLEANING_DATABASE_ERROR}. Details: ${error}`)
  }
}
