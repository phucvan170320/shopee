import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

interface Props {
  children?: React.ReactNode
}

function MainLayout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout
