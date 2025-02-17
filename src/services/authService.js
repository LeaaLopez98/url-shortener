import User from '../models/userSchema.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const saltRounds = 10

const generateToken = (idUser) => {
  return jwt.sign({
    idUser,
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
  }, process.env.JWT_SECRET)
}

export const registerUser = async (userData) => {
  try {
    const newUser = new User({
      username: userData.username,
      password: await bcrypt.hash(userData.password, saltRounds),
      email: userData.email
    })

    await newUser.save()

    const token = generateToken(newUser._id)

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

    const token = generateToken(user._id)

    return token
  } catch (err) {
    console.log(err)
  }
}
