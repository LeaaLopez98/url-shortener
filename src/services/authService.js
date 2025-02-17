import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/userSchema.js'
import CustomError from '../error/CustomError.js'
import { UNAUTHORIZED, NOT_FOUND } from '../constants/statusCodes.js'

const saltRounds = 10

const generateToken = (idUser) => {
  return jwt.sign({
    idUser,
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
  }, process.env.JWT_SECRET)
}

export const registerUser = async (userData) => {
  const newUser = new User({
    username: userData.username,
    password: await bcrypt.hash(userData.password, saltRounds),
    email: userData.email
  })

  await newUser.save()

  const token = generateToken(newUser._id)

  return token
}

export const loginUser = async (username, password) => {
  const user = await User.findOne({
    username
  })

  if (!user) {
    throw new CustomError(NOT_FOUND, `username: ${username}, not found`)
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password)

  if (!isPasswordMatch) {
    throw new CustomError(UNAUTHORIZED, 'Incorrect username or password')
  }

  const token = generateToken(user._id)

  return token
}
