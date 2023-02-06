import React from 'react'
import Layout from '../modules/common/Layout'
import { useUser } from '@contexts/user.context'
import { AppNavbar } from '@common/NavbarProfil'
import Router from 'next/router'
import { useEffect } from 'react'
import Container from '@mui/material/Container'
import Profile from '@common/Profile'
import { fetchUser } from '../apiQuery'
import useAuth from '@hooks/useAuth'

const AccountPage = (props) => {
    const { user, setUser } = useUser()
    const currentUser = useAuth({ redirect: 'login'})

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