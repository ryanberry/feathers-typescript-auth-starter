import { Logger } from 'winston'
import { NotFound } from '@feathersjs/errors'
import { Request, Response, NextFunction } from '@feathersjs/express'

export default (verbose = false) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { url } = req
  const message = `Page not found${verbose ? ': ' + url : ''}`
  next(new NotFound(message))
}
