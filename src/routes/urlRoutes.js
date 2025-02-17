import { Router } from 'express'
import * as urlController from '../controllers/urlController.js'
import { verifyJwt, verifyTokenToCreateURL } from '../middlewares/verifyToken.js'

const urlRouter = Router()

urlRouter.post('/', verifyTokenToCreateURL, urlController.shortenUrl)
urlRouter.get('/redirect/:url', urlController.redirect)
urlRouter.get('', verifyJwt, urlController.getUserUrls)
urlRouter.get('/:idUrl', verifyJwt, urlController.getUrlById)
urlRouter.delete('/:idUrl', verifyJwt, urlController.deleteUrlById)

export { urlRouter }
