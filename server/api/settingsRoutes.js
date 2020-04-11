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
    .catch((e) => helpers.errorHandler(e))
})
router.post('/', validate({ body: schemas.settings }), (req, res) => {
  // NOTE: сохранение настроек и скачивание репозитория
  const settings = req.body
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
    .catch((e) => helpers.errorHandler(e))
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
            .catch((e) => helpers.errorHandler(e))
        })
    })
    .then(() => res.send({ saveSettings: 'done', build: 'done' }))
    .catch((e) => helpers.errorHandler(e))

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
    .catch((e) => helpers.errorHandler(e))
})

module.exports = router
