import * as authManagement from 'feathers-authentication-management'
import hooks from './authManagement.hooks'
import notifier from './notifier'
import { Application } from '@feathersjs/express'
import { NotFound } from '@feathersjs/errors'

export default (app: Application<{}>) => {
  app.configure(authManagement(notifier(app)))

  const authManagementService = app.service('authManagement')
  authManagementService.hooks = hooks as any

  app.get('/verify/:token', async (req, res, next) => {
    const { params } = req
    const { token } = params

    await app
      .service('authManagement')
      .create({
        action: 'verifySignupLong',
        value: token,
      })
      .then(response =>
        res.render('pages/account/simple-notification', {
          subject: 'Your email has been verified.',
          title: 'Success!',
          content: 'Your email has been verified.',
        }),
      )
      .catch(err => {
        res.status(404)
        res.render('pages/account/simple-notification', {
          subject: 'Whoops!',
          title: 'Whoops!',
          content: `We couldn't verify your email, please try again`,
        })
      })
  })

  return authManagement
}
