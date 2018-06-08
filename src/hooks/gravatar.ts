import * as crypto from 'crypto'

const gravatarUrl = 'https://s.gravatar.com/avatar'
const query = 's=60'

export default (options = {}) => {
  return async context => {
    const { email } = context.data

    const hash = crypto
      .createHash('md5')
      .update(email)
      .digest('hex')

    context.data.avatar = `${gravatarUrl}/${hash}?${query}`

    return context
  }
}
