import express from 'express'
import cors from 'cors'
import router from './routes/index'
import { runMigrations } from './shared/infrastructure/database/postgres/runMigrations'
import { getDataFromJson } from './populateDatabase'
import { redis } from './shared/infrastructure/database/redis'

const app = express()

runMigrations()
getDataFromJson()

// testing redis
redis.set('testing', 'success')

// setTimeout(async () => {
//   console.log(await redis.get('testing'))
// }, 500)

app.use(express.json())
app.use(cors({
  origin: '*'
}))
app.use('/api/v1', router)

app.listen(process.env.PORT ?? 8080, () => console.log(`Running on ${process.env.PORT}`))
