import authentication from '@feathersjs/authentication'

export default {
  before: {
    create: [authentication.hooks.authenticate('local')],
    remove: [authentication.hooks.authenticate('jwt')],
  },
}
