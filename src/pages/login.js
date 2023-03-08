import Login from '@common/Login'
import Register from '@common/RegisterForm'
import React from 'react'
import Layout from '../modules/common/Layout'
import { useUser } from '@contexts/user.context'
// import { AppNavbar } from '@common/NavbarProfil'
import axiosJWT from '@utils/axiosJWT'
import Router from 'next/router'
import { useEffect } from 'react'


const LoginPage = (props) => {
    
    const {user, setUser} = useUser()
    
    useEffect(() => {
        if(user) Router.push('/account')
    }, [user])

    return (
        <Layout>
            <Login />
        </Layout>
    )
}

export default LoginPage