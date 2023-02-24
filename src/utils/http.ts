import axios, { AxiosError, RawAxiosResponseHeaders, type AxiosInstance, type RawAxiosRequestHeaders } from 'axios'
import HttpStatusCode from 'axios'
import { isAxiosUnprocessableEntityError } from './ultils'
import { toast } from 'react-toastify'
import { config } from 'process'
import { AuthResponse } from '../types/auth.type'
// import { login } from '../apis/auth.api'
import path from '../constants/path'
import {
  setAccessTokenToLS,
  setRefreshTokenToLS,
  setProfileToLS,
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS
} from './auth'

class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 60 * 60 * 24, // 1 ngày
        'expire-refresh-token': 60 * 60 * 24 * 160 // 160 ngày
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          ;(config.headers as RawAxiosRequestHeaders).authorization = this.accessToken

          // config.headers['authorization'] = this.accessToken
          // config.headers.set('authorization', this.accessToken)

          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        // console.log(url)

        if (url === path.login || url === path.register) {
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          // console.log(this.accessToken)
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
          setProfileToLS(data.data.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          this.refreshToken = ''
          // console.log('helo2')
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          // toast.error(message)
          // console.log('error:', message)
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
