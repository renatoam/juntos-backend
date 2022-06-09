import express from 'express'

const app = express()

app.get('/', (_, res) => {
  res.send('hello, there')
})

app.listen(8080, () => console.log('Running'))
