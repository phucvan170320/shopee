import axios, { AxiosError, HttpStatusCode } from 'axios'

// hàm này nói về khi isAxiosError chạy thì error nó sẽ biến thnafh kiểu AxiosError<T>
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
