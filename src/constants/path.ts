const path = {
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  login: 'login',
  register: 'register',
  logout: 'logout',
  productDetail: ':nameId',
  cart: 'cart'
  // products: 'products'
} as const

export default path
