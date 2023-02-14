type Role = 'User' | 'Admin'
export interface User {
  _id: string
  //quyền là roles
  roles: Role[]
  email: string
  name: string
  date_of_birth: null
  address: string
  phone: string
  createdAt: string
  updatedAt: string
}
