import * as createService from 'feathers-nedb'
import createModel from '../../models/users.model'
import hooks from './users.hooks'

export default app => {
  const Model = createModel(app)
  const paginate = app.get('paginate')

  const options = {
    name: 'users',
    Model,
    paginate,
  }

  app.use('/users', createService(options))

  const service = app.service('users')

  service.hooks(hooks)
}
