import { Application } from '@feathersjs/feathers'
import * as createService from 'feathers-mongoose'
import { UserModel } from '../../models/users.model'
import hooks from './users.hooks'

export default (app: Application<{}>) => {
  const paginationSettings = app.get('paginate')

  const serviceOptions = {
    Model: UserModel,
    lean: false,
    paginate: paginationSettings,
  }

  app.use('/users', createService(serviceOptions))

  const service = app.service('users')

  service.hooks(hooks)
}
