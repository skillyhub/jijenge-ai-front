import React from 'react'
import Layout from './Layout'
import { Loan } from '../components'

function LoanPage() {
  return (
    <Layout children={<Loan />} />
  )
}

export default LoanPage