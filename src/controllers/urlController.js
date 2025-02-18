import * as urlService from '../services/urlService.js'

export const shortenUrl = async (req, res, next) => {
  try {
    const urlData = req.body
    const idUser = req.idUser
    const newUrl = await urlService.shortenUrl(urlData, idUser)
    return res.status(201).json(newUrl)
  } catch (err) {
    return next(err)
  }
}

export const redirect = async (req, res, next) => {
  try {
    const shortUrl = req.params.url

    const originalUrl = await urlService.redirectByShortUrl(shortUrl)

    return res.redirect(originalUrl)
  } catch (err) {
    return next(err)
  }
}

export const getUrlById = async (req, res, next) => {
  try {
    const idUrl = req.params.idUrl
    const idUser = req.idUser
    const url = await urlService.findUrlById(idUser, idUrl)

    return res.status(200).json(url)
  } catch (err) {
    return next(err)
  }
}

export const getUserUrls = async (req, res, next) => {
  try {
    const idUser = req.idUser

    const urls = await urlService.findAllUserUrls(idUser)
    if (urls.length === 0) {
      return res.status(204).json()
    }

    return res.status(200).json(urls)
  } catch (err) {
    return next(err)
  }
}

export const deleteUrlById = async (req, res, next) => {
  try {
    const idUrl = req.params.idUrl
    const idUser = req.idUser

    await urlService.deleteUrlById(idUser, idUrl)

    return res.status(204).json()
  } catch (err) {
    return next(err)
  }
}
