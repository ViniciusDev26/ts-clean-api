import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services/facebook-authentication-service'
import { AuthenticationError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

type SutTypes = {
  sut: FacebookAuthenticationService
  loadFacebookUserApi: MockProxy<LoadFacebookUserApi>
}
function createSut (): SutTypes {
  const loadFacebookUserApi = mock<LoadFacebookUserApi>()

  return {
    loadFacebookUserApi,
    sut: new FacebookAuthenticationService(loadFacebookUserApi)
  }
}
describe('FacebookAuthenticationService', () => {
  it('should call LoadFacebookUserApi with correct params', async () => {
    const { sut, loadFacebookUserApi } = createSut()

    await sut.execute({ token: 'any_token' })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  it('should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const { sut, loadFacebookUserApi } = createSut()
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)

    const result = await sut.execute({ token: 'any_token' })

    expect(result).toEqual(new AuthenticationError())
  })
})
