import express from 'express'
import './src/config/db.js'

import { urlRouter } from './src/routes/urlRoutes.js'
import { authRouter } from './src/routes/authRoutes.js'

const app = express()

const PORT = 3000

app.use(express.json())
app.use('/api/urls', urlRouter)
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
  console.info(`Application run in port ${PORT}`)
})
