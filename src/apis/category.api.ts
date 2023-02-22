import http from '../utils/http'
import { Category } from '../types/category.type'
import { SuccessResponse } from '../types/ultil.type'
// import http from 'src/utils/http'

const URL = 'categories'

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(URL)
  }
}
export default categoryApi
