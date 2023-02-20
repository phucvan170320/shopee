import React from 'react'
import AsideFilter from './components/AsideFilter'
import SortProductList from './components/SortProductList'
import Product from './components/Product'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from '../../hooks/useQueryParams'
import productApi from '../../apis/product.api'
// import Product from '../../types/product.type'

function ProductList() {
  const queryParams = useQueryParams()
  const { data } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams)
    }
  })
  console.log('datta:', data)
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container '>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className=' mt-6 grid grid-cols-2 gap-3  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {Array(30)
                .fill(0)
                .map((_, index) => (
                  <div className='col-span-1' key={index}>
                    <Product />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
