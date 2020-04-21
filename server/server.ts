import express, { json, Request, Response, NextFunction } from 'express'
import axios from 'axios'
import { Agent } from 'https'
import cors from 'cors'
import buildsRoutes from './api/buildsRoutes'
import settingsRoutes from './api/settingsRoutes'

const x: ErrorRequestHandler = () => {}

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

// app.use(static(path.resolve(__dirname, './static')))

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // if (err instanceof ValidationError) {
  //   res.status(400).send('JSON is invalid')
  //   next()
  // } else next(err)
  next(err)
})

app.listen(3030)

export default app
