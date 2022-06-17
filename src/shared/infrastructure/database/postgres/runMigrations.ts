import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url';
import { client } from '.'

export async function runMigrations() {  
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const migrations = path.join(__dirname, './migrations')

  let migrationFiles: string[]

  try {
    migrationFiles = await fs.readdir(migrations)    
  } catch (error) {
    console.log('Something went wrong on trying read migrations file.', { error })
    return error
  }

  const promiseFiles = migrationFiles.map(async file => {
    return fs.readFile(path.join(migrations, file))
  })

  const files = await Promise.all(promiseFiles)

  files.forEach(async file => {
    try {
      await client.query(file.toString())
    } catch (error) {
      console.error('Something went wrong on trying read migration file.', {
        readingFile: file,
        error
      })

      return error
    }
  })
}
