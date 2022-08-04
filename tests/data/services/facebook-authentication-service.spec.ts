import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository } from '@/data/contracts/repositories'
import { FacebookAuthenticationService } from '@/data/services/facebook-authentication-service'
import { AuthenticationError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  const token = 'any_token'

  let loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
  let loadUserAccountRepository: MockProxy<LoadUserAccountRepository>
  let sut: FacebookAuthenticationService

  beforeEach(() => {
    loadFacebookUserApi = mock()
    loadFacebookUserApi.loadUser.mockResolvedValue({
      name: 'any_facebook_name',
      email: 'any_facebook_email',
      facebookId: 'any_facebook_id'
    })

    loadUserAccountRepository = mock()

    sut = new FacebookAuthenticationService(loadFacebookUserApi, loadUserAccountRepository)
  })

  it('should call LoadFacebookUserApi with correct params', async () => {
    await sut.execute({ token })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const result = await sut.execute({ token })

    expect(result).toEqual(new AuthenticationError())
  })

  it('should return LoadUserByEmailRepo when LoadFacebookUserApi returns data', async () => {
    await sut.execute({ token })

    expect(loadUserAccountRepository.load).toHaveBeenCalledWith({ email: 'any_facebook_email' })
    expect(loadUserAccountRepository.load).toHaveBeenCalledTimes(1)
  })
})
