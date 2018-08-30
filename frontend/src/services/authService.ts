export namespace AuthService {

  export const getAuthorizationURL = (): Promise<any> => {
    return fetch('http://localhost:8081/login', { credentials: 'include' })
  }

  export const getAuthorizationSession = (): Promise<any> => {
    return fetch('http://localhost:8081/session', { credentials: 'include' })
  }

  export const deleteAuthorizationSession = (): Promise<any> => {
    return fetch('http://localhost:8081/logout', { credentials: 'include' })
  }
}