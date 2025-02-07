import express from 'express'
import './src/config/db.js'

import { urlRouter } from './src/routes/urlRoutes.js'

const app = express()

const PORT = 3000

app.use(express.json())
app.use('/api/urls', urlRouter)

app.listen(PORT, () => {
  console.info(`Application run in port ${PORT}`)
})
