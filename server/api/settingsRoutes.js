const express = require('express')
const { Validator, ValidationError } = require('express-json-validator-middleware')
const axios = require('axios')
const schemas = require('../schemas')
const helpers = require('../helpers')

const app = express()

const { validate } = new Validator({ allErrors: true })
const router = express.Router()

router.get('/', (req, res) => {
  // NOTE: получение настроек
  axios
    .get('/conf')
    .then((response) => {
      let settings = {}
      if (response.status === 200) {
        settings = response.data.data
      }
      res.send(settings)
    })
    .catch((e) => e.code, 'get settings error')
})
router.post('/', validate({ body: schemas.settings }), (req, res) => {
  // NOTE: сохранение настроек и скачивание репозитория
  const settings = req.body
  // period must be a Number
  settings.period = +settings.period
  console.log(settings, 'received settings')
  const downloadRepo = helpers
    .clear(settings)
    .then((resolvedSettings) => helpers.gitClone(resolvedSettings))
    .then(() => helpers.getCommitHash(settings))
    .then((commitHash) => helpers.getCommitInfo(commitHash, settings))
    .then((commitInfo) => {
      axios.post('/build/request', commitInfo)
      console.log('settings have been saved')
    })
    .catch((e) => console.error(e, 'can not start build'))
  const saveSettings = axios.post('/conf', settings).catch((e) => console.log(e, 'can not post settings'))

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
          helpers
            .buildStart(buildsList.filter((el) => el.status === 'Waiting')[0])
            .then((buildObject) => {
              helpers.buildFinish(buildObject)
            })
            .catch((e) => console.error(e))
        })
    })
    .then(() => res.send('settings have been saved'))
    .catch((e) => console.error(e.code, 'post settings error'))

  // res.send('build done')
})
router.delete('/', (req, res) => {
  // NOTE: удаляем настройки
  axios
    .delete('/conf')
    .then((response) => {
      if (response.status === 200) {
        res.send('settings deleted')
      }
    })
    .catch((e) => e.code, 'delete settings error')
})

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(400).send('JSON is invalid')
    next()
  } else next(err)
})

module.exports = router
