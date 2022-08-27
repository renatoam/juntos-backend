import fs from 'fs/promises'
import path from 'path'
import { client } from '.'
import { getDirname } from '../../../utils/miscellaneous';

export async function runMigrations() {
  const __dirname = getDirname(import.meta)
  const migrations = path.join(__dirname, './migrations')
  
  const migrationFiles: string[] = await fs.readdir(migrations)
  
  const promiseFiles = migrationFiles.map(async file => {
    return fs.readFile(path.join(migrations, file))
  })

  const files = await Promise.all(promiseFiles)

  files.forEach(async file => {
    try {
      await client.query(file.toString())
    } catch (error) {
      console.error('Error on reading file.', {
        readingFile: file,
        error
      })

      throw Error(`Something went wrong on trying read migration file. Details: ${error}`)
    }
  })
}
