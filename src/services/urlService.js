import Url from '../models/urlScheme.js'

let counter = 0

export const shortenUrl = async (urlData) => {
  try {
    counter += 1

    const newUrl = new Url(
      {
        originalUrl: urlData.originalUrl,
        shortUrl: counter,
        expiresAt: urlData.expiresAt
      })

    return await newUrl.save()
  } catch (err) {
    console.log(err)
  }
}

export const redirectByShortUrl = async (shortUrl) => {
  try {
    const url = await Url.findOne({
      shortUrl
    }, 'originalUrl -_id')

    return url ? url.originalUrl : null
  } catch (err) {
    console.log(err)
  }
}

export const findAllUrls = async () => {
  try {
    return await Url.find()
  } catch (err) {
    console.log(err)
  }
}

export const findUrlById = async (idUrl) => {
  try {
    return await Url.findById(idUrl, '-_id -__v')
  } catch (err) {
    console.log(err)
  }
}

export const deleteUrlById = async (idUrl) => {
  try {
    const result = await Url.deleteOne({ _id: idUrl })
    console.log(result)
    return true
  } catch (err) {
    console.log(err)
  }
}
