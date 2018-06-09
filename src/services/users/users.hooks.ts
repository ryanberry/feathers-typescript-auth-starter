import { HooksObject, HookContext } from '@feathersjs/feathers'
import { hooks as authHooks } from '@feathersjs/authentication'
import { hooks as localHooks } from '@feathersjs/authentication-local'
import * as utilityHooks from 'feathers-authentication-hooks'
import gravatar from '../../hooks/gravatar'

const { authenticate } = authHooks
const { hashPassword, protect } = localHooks

const UsersHooks: HooksObject = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [hashPassword(), gravatar()],
    update: [hashPassword(), authenticate('jwt')],
    patch: [
      hashPassword(),
      authenticate('jwt'),
      utilityHooks.restrictToOwner({ ownerField: '_id' }),
    ],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [protect('password')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
}

export default UsersHooks
