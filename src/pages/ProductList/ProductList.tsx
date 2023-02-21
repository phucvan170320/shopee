import React from 'react'
import AsideFilter from './components/AsideFilter'
import SortProductList from './components/SortProductList'
import Product from './components/Product'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from '../../hooks/useQueryParams'
import productApi from '../../apis/product.api'
import Pagination from '../../components/Pagination'
// import Product from '../../types/product.type'
import { useState } from 'react'
import useQueryConfig from '../../hooks/useQueryConfig'
import { ProductListConfig } from '../../types/product.type'

function ProductList() {
  const queryConfig = useQueryConfig()

  // const queryParams = useQueryParams()
  const { data } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    }
  })
  console.log('datta:', data)
  // const [page, setPage] = useState(1)
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container '>
        {data && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter />
            </div>
            <div className='col-span-9'>
              <SortProductList />
              <div className=' mt-6 grid grid-cols-2 gap-3  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {data.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={data.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
