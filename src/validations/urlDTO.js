import Joi from 'joi'

export const urlDTO = Joi.object({
  originalUrl: Joi.string().uri({ scheme: ['http', 'https'] }).required(),
  expirationTime: Joi.date().greater('now')
})
