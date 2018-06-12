import { Application } from '@feathersjs/feathers'
import { connect } from 'mongoose'

import userService from './users/users.service'
import authentication from './authentication/authentication.service'
import authManagement from './authManagement/authManagement.service'
import mailerService from './mailer/mailer.service'

export default (app: Application) => {
  app.set('connection', connect(app.get('mongodb')))

  app.configure(authentication)
  app.configure(authManagement)
  app.configure(mailerService)
  app.configure(userService)
}
