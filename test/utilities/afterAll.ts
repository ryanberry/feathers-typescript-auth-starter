import server from '../../src/index'
import * as mongoose from 'mongoose'
import MailDevService from './maildev'

export default () => {
  const currentMongoose: any = mongoose
  currentMongoose.models = {}
  currentMongoose.modelSchemas = {}
  server.close()
  MailDevService.stopListening()
}
