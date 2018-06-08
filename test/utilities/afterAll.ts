import server from '../../src/index'
import * as mongoose from 'mongoose'
import { disconnect } from 'mongoose'

export default () => {
  const currentMongoose: any = mongoose
  currentMongoose.models = {}
  currentMongoose.modelSchemas = {}
  server.close()
}
