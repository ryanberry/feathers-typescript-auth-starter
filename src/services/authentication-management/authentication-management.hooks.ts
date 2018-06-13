import { HooksObject } from '@feathersjs/feathers'
import { iff } from 'feathers-hooks-common'
import { hooks as authHooks } from '@feathersjs/authentication'
const { authenticate } = authHooks

const isAction = (...args) => hook => args.includes(hook.data.action)

const AuthManagementHooks: HooksObject = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      iff(isAction('passwordChange', 'identityChange'), [authenticate('jwt')]),
    ],
    update: [],
    patch: [],
    remove: [],
  },
  after: {},
  error: {},
}

export default AuthManagementHooks
