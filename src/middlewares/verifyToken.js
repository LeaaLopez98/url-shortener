import jwt from 'jsonwebtoken'

const extractUserFromToken = (req) => {
  let token = req.headers.authorization

  if (!token) {
    throw new Error('Token is required')
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  } else {
    throw new Error('Invalid token')
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded.idUser
  } catch (err) {
    throw new Error('Invalid token')
  }
}

export const verifyJwt = (req, res, next) => {
  try {
    const idUser = extractUserFromToken(req)

    if (!idUser) {
      return res.status(403).send('Invalid Token')
    }

    req.idUser = idUser
    next()
  } catch (err) {
    return res.status(401).send(err.message)
  }
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

    return res.status(401).send(err.message)
  }
}
