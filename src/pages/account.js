import React from 'react'
import Layout from '../modules/common/Layout'
import { useUser } from '@contexts/user.context'
import { AppNavbar } from '@common/NavbarProfil'
import Router from 'next/router'
import { useEffect } from 'react'
import Container from '@mui/material/Container'
import Profile from '@common/Profile'
import { fetchUser } from '../apiQuery'

const AccountPage = (props) => {
    const { user, setUser } = useUser()

    const getUser = async () => {
        try {
            const res = await fetchUser(user?.accessToken)
            setUser(res)
        } catch (error) {
            // if (error.isAxiosError) {
            // }
            setUser()
            Router.push('/login')
        }
    }

    useEffect(() => {
        if (!user) getUser()
    }, [])

    if (!user) {
        return (
            <Layout>
                <h2>loading...</h2>
            </Layout>
        )
    }

    return (
        <Layout>
            <AppNavbar />
            <Container sx={{
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