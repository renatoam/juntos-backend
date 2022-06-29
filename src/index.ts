import { app } from './server'

app.listen(process.env.PORT ?? 8080, () => console.log(`Running on ${process.env.PORT}`))
