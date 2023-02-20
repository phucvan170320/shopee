import React from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line import/no-unresolved
import { Product as ProductType } from '../../../../types/product.type'
import ProductRating from '../../../../components/ProductRating/ProductRating'
interface Props {
  product: ProductType
}
function Product({ product }: Props) {
  return (
    <Link to='/'>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img
            src={'https://cf.shopee.vn/file/f774bd6b10710f86b8cecf6c0f447ea8_tn'}
            alt=''
            className='absolute top-0 left-0 h-full w-full bg-white object-cover'
          />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[2rem] text-xs line-clamp-2'>
            Bộ Quần Áo Thun Nam In Họa Tiết Chữ UMKLSU Tinh Tế Thời Trang Zenkonam MEN QA 129
          </div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>5000</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>2000</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={4} />
            <div className='ml-2 text-sm'>
              <span>5,66k</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Product
