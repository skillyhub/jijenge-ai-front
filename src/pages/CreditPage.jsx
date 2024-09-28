import React from 'react'
import Layout from './Layout'
import { CreditScore } from '../components'

function CreditPage() {
  return (
    <Layout children={<CreditScore />} />
  )
}

export default CreditPage