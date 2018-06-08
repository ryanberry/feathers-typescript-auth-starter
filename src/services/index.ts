import { Application } from '@feathersjs/feathers'
import userService from './users/users.service'

export default (app: Application) => {
  app.configure(userService)
}
