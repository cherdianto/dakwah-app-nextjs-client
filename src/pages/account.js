import React from 'react'
import Layout from '../modules/common/Layout'
import { useUser } from '@contexts/user.context'
import Router from 'next/router'
import { useEffect } from 'react'
import Container from '@mui/material/Container'
import Profile from '@common/Profile'
import { fetchUser } from '../apiQuery'
import useAuth from '@hooks/useAuth'
import { AppNavbar } from '@mobile/Header'
import AccountPopover from '@common/PopOver/AccountPopover.js'

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
            <AppNavbar text="Profil" popOver=<AccountPopover /> />
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