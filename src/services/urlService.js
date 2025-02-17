import Url from '../models/urlSchema.js'
import User from '../models/userSchema.js'
import { generateShortUrl } from './generateShortUrl.js'

export const shortenUrl = async (urlData, idUser) => {
  try {
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
  } catch (err) {
    console.log(err)
  }
}

export const redirectByShortUrl = async (shortUrl) => {
  try {
    const url = await Url.findOne({
      shortUrl
    })

    if (!url) {
      return null
    }

    url.clicks += 1
    url.save()

    return url.originalUrl
  } catch (err) {
    console.log(err)
  }
}

export const findAllUserUrls = async (idUser) => {
  try {
    const user = await User.findById(idUser).select('urls').populate('urls')

    return (user) ? user.urls : []
  } catch (err) {
    console.log(err)
  }
}

export const findUrlById = async (idUser, idUrl) => {
  try {
    const user = await User.findOne({
      _id: idUser,
      urls: idUrl
    })

    const url = await Url.findById(idUrl)

    if (!user && url) {
      throw new Error('You don\'t have access to this URL')
    }

    if (!url) {
      throw new Error(`URL with id: ${idUrl}, Not found`)
    }

    return url
  } catch (err) {
    console.log(err)
  }
}

export const deleteUrlById = async (idUser, idUrl) => {
  try {
    await User.updateOne(
      { _id: idUser },
      { $pull: { urls: { _id: idUrl } } }
    )

    await Url.deleteOne({ _id: idUrl })

    return true
  } catch (err) {
    console.log(err)
  }
}
