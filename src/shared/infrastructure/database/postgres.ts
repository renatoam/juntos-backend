import postgres from 'pg'

const { Client } = postgres
const connectionString = process.env.DATABASE_URL ?? ''
const ssl = {
  rejectUnauthorized: false
}

export const client = new Client({
  connectionString,
  ssl: process.env.NODE_ENV !== 'production' ? false : ssl
})
