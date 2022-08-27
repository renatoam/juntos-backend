import { client } from "../infrastructure/database/postgres"
import { runMigrations } from "../infrastructure/database/postgres/runMigrations"
import { clearDatabase } from "./clearDatabase"
import { populateDatabase } from "./populateDatabase"

export const initDatabase = async () => {
  client.connect()

  try {
    await clearDatabase()
  } catch (error) {
    const decodedError = error as Error
    console.error(error)
    
    return decodedError.message
  }
  
  try {
    await runMigrations()
  } catch (error) {
    const decodedError = error as Error
    console.error(error)
    
    return decodedError.message
  }
  
  try {
    await populateDatabase()
  } catch (error) {
    const decodedError = error as Error
    console.error(error)
    
    return decodedError.message
  }
}
