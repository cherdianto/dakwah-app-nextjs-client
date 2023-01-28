import Login from '@common/Login'
import Register from '@common/RegisterForm'
import React from 'react'
import Layout from '../modules/common/Layout'
import { useUser } from '@contexts/user.context'
import { AppNavbar } from '@common/NavbarProfil'
import axiosJWT from '@utils/axiosJWT'
import Router from 'next/router'
import { useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Dashboard from '@common/Dashboard'
import Profile from '@common/Profile'

const apiUrl = process.env.ENV === 'vercel' ? process.env.API_URL_VERCEL : process.env.API_URL_LOCAL

const AccountPage = (props) => {
    
    const {user, setUser} = useUser()

    console.log('account page')

    const getUser = async () => {
        try {
            console.log('firing axiosjwt from accountpage')
            const res = await axiosJWT(`${apiUrl}/auth/user`, {
                withCredentials: true
            })
            
            setUser(res.data.user)
        } catch (error) {
            if(error.isAxiosError){
                setUser()
            }
            Router.push('/login')
        }
    }

    useEffect(() => {
        if(!user) getUser()
    }, [])

    if(!user){
        return (
            <Layout>
                <h2>loading...</h2>
            </Layout>
        )
    }

    return (
        <Layout>
            <AppNavbar />
            <Container maxWidth="sm" sx={{
                mt: 1
            }}>
                {/* <Typography variant='h6' sx={{ mb: 1 }}>
                    Assalamu alaikum, {user}
                </Typography> */}
                <Profile />
            </Container>
        </Layout>
    )
}

export default AccountPage