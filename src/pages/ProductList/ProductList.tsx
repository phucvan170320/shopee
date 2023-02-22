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
// import SortProductList from './components/SortProductList/SortProductList'
import categoryApi from '../../apis/category.api'

function ProductList() {
  const queryConfig = useQueryConfig()
  // type QueryConfig = {
  //   page?: string | undefined
  //   limit?: string | undefined
  //   sort_by?: string | undefined
  //   order?: string | undefined
  //   exclude?: string | undefined
  //   rating_filter?: string | undefined
  //   price_max?: string | undefined
  //   price_min?: string | undefined
  //   name?: string | undefined
  //   category?: string | undefined
  // }
  // const queryParams = useQueryParams()
  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
    },
    keepPreviousData: true
  })
  console.log('datta:', productsData)
  // const [page, setPage] = useState(1)
  // export interface Category {
  //   _id: string
  //   name: string
  // }
  const { data: categoryData } = useQuery({
    queryKey: ['category'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })
  console.log('categoryApi:', categoryData)
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container '>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsideFilter categories={categoryData?.data.data || []} queryConfig={queryConfig} />
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className=' mt-6 grid grid-cols-2 gap-3  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductList
