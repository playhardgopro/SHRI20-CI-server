import express from 'express'
import axios from 'axios'
import NodeCache from 'node-cache'
import * as helpers from '../helpers'

const myCache = new NodeCache()

const router = express.Router()

// NOTE: получаем список сборок
router.get<{}, {}, {}, { limit: number; offset: number }>('/', (req, res) => {
  const { limit, offset } = req.query
  // console.log(limit)
  axios
    .get('/build/list', { params: { limit, offset } })
    .then((response) => {
      let list: BuildTask[] = []
      if (response.status === 200) {
        list = response.data.data
      }
      res.send(list)
    })
    .catch((e) => helpers.errorHandler(e))
})

// NOTE: получаем коммитхэш, идем в локальное хранилище,
// NOTE: получаем информацию и формируем JSON для /build/request
router.post<{ commitHash: string }>('/:commitHash', (req, res) => {
  const { commitHash } = req.params
  axios
    .get('/conf')
    .then((response) => {
      if (response.status === 200) {
        const settings: BuildSettings = response.data.data
        return helpers.getCommitInfo(commitHash, settings)
      }
      throw Error('Can not get /conf')
    })
    .then((commitInfo) => axios.post('/build/request', commitInfo))
    .then((response) => {
      console.log(response.data.data, 'response on commitHash')
      res.status(200).send(response.data.data)
    })
    .catch((e) => helpers.errorHandler(e))

  // res.send(commitHash)
})
// NOTE: получаем информацию о конкретной сборке
router.get<{ buildId: string }>('/:buildId', (req, res) => {
  const { buildId } = req.params

  axios
    .get(`/build/details?buildId=${buildId}`)
    .then((response) => {
      if (response.status === 200) {
        const buildDetails: BuildTask = response.data.data
        res.send(buildDetails)
      }
    })
    .catch((e) => helpers.errorHandler(e))
})
// NOTE: получение логов билда (сплошной текст)
router.get<{ buildId: string }>('/:buildId/logs', (req, res) => {
  const { buildId } = req.params
  console.warn(buildId)

  const cachedLog: string | undefined = myCache.get(buildId)

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
          const buildLog: string = response.data
          myCache.set(buildId, buildLog)
          res.send(buildLog)
        }
      })
      .catch((e) => helpers.errorHandler(e))
  } else res.send(cachedLog)
  // NOTE: Раскомменть, чтобы посмотреть статистику кеша
  // console.log(myCache.getStats(), 'cached data')
})

export default router
