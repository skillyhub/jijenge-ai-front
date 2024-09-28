import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Loader } from '../components';


const Home=lazy(()=>import('../pages/HomePage'))
const Credit=lazy(()=>import('../pages/CreditPage'))
const Loan=lazy(()=>import('../pages/LoanPage'))
const About=lazy(()=>import('../pages/AboutPage'))
const Contact=lazy(()=>import('../pages/ContactPage'))



function RootNavigator() {
  return (
    <Suspense fallback={<Loader />}>
        <Router>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/credit-score" Component={Credit} />
                <Route path="/loan" Component={Loan} />
                <Route path="/about-us" Component={About} />
                <Route path="/contact" Component={Contact} />
            </Routes>
        </Router>
    </Suspense>
    
  )
}

export default RootNavigator