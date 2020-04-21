import { Router } from 'express'
import axios, { AxiosResponse } from 'axios'
import { errorHandler, clear, gitClone, getCommitHash, getCommitInfo, buildStart, buildFinish } from '../helpers'

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

router.post('/', (req, res) => {
  // NOTE: сохранение настроек и скачивание репозитория
  const settings = req.body
  console.log(settings, 'received settings')
  const downloadRepo = clear(settings)
    .then((resolvedSettings) => gitClone(resolvedSettings))
    .then(() => getCommitHash(settings))
    .then((commitHash) => getCommitInfo(commitHash, settings))
    .then((commitInfo) => {
      post('/build/request', commitInfo)
      console.log('settings have been saved')
    })
    .catch((e) => errorHandler(e))
  const saveSettings = post('/conf', settings).catch((e) => console.log(e, 'can not post settings'))

  Promise.all([downloadRepo, saveSettings])
    .then(() => {
      let list = []

      axios
        .get('/build/list')
        .then((response) => {
          if (response.status === 200) {
            list = response.data.data
            return new Promise((resolve) => resolve(list))
          }
          return res.send(list)
        })
        .then((buildsList) => {
          buildStart(buildsList.filter((el) => el.status === 'Waiting')[0])
            .then((buildObject) => {
              buildFinish(buildObject)
            })
            .catch((e) => errorHandler(e))
        })
    })
    .then(() => res.send({ saveSettings: 'done', build: 'done' }))
    .catch((e) => errorHandler(e))

  // res.send('build done')
})

router.delete('/', (req, res) => {
  // NOTE: удаляем настройки
  axios
    .delete('/conf')
    .then((response: AxiosResponse<number>) => {
      if (response.status === 200) {
        res.send('settings deleted')
      }
    })
    .catch((e) => errorHandler(e))
})

export default router
