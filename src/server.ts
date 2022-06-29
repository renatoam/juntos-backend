import cors from 'cors'
import express from 'express'
import router from './routes/index'
import { initDatabase } from './shared/utils/initDatabase'

const app = express()

initDatabase()

app.use(express.json())
app.use(cors({
  origin: '*'
}))
app.use('/api/v1', router)

export { app }
