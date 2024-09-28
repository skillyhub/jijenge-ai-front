import React from 'react'
import { Footer, Navbar } from '../components'
import { useLocation } from 'react-router-dom'

function Layout({children,hide}) {
    const location=useLocation()
  return (
    <div className='w-screen'>
        <Navbar />
        {children}
        {
            location.pathname === '/credit-score' &&<Footer />
        }
        
    </div>
  )
}

export default Layout