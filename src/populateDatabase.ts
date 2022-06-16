import { readFileSync } from 'fs'
import { v4 as uuid } from 'uuid'
import { client } from './shared/infrastructure/database/postgres'

export function getDataFromJson() {
  const bufferData = readFileSync('data.json')
  const jsonData = bufferData.toString('utf-8')
  const jsData = JSON.parse(jsonData)

  jsData.results.map((item: any) => {
    try {
      client.query('INSERT INTO customers(customer_id, created_on, title, first_name, last_name, email, gender, birth_date, registered, phone, cell, role_id) VALUES ($1, to_timestamp($2 / 1000.0), $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);',
      [
        uuid(),
        Date.now(),
        item.name.title,
        item.name.first,
        item.name.last,
        item.email,
        item.gender,
        item.dob.date,
        item.registered.date,
        item.phone,
        item.cell,
        'c81bc81b-dead-4e5d-abff-90865d1e13b3'
      ], (error, result) => {
        if (error) return false

        console.log({ result })
      })
    } catch (error) {
      console.error({ error })
    }
  })
}

