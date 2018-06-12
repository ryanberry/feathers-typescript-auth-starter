import { Application } from '@feathersjs/express'
import configuration from '@feathersjs/configuration'
import * as findOne from 'feathers-findone'

export default function() {
  return (app: Application<object>) => {
    app.configure(configuration())
    app.configure(findOne())
    app.set('view engine', 'pug')
    app.set('views', 'src/templates')
  }
}
