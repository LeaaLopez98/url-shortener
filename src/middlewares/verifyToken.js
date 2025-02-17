import jwt from 'jsonwebtoken'
import CustomError from '../error/CustomError.js'
import { UNAUTHORIZED } from '../constants/statusCodes.js'

const extractUserFromToken = (req) => {
  let token = req.headers.authorization

  if (!token) {
    throw new CustomError(UNAUTHORIZED, 'Token is required')
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  } else {
    throw new CustomError(UNAUTHORIZED, 'Invalid token')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded.idUser
  } catch (err) {
    throw new CustomError(UNAUTHORIZED, 'Invalid token')
  }
}

export const verifyJwt = (req, res, next) => {
  const idUser = extractUserFromToken(req)

  if (!idUser) {
    throw new CustomError(UNAUTHORIZED, 'Invalid token')
  }

  req.idUser = idUser
  next()
}

export const verifyTokenToCreateURL = (req, res, next) => {
  try {
    req.idUser = extractUserFromToken(req)
    next()
  } catch (err) {
    if (err.message === 'Token is required') {
      req.idUser = null
      return next()
    }
  }
}
