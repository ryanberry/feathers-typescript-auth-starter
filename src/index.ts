import { InitialiseApp } from './init'
import * as logger from 'winston'
import app from './app'

new InitialiseApp()

const port = app.get('port')
const server = app.listen(port)

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason),
)

server.on('listening', () =>
  logger.info(
    'Feathers application started on http://%s:%d',
    app.get('host'),
    port,
  ),
)

export default server
