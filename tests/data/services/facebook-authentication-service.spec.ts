import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor (
    private readonly LoadFacebookUserApi: LoadFacebookUserApi
  ) {}

  async execute ({ token }: FacebookAuthentication.Params): Promise<void> {
    await this.LoadFacebookUserApi.loadUser({ token })
  }
}

namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }
}
interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<void>
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  async loadUser ({ token }: LoadFacebookUserApi.Params): Promise<void> {
    this.token = token
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const LoadFacebookUserApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(LoadFacebookUserApi)

    await sut.execute({ token: 'any_token' })

    expect(LoadFacebookUserApi.token).toBe('any_token')
  })
})
