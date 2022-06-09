import express from 'express'
import cors from 'cors'
import router from './routes/index'

const app = express()

app.use(cors())
app.use('/api/v1', router)

app.listen(process.env.PORT ?? 8080, () => console.log('Running'))
