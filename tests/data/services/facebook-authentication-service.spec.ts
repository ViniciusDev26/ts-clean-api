import { FacebookAuthenticationService } from '@/data/services/facebook-authentication-service'
import { AuthenticationError } from '@/domain/errors'

describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const LoadFacebookUserApi = {
      loadUser: jest.fn()
    }
    const sut = new FacebookAuthenticationService(LoadFacebookUserApi)

    await sut.execute({ token: 'any_token' })

    expect(LoadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(LoadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookUserApi = {
      loadUser: jest.fn()
    }
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    const result = await sut.execute({ token: 'any_token' })

    expect(result).toEqual(new AuthenticationError())
  })
})
