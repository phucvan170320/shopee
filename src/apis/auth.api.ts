import http from '../../src/utils/http'
import { AuthResponse } from '../types/auth.type'
export const registerAccount = (body: { email: string; password: string }) => {
  return http.post<AuthResponse>('register', body)
}