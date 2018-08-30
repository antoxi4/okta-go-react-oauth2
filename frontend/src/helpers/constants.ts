export const PagesPaths: { [key: string]: string } = {
  SIGNIN: '/signin',
  HOME: '/'
}

export enum AuthorizationStates {
  Authorized = 'AUTHORIZED',
  Unauthorized = 'UNAUTHORIZED',
  WaitingAuthorization = 'WAITINGAUTHORIZATION'
}