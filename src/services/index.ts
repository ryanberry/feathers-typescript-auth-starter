import { Application } from '@feathersjs/feathers'
import userService from './users/users.service'
import authentication from './authentication/authentication.service'

export default (app: Application) => {
  app.configure(authentication)
  app.configure(userService)
}
