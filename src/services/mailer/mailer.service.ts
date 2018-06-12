import { Application } from '@feathersjs/express'
import { MailerHooks } from './mailer.hooks'
import * as Mailer from 'feathers-mailer'
import * as smtpTransport from 'nodemailer-smtp-transport'
import * as path from 'path'
import * as pug from 'pug'
import * as cheerio from 'cheerio'
import * as sass from 'node-sass'
import * as juice from 'juice'
import { Inky } from 'inky'

export default (app: Application<{}>) => {
  const mailOptions = app.get('mailer')

  app.use('/emails', Mailer(smtpTransport(mailOptions)))

  const emailService = app.service('emails')

  emailService.hooks(MailerHooks)

  return emailService
}

export const emailTemplatePath = (templateName: string): string =>
  path.join('src', 'templates', 'emails', `${templateName}.pug`)

export function renderSass(): string {
  return sass
    .renderSync({
      file: path.join('src', 'templates', 'styles', 'main.scss'),
      outputStyle: 'compressed',
    })
    .css.toString()
}

export function compileEmail(to, from, subject, templatePath, templateData) {
  renderSass()
  let html = pug.renderFile(templatePath, templateData)
  const compiledStyles = renderSass()

  let $ = cheerio.load(html)

  const inky = new Inky()

  html = inky.releaseTheKraken($)

  const inlinedHtml = juice(html, { extraCss: compiledStyles })

  $ = cheerio.load(inlinedHtml)

  $('table').attr('border', '0')
  $('table').attr('cellpadding', '0')
  $('table').attr('cellspacing', '0')
  $('a').attr('target', '_blank')

  html = $.html()

  return {
    from,
    to,
    subject,
    html,
  }
}
