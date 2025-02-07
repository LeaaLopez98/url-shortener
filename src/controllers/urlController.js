import * as urlService from '../services/urlService.js'

export const shortenUrl = async (req, res) => {
  try {
    const urlData = req.body
    const newUrl = await urlService.shortenUrl(urlData)
    return res.status(201).json(newUrl)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
}

export const redirect = async (req, res) => {
  try {
    const shortUrl = req.params.url

    const originalUrl = await urlService.redirectByShortUrl(shortUrl)

    if (!originalUrl) {
      return res.status(404).json({ message: 'Url not found' })
    }

    return res.redirect(originalUrl)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
}

export const getUrlById = async (req, res) => {
  try {
    const idUrl = req.params.idUrl
    const url = await urlService.findUrlById(idUrl)

    if (!url) {
      return res.status(404).json({ message: `url with id: ${idUrl}, not found` })
    }

    return res.status(200).json(url)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
}

export const getAllUrls = async (req, res) => {
  try {
    const urls = await urlService.findAllUrls()
    if (urls.length === 0) {
      return res.status(204).json()
    }

    return res.status(200).json(urls)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
}

export const deleteUrlById = async (req, res) => {
  try {
    const idUrl = req.params.idUrl

    console.log('ID URL -> ', idUrl)

    const isDelete = await urlService.deleteUrlById(idUrl)

    if (!isDelete) {
      return res.status(404).json({ message: `url with id: ${idUrl}, not found` })
    }

    return res.status(204).json()
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err.message })
  }
}
