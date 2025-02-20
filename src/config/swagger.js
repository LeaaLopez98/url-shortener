import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Url shortened API documentation',
      version: '1.0.0',
      servers: [
        {
          url: 'http://localhost:3000/',
          description: 'Local server'
        }
      ]
    }
  },
  apis: ['./swagger/*.yml']
}

const spec = swaggerJsdoc(options)

export default spec
