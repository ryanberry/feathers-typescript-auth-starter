import feathers from '@feathersjs/feathers'
import express from '@feathersjs/express'
import socketio from '@feathersjs/socketio'
import * as logger from 'winston'
import configure from './configure'

import middleware from './middleware'
import services from './services'
import appHooks from './app.hooks'

import channels from './channels'

const app = express(feathers())

app.configure(configure())

app.configure(express.rest())
app.configure(socketio())

app.configure(middleware)
app.configure(services)
app.configure(channels)

app.use(express.notFound())
app.use(express.errorHandler({ logger }))

app.hooks(appHooks)

export default app
