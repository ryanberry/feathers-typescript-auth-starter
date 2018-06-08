import { Application } from '@feathersjs/express'
import authentication from '@feathersjs/authentication'
import jwt from '@feathersjs/authentication-jwt'
import local, { LocalVerifier } from '@feathersjs/authentication-local'

import hooks from './authentication.hooks'

export default (app: Application<{}>) => {
  const config = app.get('authentication')

  app.configure(authentication(config))
  app.configure(jwt())
  app.configure(local())

  app.service('authentication').hooks(hooks)
}
