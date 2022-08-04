import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services/facebook-authentication-service'
import { AuthenticationError } from '@/domain/errors'

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  result = undefined
  callsCount = 0
  async loadUser ({ token }: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.callsCount++
    this.token = token
    return this.result
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const LoadFacebookUserApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(LoadFacebookUserApi)

    await sut.execute({ token: 'any_token' })

    expect(LoadFacebookUserApi.token).toBe('any_token')
    expect(LoadFacebookUserApi.callsCount).toBe(1)
  })

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    loadFacebookUserApi.result = undefined
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    const result = await sut.execute({ token: 'any_token' })

    expect(result).toEqual(new AuthenticationError())
  })
})
