import { Router } from 'express'
import * as urlController from '../controllers/urlController.js'

const urlRouter = Router()

urlRouter.post('/', urlController.shortenUrl)
urlRouter.get('/redirect/:url', urlController.redirect)
urlRouter.get('', urlController.getAllUrls)
urlRouter.get('/:idUrl', urlController.getUrlById)
urlRouter.delete('/:idUrl', urlController.deleteUrlById)

export { urlRouter }
