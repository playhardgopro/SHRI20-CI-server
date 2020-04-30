import express, { json } from 'express'
import axios from 'axios'
import { Agent } from 'https'
import cors from 'cors'
import buildsRoutes from './api/buildsRoutes'
import settingsRoutes from './api/settingsRoutes'

require('dotenv').config()

const { AUTH_TOKEN } = process.env

axios.defaults.baseURL = 'https://hw.shri.yandex/api'
axios.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`
axios.defaults.httpsAgent = new Agent({
  rejectUnauthorized: false,
})

const app = express()

app.use(json())
app.use(cors())
app.use('/api/builds', buildsRoutes)
app.use('/api/settings', settingsRoutes)

app.listen(3030)
