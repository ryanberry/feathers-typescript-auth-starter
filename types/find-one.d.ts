import { Service } from '@feathersjs/feathers'

interface FindOneService extends Service<any> {
  findOne(params: { query?: {} }): Promise<any>
}
