import express from 'express'
import swaggerUi from 'swagger-ui-express'
import spec from './src/config/swagger.js'
import './src/config/db.js'

import { urlRouter } from './src/routes/urlRoutes.js'
import { authRouter } from './src/routes/authRoutes.js'
import { errorHandler } from './src/middlewares/errorHandler.js'

const app = express()

const PORT = 3000

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec))
app.use(express.json())

app.use('', urlRouter)
app.use('/api/auth', authRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.info(`Application run in port ${PORT}`)
})
