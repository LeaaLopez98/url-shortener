import Joi from 'joi'

export const urlDTO = Joi.object({
  originalUrl: Joi.string().required(),
  expirationTime: Joi.date().greater('now')
})
