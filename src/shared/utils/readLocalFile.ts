import { readFileSync } from "fs"

export function readLocalFile<T>(datafile: string) {
  const bufferData = readFileSync(`${datafile}.json`)
  const jsonData = bufferData.toString('utf-8')
  
  return JSON.parse(jsonData)[datafile] as T[]
}
