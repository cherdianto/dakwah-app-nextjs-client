import Login from '@common/Login'
import Register from '@common/RegisterForm'
import React from 'react'
import Layout from '../modules/common/Layout'
import { useUser } from '@contexts/user.context'
// import { AppNavbar } from '@common/NavbarProfil'
import axiosJWT from '@utils/axiosJWT'
import Router from 'next/router'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'


const LoginPage = (props) => {
    const { status, data } = useSession()
    
    // const {user, setUser} = useUser()
    
    useEffect(() => {
        if(status === 'authenticated') Router.replace('/account')
    }, [status])

    if( status === 'loading') {
        return <Layout><h2>loading...</h2></Layout>
    }

    return (
        <Layout>
            <Login />
        </Layout>
    )
}

export default LoginPage