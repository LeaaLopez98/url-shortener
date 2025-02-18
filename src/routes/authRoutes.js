import { Router } from 'express'
import { userLoginDTO, userRegisterDTO } from '../validations/userDTO.js'
import validateData from '../middlewares/validateData.js'
import * as authController from '../controllers/authController.js'

const authRouter = Router()

authRouter.post('/login', validateData(userLoginDTO), authController.loginUser)
authRouter.post('/signup', validateData(userRegisterDTO), authController.registerUser)

export { authRouter }
