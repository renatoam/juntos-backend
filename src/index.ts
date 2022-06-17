import express from 'express'
import cors from 'cors'
import router from './routes/index'
import { populateDatabase } from './populateDatabase'

const app = express()

populateDatabase()

app.use(express.json())
app.use(cors({
  origin: '*'
}))
app.use('/api/v1', router)

app.listen(process.env.PORT ?? 8080, () => console.log(`Running on ${process.env.PORT}`))
