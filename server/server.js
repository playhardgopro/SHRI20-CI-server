require('dotenv').config()
const path = require('path')
const express = require('express')
const axios = require('axios')
const https = require('https')
const cors = require('cors')

const { AUTH_TOKEN } = process.env

const buildsRoutes = require('./api/buildsRoutes')
const settingsRoutes = require('./api/settingsRoutes')
const helpers = require('./helpers')

axios.defaults.baseURL = 'https://hw.shri.yandex/api'
axios.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`
axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false,
})

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/builds', buildsRoutes)
app.use('/api/settings', settingsRoutes)

app.use(express.static(path.resolve(__dirname, '../static')))

// NOTE: получаем список и запускаем билд для первого ожидающего
app.get('/api/startBuild', (req, res) => {
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

      res.send(list)
    })
    .catch((e) => console.error(e, 'get start build'))
})

app.listen(3001)
