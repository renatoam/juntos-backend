import express from 'express'
import cors from 'cors'
import router from './routes/index'
import { runMigrations } from './shared/infrastructure/database/runMigrations'
import { getDataFromJson } from './populateDatabase'

const app = express()

runMigrations()
getDataFromJson()

app.use(express.json())
app.use(cors({
  origin: '*'
}))
app.use('/api/v1', router)

app.listen(process.env.PORT ?? 8080, () => console.log(`Running on ${process.env.PORT}`))
