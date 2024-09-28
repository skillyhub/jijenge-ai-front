import React from 'react'
import Layout from './Layout'
import { Contact } from '../components'

function ContactPage() {
  return (
    <Layout children={<Contact />} />
  )
}

export default ContactPage