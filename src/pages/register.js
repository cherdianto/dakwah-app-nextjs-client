import Login from '@common/Login'
import RegisterForm from '@common/RegisterForm'
import React from 'react'
import Layout from '../modules/common/Layout'
import { useUser } from '@contexts/user.context'
// import { AppNavbar } from '@common/NavbarProfil'
import axiosJWT from '@utils/axiosJWT'
import Router from 'next/router'
import { useEffect } from 'react'
// import { axiosGetter } from '@utils/axiosGetter'


const RegisterPage = (props) => {
    
    const {user, setUser} = useUser()
    
    useEffect(() => {
        if(user) Router.push('/account')
    }, [user])

    return (
        <Layout>
            <RegisterForm />
        </Layout>
    )
}

export default RegisterPage