import Login from '@common/Login'
import Register from '@common/Register'
import React from 'react'
import Layout from '../modules/common/Layout'
import { useUser } from '@contexts/user.context'
import { AppNavbar } from '@common/NavbarProfil'
import axiosJWT from '@utils/axiosJWT'
import Router from 'next/router'
import { useEffect } from 'react'
import { axiosGetter } from '@utils/axiosGetter'


const AccountPage = (props) => {
    
    const {user, setUser} = useUser()

    const getUser = async () => {
        try {
            
            const res = await axiosJWT('http://localhost:3001/auth/user', {
                withCredentials: true
            })
            
            setUser(res.data.user.fullname)
        } catch (error) {
            if(error.isAxiosError){
                setUser()
            }
            Router.push('/login')
        }
    }

    useEffect(() => {
        if(!user) getUser()
    }, [user])

    return (
        <Layout>
            <AppNavbar />
            { user ? <h2>dashboard {user}</h2> : <h2>loading...</h2> }
        </Layout>
    )
}

export default AccountPage