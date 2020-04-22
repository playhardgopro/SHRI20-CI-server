import { Router } from 'express'
import axios from 'axios'
import {
  errorHandler,
  clear,
  gitClone,
  getCommitHash,
  getCommitInfo,
  buildStart,
  buildFinish,
  buildCancel,
} from '../helpers'

const router = Router()

router.get<{}, BuildSettings>('/', (req, res) => {
  // NOTE: получение настроек
  axios
    .get('/conf')
    .then((response) => {
      if (response.status === 200) {
        const settings: BuildSettings = response.data.data
        res.send(settings)
      }
    })
    .catch((e) => errorHandler(e))
})

router.post<{}, BuildTask[], BuildSettings>('/', (req, res) => {
  // NOTE: сохранение настроек и скачивание репозитория
  const settings = req.body
  console.log(settings)
  console.log(settings, 'received settings')

  const downloadRepo = clear(settings)
    .then((buildSettings) => gitClone(buildSettings))
    .then((buildSettings) => getCommitHash(buildSettings))
    .then((commitHash) => getCommitInfo(commitHash, settings))
    .then((commitInfo) => {
      axios.post('/build/request', commitInfo)
      console.log('settings have been saved')
    })
    .catch((e) => errorHandler(e))
  const saveSettings = axios.post('/conf', settings).catch((e) => console.log(e, 'can not post settings'))

  Promise.all([downloadRepo, saveSettings])
    .then(() => {
      axios.get('/build/list').then((response) => {
        if (response.status === 200) {
          const buildsList: BuildTask[] = response.data.data
          buildStart(buildsList.filter((el) => el.status === 'Waiting')[0])
            .then((buildObject) => {
              buildFinish(buildObject).catch(() => buildCancel(buildObject))
            })
            .catch((e) => errorHandler(e))
        }
      })
    })
    .then(() => res.status(200).send())
    .catch((e) => {
      res.status(4000)
      errorHandler(e)
    })

  // res.send('build done')
})

router.delete<{}, string>('/', (req, res) => {
  // NOTE: удаляем настройки
  axios
    .delete('/conf')
    .then((response) => {
      if (response.status === 200) {
        res.send('settings deleted')
      }
    })
    .catch((e) => errorHandler(e))
})

export default router
