import * as authService from '../services/authService.js'

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body

    const token = await authService.loginUser(username, password)

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
