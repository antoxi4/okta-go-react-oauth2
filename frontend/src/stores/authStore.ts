import { TUser } from 'interfaces'
import { constants } from 'helpers'
import { observable, computed, action, runInAction } from 'mobx'
import { AuthService } from 'services'

export class AuthorizationStore {
  public user: TUser = undefined
  @observable public authStatus: string = constants.AuthorizationStates.WaitingAuthorization

  @computed
  public get isAuthorized(): boolean {
    return this.authStatus === constants.AuthorizationStates.Authorized
  }

  @computed
  public get isUnAuthorized(): boolean {
    return this.authStatus === constants.AuthorizationStates.Unauthorized
  }

  @computed
  public get isWaitingAuthorization(): boolean {
    return this.authStatus === constants.AuthorizationStates.WaitingAuthorization
  }

  @action
  public getSession = async (): Promise<void> => {
    const response = await AuthService.getAuthorizationSession()

    if (response.status === 401) {
      this.setAuthorizationStatus(constants.AuthorizationStates.Unauthorized)
    } else {
      const body = await response.json()

      runInAction(() => {
        body.user && this.setUser(body.user)
        body.user && this.setAuthorizationStatus(constants.AuthorizationStates.Authorized)
      })
    }
  }

  @action
  public login = async (): Promise<void> => {
    const response = await AuthService.getAuthorizationURL()

    if (response.status === 200) {

      const body = await response.json()

      body.url && window.location.assign(body.url)
    }
  }

  @action
  public logout = async (): Promise<void> => {
    AuthService.deleteAuthorizationSession()
    runInAction(() => {
      this.resetUser()
      this.setAuthorizationStatus(constants.AuthorizationStates.Unauthorized)
    })
  }

  @action
  public setAuthorizationStatus = (status: string): void => {
    this.authStatus = status
  }

  @action
  public resetUser = (): void => {
    this.user = undefined
  }

  @action
  public setUser = (user: TUser): void => {
    this.user = user
  }
}

export default new AuthorizationStore()