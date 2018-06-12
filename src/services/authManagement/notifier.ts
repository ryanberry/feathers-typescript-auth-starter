import { Application } from '@feathersjs/feathers'
import { compileEmail, emailTemplatePath } from '../mailer/mailer.service'
import * as logger from 'winston'

export default (app: Application) => {
  const buildLink = (type, hash) => {
    const port = app.get('port') || '80'
    const host = app.get('host') || 'localhost'
    const protocol = app.get('protocol') || 'http'
    return `${protocol}://${host}:${port}/${type}/${hash}`
  }

  return {
    notifier: (type, user) => {
      let subject
      let templateName
      const templateData: { [key: string]: string } = {}

      switch (type) {
        case 'resendVerifySignup':
          subject = 'Confirm Signup'
          templateName = 'account/verify-email'
          templateData.hashLink = buildLink('verify', user.verifyToken)

          break

        case 'verifySignup':
          subject = 'Thank you, your email has been verified'
          user = user._doc
          templateName = 'account/email-verified'

          break
        case 'sendResetPwd':
          subject = 'Reset Password'
          templateName = 'account/reset-password'
          templateData.hashLink = buildLink('reset', user.resetToken)

          break

        case 'resetPwd':
          subject = 'Your password was reset'
          templateName = 'account/password-was-reset'
          templateData.hashLink = buildLink('reset', user.resetToken)

          break

        case 'passwordChange':
          subject = 'Your password was changed'
          templateName = 'account/password-change'

          break

        case 'identityChange':
          throw new Error('Not Implemented')
          // subject = 'Your account was changed. Please verify the changes'
          // templatePath = 'identity-change'
          // templateData.hashLink = buildLink('verifyChanges', user.verifyToken)
          // templateData.changes = user.verifyChanges

          break

        default:
          break
      }

      templateData.name = user.displayName || user.email

      const compiledEmail = compileEmail(
        user.email,
        app.get('email'),
        subject,
        emailTemplatePath(templateName),
        templateData,
      )

      return app
        .service('emails')
        .create(compiledEmail)
        .then(result => logger.debug('Sent email', result))
        .catch(err => logger.error('Error sending email', err))
    },
  }
}