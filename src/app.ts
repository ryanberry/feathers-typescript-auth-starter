import feathers from '@feathersjs/feathers'
import configuration from '@feathersjs/configuration'
import express from '@feathersjs/express'
import socketio from '@feathersjs/socketio'
import { Logger } from 'winston'

import middleware from './middleware'
import services from './services'
import appHooks from './app.hooks'

import channels from './channels'

const app = express(feathers())

app.configure(configuration())

app.configure(express.rest())
app.configure(socketio())

app.configure(middleware)
app.configure(services)
app.configure(channels)

app.use(express.notFound())

const logger = new Logger({
  level: 'silly',
})

app.use(express.errorHandler({ logger }))

app.hooks(appHooks)

export default app
