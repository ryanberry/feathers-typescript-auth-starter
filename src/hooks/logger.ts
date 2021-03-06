import { Logger } from 'winston'
import * as util from 'util'

export const logger = new Logger({
  level: 'debug',
})

export default () => {
  return context => {
    logger.debug(
      `${context.type} app.service('${context.path}').${context.method}()`,
    )

    if (typeof context.toJSON === 'function' && logger.level === 'debug') {
      logger.debug('Hook Context', util.inspect(context, { colors: false }))
    }

    if (context.error) {
      logger.error(context.error)
    }
  }
}
