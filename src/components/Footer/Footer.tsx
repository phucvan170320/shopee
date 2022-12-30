import React from 'react'

function Footer() {
  const arr = [
    {
      name: 'Singapore',
      link: 'https://shopee.sg'
    },
    {
      name: ' Indonesia',
      link: 'https://shopee.co.id'
    },
    {
      name: 'Đài Loan',
      link: 'https://shopee.tw'
    },
    {
      name: 'Thai Lan',
      link: 'https://shopee.co.th'
    },
    {
      name: 'Malaysia',
      link: 'https://shopee.com.my'
    },
    {
      name: 'Việt Nam',
      link: 'https://shopee.vn'
    },
    {
      name: 'Philippines',
      link: 'https://shopee.ph'
    },
    {
      name: 'Brazil',
      link: 'https://shopee.br'
    },
    {
      name: 'Colombia',
      link: 'https://shopee.co'
    },
    {
      name: 'México',
      link: 'https://shopee.mx'
    },
    {
      name: 'Chile',
      link: 'https://shopee.cl'
    },
    {
      name: 'Poland',
      link: 'https://shopee.pl'
    }
  ]
  return (
    <footer className='py-16 '>
      <div className='mx-auto max-w-7xl '>
        <div className='grid grid-cols-1 gap-4  lg:grid-cols-3'>
          <div className=' text-center'>© 2022 Shopee. Tất cả các quyền được bảo lưu.</div>
          <div className='col-span-2 '>
            <div className='flex flex-1 flex-wrap justify-center'>
              <div className='ircc-H syJk0q'>Quốc gia &amp; Khu vực:</div>
              {arr.map((element, index) => {
                return (
                  <div key={index} className=' border-r-2 border-solid border-[red] '>
                    <a href={element.link} className='syJk0q _1yz5p4'>
                      {element.name}
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='mt-10 text-center text-sm'>
          <div>Công ty TNHH Shopee</div>
          <div className='mt-6'>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </div>
          <div className='mt-2'>
            Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
          </div>
          <div className='mt-2'>
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
          </div>
          <div className='mt-2'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
