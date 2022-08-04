import cors from 'cors'
import express from 'express'
import router from './routes/index'

const app = express()

app.use(express.json())
app.use(cors({
  origin: '*'
}))
app.use('/api/v1', router)

export { app }
