import React from 'react'
import Layout from './Layout'
import { Home } from '../components'

function HomePage() {
  return (
    <Layout children={<Home />} />
  )
}

export default HomePage