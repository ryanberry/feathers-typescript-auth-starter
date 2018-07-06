import authentication from '@feathersjs/authentication'
import { HooksObject } from '@feathersjs/feathers'
import { discard } from 'feathers-hooks-common'

const hooks: HooksObject = {
  error: {
    create: [
      context => {
        context.error.className = 'invalid-login'
      },
    ],
  },
  before: {
    create: [authentication.hooks.authenticate(['local', 'jwt'])],
    remove: [authentication.hooks.authenticate('jwt')],
  },
  after: {
    create: [
      context => {
        context.result.user = context.params.user
      },
      discard('password', 'verifyExpires', 'resetExpires', 'verifyChanges'),
    ],
  },
}

export default hooks
