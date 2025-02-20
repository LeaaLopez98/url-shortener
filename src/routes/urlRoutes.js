import { Router } from 'express'
import * as urlController from '../controllers/urlController.js'
import { verifyJwt, verifyTokenToCreateURL } from '../middlewares/verifyToken.js'
import validateData from '../middlewares/validateData.js'
import { urlDTO } from '../validations/urlDTO.js'

const urlRouter = Router()

const ENDPOINT = '/api/urls'

// ENDPOINTS TO HANDLE URLs

urlRouter.post(ENDPOINT, validateData(urlDTO), verifyTokenToCreateURL, urlController.shortenUrl)
urlRouter.get(ENDPOINT, verifyJwt, urlController.getUserUrls)
urlRouter.get(`${ENDPOINT}/:idUrl`, verifyJwt, urlController.getUrlById)
urlRouter.delete(`${ENDPOINT}/:idUrl`, verifyJwt, urlController.deleteUrlById)

// ENDPOINT TO REDIRECT
urlRouter.get('/:url', urlController.redirect)

export { urlRouter }
