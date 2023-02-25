import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import productApi from '../../apis/product.api'

function ProductDetail() {
  const { id } = useParams()
  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  console.log('productDetailData:', productDetailData?.data.data)
  console.log('id:', id)

  return <div>ProductDetail</div>
}

export default ProductDetail
