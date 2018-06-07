import { Application } from '@feathersjs/express'

import express from '@feathersjs/express'
import { Logger } from 'winston'
import * as path from 'path'
import * as favicon from 'serve-favicon'
import * as compress from 'compression'
import * as helmet from 'helmet'
import * as cors from 'cors'

import notFound from './not-found-helper'

export default (app: Application<object>) => {
  app.use(helmet())
  app.use(cors())
  app.use(compress())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(favicon(path.join(app.get('public'), 'favicon.ico')))

  app.use('/', express.static(app.get('public')))

  app.use(notFound())

  const logger = new Logger()
  app.use(express.errorHandler({ logger }))
}
