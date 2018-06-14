import authentication from '@feathersjs/authentication'

export default {
  before: {
    create: [authentication.hooks.authenticate(['local', 'jwt'])],
    remove: [authentication.hooks.authenticate('jwt')],
  },
}
