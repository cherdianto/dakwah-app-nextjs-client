import Login from '@common/Login'
import Register from '@common/Register'
import React from 'react'
import Layout from '../modules/common/Layout'
import { useUser } from '@contexts/user.context'
import { AppNavbar } from '@common/NavbarProfil'
import axiosJWT from '@utils/axiosJWT'
import Router from 'next/router'
import { useEffect } from 'react'
// import { axiosGetter } from '@utils/axiosGetter'


const RegisterPage = (props) => {
    console.log(props)
    
    const {user, setUser} = useUser()

    const getUser = async () => {
        console.log('getting user info')
        try {
            const res = await axiosJWT('http://localhost:3001/auth/user', {
                withCredentials: true
            })
            
            setUser(res.data.user.fullname)
        } catch (error) {
            if(error.isAxiosError){
                setUser()
                // console.log(error.response.data.message)
            }
        }
    }
    
    useEffect(() => {
        getUser()
        if(user) Router.push('/account')
    }, [user])

    return (
        <Layout>
            <Register />
        </Layout>
    )
}

export default RegisterPage