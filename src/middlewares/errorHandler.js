import CustomError from '../error/CustomError.js'

export const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message })
  }
  return res.status(500).json({ message: 'Something is wrong' })
}
