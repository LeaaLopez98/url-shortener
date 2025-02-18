import Joi from 'joi'

export const userDTO = {
  username: Joi.string().min(5).max(25).required(),
  password: Joi.string().min(6).max(25).required()
}

export const userLoginDTO = Joi.object(userDTO)

export const userRegisterDTO = Joi.object({
  ...userDTO,
  email: Joi.string().email().required()
})
