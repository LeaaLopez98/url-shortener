import * as authService from '../services/authService.js'

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body

    const token = await authService.loginUser(username, password)

    if (!token) {
      return res.status(403).send('Invalid username or password')
    }

    return res.status(200).json({ token })
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error')
  }
}

export const registerUser = async (req, res) => {
  try {
    const userData = req.body

    const token = await authService.registerUser(userData)

    return res.status(200).json({ token })
  } catch (err) {
    console.log(err)
    return res.status(500).send('Internal Server Error')
  }
}
