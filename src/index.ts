import { app } from './server'
import { initDatabase } from './shared/utils/initDatabase'

initDatabase()
app.listen(process.env.PORT ?? 8080, () => console.log(`Running on ${process.env.PORT}`))
