import { AccessToken } from '@/domain/models'
import { AuthenticationError } from '../errors'

export namespace FacebookAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError
}

export interface FacebookAuthentication {
  execute: (params: FacebookAuthentication.Params) => Promise<FacebookAuthentication.Result>
}
