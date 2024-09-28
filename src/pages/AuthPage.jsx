import React from 'react'
import Layout from './Layout'
import AuthComponent from '../components/AuthComponent'

function AuthPage() {
  return (
    <Layout hide children={<AuthComponent/>} />
  )
}

export default AuthPage