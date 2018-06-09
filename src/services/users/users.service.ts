import * as createService from 'feathers-mongoose'
import { UserModel } from '../../models/users.model'
import hooks from './users.hooks'
import { Mongoose } from 'mongoose'
import { Application } from '@feathersjs/express'

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
