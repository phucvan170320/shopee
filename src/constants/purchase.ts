export const purchasesStatus = {
  inCart: -1, // sp đang trong giỏ hàng
  all: 0, // tất cả sản phẩm
  waitForConfirmation: 1, // sp đang đợi xác nhận
  waitForGetting: 2, // sp đang được lấy hàng
  inProgress: 3, // sp đang vận chuyển
  delivered: 4, //sp đã  được giao
  cancelled: 5 // sp đã bị hủy
} as const
