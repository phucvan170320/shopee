import http from '../../src/utils/http'
import { AuthResponse } from '../types/auth.type'

export const URL_LOGIN = 'login'
export const URL_REGISTER = 'register'
export const URL_LOGOUT = 'logout'
export const URL_REFRESH_TOKEN = 'refresh-access-token'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_REGISTER, body)
  },
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body)
  },
  logout() {
    return http.post(URL_LOGOUT)
  }
}
export default authApi
// export const registerAccount = (body: { email: string; password: string }) => {
//   return http.post<AuthResponse>('register', body)
// }

// export const login = (body: { email: string; password: string }) => {
//   return http.post<AuthResponse>('login', body)
// }
// export const logout = () => {
//   return http.post('/logout')
// }
