import * as createService from 'feathers-mongoose'
import { UserModel } from '../../models/users.model'
import hooks from './users.hooks'
import { Mongoose } from 'mongoose'

export default app => {
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
