import { HooksObject } from '@feathersjs/feathers'
import { hooks as authHooks } from '@feathersjs/authentication'
import { hooks as localAuthHooks } from '@feathersjs/authentication-local'
import * as utilityHooks from 'feathers-authentication-hooks'
import gravatar from '../../hooks/gravatar'
import sendVerificationEmail from '../../hooks/send-verification-email'
import * as authManagement from 'feathers-authentication-management'
import {
  discard,
  when,
  iff,
  isProvider,
  preventChanges,
  disallow,
} from 'feathers-hooks-common'

const { restrictToOwner } = utilityHooks
const { addVerification, removeVerification } = authManagement.hooks
const { authenticate } = authHooks
const { hashPassword } = localAuthHooks

const UsersHooks: HooksObject = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [addVerification(), hashPassword(), gravatar()],
    update: [disallow('external')],
    patch: [
      authenticate('jwt'),
      iff(
        isProvider('external'),
        restrictToOwner({ ownerField: '_id' }),
        preventChanges(
          false,
          'email',
          'isVerified',
          'verifyToken',
          'verifyShortToken',
          'verifyExpires',
          'verifyChanges',
          'resetToken',
          'resetShortToken',
          'resetExpires',
        ),
      ),
      hashPassword(),
    ],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [
      when(
        hook => hook.params.provider,
        discard('password', 'verifyExpires', 'resetExpires', 'verifyChanges'),
      ),
    ],
    find: [],
    get: [],
    create: [sendVerificationEmail(), removeVerification()],
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
