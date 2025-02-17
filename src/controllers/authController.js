import * as authService from '../services/authService.js'

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body

    const token = await authService.loginUser(username, password)

    if (!token) {
      return res.status(403).send('Invalid username or password')
    }

    return res.status(200).json({ token })
  } catch (err) {
    return next(err)
  }
}

export const registerUser = async (req, res, next) => {
  try {
    const userData = req.body

    const token = await authService.registerUser(userData)

    return res.status(200).json({ token })
  } catch (err) {
    return next(err)
  }
}
