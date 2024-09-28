import React from 'react'
import Layout from './Layout'
import { AboutUs } from '../components'

function AboutPage() {
  return (
    <Layout children={<AboutUs />} />
  )
}

export default AboutPage