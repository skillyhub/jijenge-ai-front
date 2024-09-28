import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { selectPhone } from '../redux/slices/serviceSlice'

function Navbar() {
    const location=useLocation()
    // const phone=useSelector(selectPhone)
    const phone=useState("+250783771485")

    // console.log(location.pathname)
    
  return (
    <section className='w-3/4 mx-auto py-5 justify-between flex bg-transparent'>
        {/* <span className='font-extrabold uppercase text-2xl text-white'>jijenge ai</span> */}
        <Link to='/'>
            <img 
                className='w-[150px] h-[50px]'
                src='/img/jijenge-logo.png'
                alt="logo"
            />
        </Link>
        {
            phone &&(
                <div className='flex items-center space-x-5'>
                    <Link 
                        className={
                        location.pathname ==='/'? 'text-blue-400 capitalize cursor-pointer font-bold':'text-white capitalize cursor-pointer hover:font-bold '
                        } 
                        to="/"
                    >
                        Home
                    </Link>
                    <Link 
                        className={
                            location.pathname ==='/credit-score'? 'text-blue-400 capitalize cursor-pointer font-bold ':'text-white capitalize cursor-pointer hover:font-bold '
                        } 
                        to="/credit-score"
                    >
                        credit score
                    </Link>
                    <Link 
                        className={
                            location.pathname ==='/transactions'? 'text-blue-400 capitalize cursor-pointer font-bold ':'text-white capitalize cursor-pointer hover:font-bold '
                        } 
                        to="/transactions"
                    >
                        View Transactions
                    </Link>
                    {/* <Link 
                        className={
                            location.pathname ==='/loan'? 'text-blue-400 capitalize cursor-pointer font-bold ':'text-white capitalize cursor-pointer hover:font-bold '
                        } 
                        to="/loan"
                    >
                        loan
                    </Link> */}
                    <Link 
                        className={
                            location.pathname ==='/about-us'? 'text-blue-400 capitalize cursor-pointer font-bold ':'text-white capitalize cursor-pointer hover:font-bold '
                        } 
                        to="/about-us"
                    >
                        about us
                    </Link>
                    <Link 
                        className={
                            location.pathname ==='/contact'? 'text-blue-400 capitalize cursor-pointer font-bold ':'text-white capitalize cursor-pointer hover:font-bold '
                        } 
                        to="/contact"
                    >
                        contact
                    </Link>
                </div>
            )
        }
        
    </section>
  )
}

export default Navbar