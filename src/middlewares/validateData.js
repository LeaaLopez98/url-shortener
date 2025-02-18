import CustomError from '../error/CustomError.js'
import { BAD_REQUEST } from '../constants/statusCodes.js'

const validateData = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false })

  if (error) {
    throw new CustomError(BAD_REQUEST, error.details.map((err) => err.message + ' \n'))
  }

  return next()
}
export default validateData
