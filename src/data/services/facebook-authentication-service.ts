import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import { CreateUserByFacebookAccountRepository, LoadUserAccountRepository } from '../contracts/repositories'

export class FacebookAuthenticationService {
  constructor (
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepository: LoadUserAccountRepository & CreateUserByFacebookAccountRepository
  ) {}

  async execute ({ token }: FacebookAuthentication.Params): Promise<AuthenticationError | null> {
    const result = await this.facebookApi.loadUser({ token })
    if (result == null) return new AuthenticationError()

    const { email, name, facebookId } = result
    await this.userAccountRepository.load({ email })
    await this.userAccountRepository.createFromFacebook({ email, name, facebookId })

    return null
  }
}
