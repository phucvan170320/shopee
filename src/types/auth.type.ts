import { SuccessResponse } from './ultil.type'
import { User } from './user.type'

export type AuthResponse = SuccessResponse<{
  access_token: string
  expires: string
  user: User
  refresh_token: string
}>
