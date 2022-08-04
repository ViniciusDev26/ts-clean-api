export namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  }

  export type Result = undefined
}
export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => Promise<LoadUserAccountRepository.Result>
}

export namespace CreateUserByFacebookAccountRepository {
  export type Params = {
    email: string
    name: string
    facebookId: string
  }
}
export interface CreateUserByFacebookAccountRepository {
  createFromFacebook: (params: CreateUserByFacebookAccountRepository.Params) => Promise<void>
}
