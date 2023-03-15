import React, {useEffect} from 'react'
import Layout from '../modules/common/Layout'
import { useUser } from '@contexts/user.context'
// import Router from 'next/router'
// import { useEffect } from 'react'
import Container from '@mui/material/Container'
import Profile from '@common/Profile'
// import { fetchUser } from '../apiQuery'
import useAuth from '@hooks/useAuth'
import { AppNavbar } from '@mobile/Header'
import AccountPopover from '@common/PopOver/AccountPopover.js'
import Router from 'next/router'
import { useSession } from 'next-auth/react'

const AccountPage = (props) => {
    const { user, setUser } = useUser()
    const {status, data: session} = useSession()

    // const currentUser = useAuth({ redirect: 'login'})

    // if (!user) {
    //     return (
    //         <Layout>
    //             <h2>loading...</h2>
    //         </Layout>
    //     )
    // }

    // useEffect(() => {
    //     if(!data?.session){
    //         Router.push('/')
    //     }
    // }, [data])

    useEffect(() => {
        if(status === 'unauthenticated') Router.replace('/login')
    }, [status])

    if(status === 'authenticated') {
        return (
            <Layout>
                <AppNavbar text="Profil" popOver=<AccountPopover /> />
                <Container sx={{
                    mt: 1
                }}>
                    <Profile />
                </Container>
            </Layout>
        )
    }

    return <Layout><h2>loading...</h2></Layout>
}

export default AccountPage