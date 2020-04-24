import { Router } from 'express'
import axios from 'axios'
import { errorHandler, downloadRepo, saveSettings } from '../helpers'

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

router.post<{}, BuildTask[] | ResponseSuccess, BuildSettings>('/', (req, res) => {
  // NOTE: сохранение настроек и скачивание репозитория
  const settings = req.body
  console.log(settings, 'received settings')

  downloadRepo(settings)
    .then((resolve) => {
      if (resolve === 'success') {
        saveSettings(settings).then(() => res.status(200).send('success'))
      }
    })
    .catch((e) => {
      res.status(400)
      errorHandler(e)
    })
})

router.delete<{}, ResponseSuccess>('/', (req, res) => {
  // NOTE: удаляем настройки
  axios
    .delete('/conf')
    .then((response) => {
      if (response.status === 200) {
        res.send('success')
      }
    })
    .catch((e) => errorHandler(e))
})

export default router
