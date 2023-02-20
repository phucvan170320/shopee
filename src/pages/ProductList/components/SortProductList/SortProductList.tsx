import React from 'react'

function SortProductList() {
  return (
    <div className=' bg-gray-300/40 py-4 px-3'>
      <div className='flex  flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <div>sắp xếp theo </div>
          <button className='h-8 bg-orange px-4 text-center text-sm capitalize hover:bg-orange'>Phổ biến </button>
          <button className='h-8 bg-white px-4 text-center text-sm capitalize hover:bg-orange'>Mới nhất </button>
          <button className='h-8 bg-white px-4 text-center text-sm capitalize hover:bg-orange'>Bán chạy </button>
          <select name='' id='' className='h-8 bg-white px-4 capitalize hover:bg-slate-200 '>
            <option value='' disabled>
              Giá
            </option>
            <option value='price:asc'>Giá Thấp đến cao </option>
            <option value='price:desc'>Giá cao đến thấp </option>
          </select>
        </div>
        <div className='flex  items-center '>
          <span className='text-orange'>1</span>
          <span>/9</span>
          <div className='ml-2'>
            <button className='cursor-pointer bg-[aqua] px-2 text-orange shadow-sm'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
              </svg>
            </button>
            <button className='cursor-pointer bg-white px-2 shadow-sm hover:bg-[aqua]'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductList
