import { HookContext, Hook } from '@feathersjs/feathers'
import accountService from '../services/authentication-management/notifier'

export default (options?): Hook => {
  return (hook: HookContext) => {
    if (!hook.params.provider) {
      return hook
    }

    const user = hook.result

    if (hook.data && hook.data.email && user) {
      accountService(hook.app).notifier('resendVerifySignup', user)
      return hook
    }

    return hook as any
  }
}
