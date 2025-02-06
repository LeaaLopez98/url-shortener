import express from 'express'
import './src/config/db.js'

const app = express()

const PORT = 3000

app.use(express.json())

app.listen(PORT, () => {
  console.info(`Application run in port ${PORT}`)
})
