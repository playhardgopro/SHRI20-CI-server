const express = require('express')
const axios = require('axios')
const NodeCache = require('node-cache')

const myCache = new NodeCache()
const helpers = require('../helpers')

const router = express.Router()

// NOTE: получаем список сборок
router.get('/', (req, res) => {
  axios
    .get('/build/list')
    .then((response) => {
      let list = []
      if (response.status === 200) {
        list = response.data.data
      }
      res.send(list)
    })
    .catch((e) => console.error(e.code ? e.code : e))
})

// NOTE: получаем коммитхэш, идем в локальное хранилище,
// NOTE: получаем информацию и формируем JSON для /build/request
router.post('/:commitHash', (req, res) => {
  const { commitHash } = req.params
  let settings = {}
  axios
    .get('/conf')
    .then((response) => {
      if (response.status === 200) {
        settings = response.data.data
        return new Promise((resolve) => resolve(settings))
      }
      return res.send(response.status)
    })
    .then((resolve) => helpers.getCommitInfo(commitHash, resolve))
    .then((commitInfo) => axios.post('/build/request', commitInfo))
    .catch((e) => {
      console.error(e, 'post commit hash')
    })

  res.send(commitHash)
})
// NOTE: получаем информацию о конкретной сборке
router.get('/:buildId', (req, res) => {
  const { buildId } = req.params

  axios
    .get(`/build/details?buildId=${buildId}`)
    .then((response) => {
      if (response.status === 200) {
        const buildDetails = response.data.data
        res.send(buildDetails)
      }
    })
    .catch((e) => console.error(e))
})
// NOTE: получение логов билда (сплошной текст)
router.get('/:buildId/logs', (req, res) => {
  const { buildId } = req.params
  console.warn(buildId)

  const cachedLog = myCache.get(buildId)

  if (cachedLog === undefined) {
    axios
      .get('/build/log', {
        params: {
          buildId,
        },
        responseType: 'text',
        headers: {
          'Content-Type': 'text/plain',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const buildLog = response.data
          myCache.set(buildId, buildLog)
          res.send(buildLog)
        }
      })
      .catch((e) => console.error(e.code))
  } else res.send(myCache.get(buildId))
  // NOTE: Раскомменть, чтобы посмотреть статистику кеша
  // console.log(myCache.getStats(), 'cached data')
})

module.exports = router
