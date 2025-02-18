import Url from '../models/urlSchema.js'
import User from '../models/userSchema.js'
import { generateShortUrl } from './generateShortUrl.js'
import CustomError from '../error/CustomError.js'
import { NOT_FOUND, FORBIDDEN } from '../constants/statusCodes.js'

export const shortenUrl = async (urlData, idUser) => {
  const shortenUrl = await generateShortUrl()
  const newUrl = new Url(
    {
      originalUrl: urlData.originalUrl,
      shortUrl: shortenUrl,
      expiresAt: urlData.expiresAt
    })

  newUrl.save()

  if (idUser) {
    const user = await User.findById(idUser)
    user.urls.push(newUrl._id)
    await user.save()
  }
  return newUrl
}

export const redirectByShortUrl = async (shortUrl) => {
  const url = await Url.findOne({
    shortUrl
  })

  if (!url) {
    throw new CustomError(NOT_FOUND, 'Short URL, doesn\'t exists')
  }

  url.clicks += 1
  url.save()

  return url.originalUrl
}

export const findAllUserUrls = async (idUser) => {
  const user = await User.findById(idUser).select('urls').populate('urls')

  return (user) ? user.urls : []
}

export const findUrlById = async (idUser, idUrl) => {
  const user = await User.findOne({
    _id: idUser,
    urls: idUrl
  })

  const url = await Url.findById(idUrl)

  if (!user && url) {
    throw new CustomError(FORBIDDEN, 'You don\'t have access to this URL')
  }

  if (!url) {
    throw new CustomError(NOT_FOUND, `URL with id: ${idUrl}, Not found`)
  }

  return url
}

export const deleteUrlById = async (idUser, idUrl) => {
  const url = await Url.findById(idUrl)

  if (!url) {
    throw new CustomError(NOT_FOUND, `URL with id: ${idUrl}, Not found`)
  }

  const result = await User.updateOne(
    { _id: idUser },
    { $pull: { urls: { _id: idUrl } } }
  )

  if (!result.acknowledged) {
    throw new CustomError(FORBIDDEN, 'Access denied')
  }

  await Url.deleteOne({ _id: idUrl })
    .catch(err => console.error('Error deleting URL:', err))

  return true
}
