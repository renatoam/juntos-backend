import { client } from "../infrastructure/database/postgres"
import { runMigrations } from "../infrastructure/database/postgres/runMigrations"
import { clearDatabase } from "./clearDatabase"
import { populateDatabase } from "./populateDatabase"

export const initDatabase = async () => {
  client.connect()

  await clearDatabase()
  await runMigrations()
  await populateDatabase()
}
