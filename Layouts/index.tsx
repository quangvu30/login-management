import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

//import Components
import Header from './Header'
import Footer from './Footer'

type DashboardLayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: DashboardLayoutProps) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  )
}

export default Layout
