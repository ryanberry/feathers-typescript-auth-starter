import { HooksObject } from '@feathersjs/feathers'
import { disallow } from 'feathers-hooks-common'

export const MailerHooks: HooksObject = {
  before: {
    all: disallow('external'),
    find: [],
    get: [],
    create: [
      // async context => {
      //   console.log(context)
      //   return context
      // },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
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
