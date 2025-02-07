import { shortenUrl, redirectByShortUrl, findUrlById, findAllUrls, deleteUrlById } from '../services/urlService.js'

export const shortenUrlController = async (req, res) => {
  try {
    const urlData = req.body
    const newUrl = await shortenUrl(urlData)
    return res.status(201).json(newUrl)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
}

export const redirectController = async (req, res) => {
  try {
    const shortUrl = req.params.url

    const originalUrl = await redirectByShortUrl(shortUrl)

    if (!originalUrl) {
      return res.status(404).json({ message: 'Url not found' })
    }

    return res.redirect(originalUrl)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
}

export const getUrlByIdController = async (req, res) => {
  try {
    const idUrl = req.params.idUrl
    const url = await findUrlById(idUrl)

    if (!url) {
      return res.status(404).json({ message: `url with id: ${idUrl}, not found` })
    }

    return res.status(200).json(url)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
}

export const getAllUrlsController = async (req, res) => {
  try {
    const urls = await findAllUrls()
    if (urls.length === 0) {
      return res.status(204).json()
    }

    return res.status(200).json(urls)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
}

export const deleteUrlByIdController = async (req, res) => {
  try {
    const idUrl = req.params.idUrl

    console.log('ID URL -> ', idUrl)

    const isDelete = await deleteUrlById(idUrl)

    if (!isDelete) {
      return res.status(404).json({ message: `url with id: ${idUrl}, not found` })
    }

    return res.status(204).json()
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: err.message })
  }
}
