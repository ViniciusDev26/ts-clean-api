import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { LoadUserAccountRepository } from '../contracts/repositories'

export class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserApi: LoadFacebookUserApi,
    private readonly loadUserAccountRepository: LoadUserAccountRepository
  ) {}

  async execute ({ token }: FacebookAuthentication.Params): Promise<AuthenticationError | null> {
    const result = await this.loadFacebookUserApi.loadUser({ token })
    if (result == null) return new AuthenticationError()

    const { email } = result
    await this.loadUserAccountRepository.load({ email })

    return null
  }
}
