import User from '../models/userSchema.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const saltRounds = 10

export const registerUser = async (userData) => {
  try {
    const newUser = new User({
      username: userData.username,
      password: await bcrypt.hash(userData.password, saltRounds),
      email: userData.email
    })

    await newUser.save()

    const token = jwt.sign({ username: newUser.username }, process.env.JWT_SECRET)

    return token
  } catch (err) {
    console.log(err)
  }
}

export const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({
      username
    })

    if (!user) {
      return false
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
      return false
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { algorithm: 'HS256' })

    return token
  } catch (err) {
    console.log(err)
  }
}
