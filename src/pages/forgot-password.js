// import Login from '@common/Login'
// import RegisterForm from '@common/RegisterForm'
import React from 'react'
import Layout from '../modules/common/Layout'
import { useUser } from '@contexts/user.context'
// import { AppNavbar } from '@common/NavbarProfil'
// import axiosJWT from '@utils/axiosJWT'
import Router from 'next/router'
import { useEffect } from 'react'
import ForgotPasswordForm from '@common/ForgotPasswordForm'
import { fetchUser } from '../apiQuery'



const ForgotPassword = (props) => {
    
    const {user, setUser} = useUser()

    const getUser = async () => {
        try {
            const res = await fetchUser(user?.accessToken)
            setUser(res)
        } catch (error) {
            // console.log('error get user')

            setUser()
        }
    }
    
    useEffect(() => {
        if(!user || user === undefined) getUser()
        if(user) Router.push('/account')
    })

    return (
        <Layout>
            <ForgotPasswordForm />
        </Layout>
    )
}

export default ForgotPassword