import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { client } from './postgres'

export function runMigrations() {
  client.connect()
  
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const migrations = path.join(__dirname, './migrations')

  fs.readdir(migrations, (error, files) => {
    if (error) return

    files.forEach(file => {
      fs.readFile(path.join(migrations, file), (err, data) => {
        if (err) return

        client.query(data.toString())
      })
    })
  })
}
