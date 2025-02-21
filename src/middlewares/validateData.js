import CustomError from '../error/CustomError.js'
import { BAD_REQUEST } from '../constants/statusCodes.js'

const checkUrl = (url) => {
  console.log(url)
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }

  return url
}

const validateData = (schema) => (req, res, next) => {
  if (req.body.originalUrl) { req.body.originalUrl = checkUrl(req.body.originalUrl) }

  console.log('BODY -> ', req.body)
  const { error } = schema.validate(req.body, { abortEarly: false })

  if (error) {
    throw new CustomError(BAD_REQUEST, error.details.map((err) => err.message + ' \n'))
  }

  return next()
}

export default validateData
