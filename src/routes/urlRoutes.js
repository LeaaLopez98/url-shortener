import { Router } from 'express'
import { shortenUrlController, getAllUrlsController, redirectController, deleteUrlByIdController, getUrlByIdController } from '../controllers/urlController.js'

const urlRouter = Router()

urlRouter.post('/', shortenUrlController)
urlRouter.get('/redirect/:url', redirectController)
urlRouter.get('', getAllUrlsController)
urlRouter.get('/:idUrl', getUrlByIdController)
urlRouter.delete('/:idUrl', deleteUrlByIdController)

export { urlRouter }
