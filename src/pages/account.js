import Login from '@common/Login'
import Register from '@common/Register'
import React from 'react'
import Layout from '../modules/common/Layout'
import { useUser } from '@contexts/user.context'
import { AppNavbar } from '@common/Navbar'


export default function AccountPage(props) {
    
    const {user, setUser} = useUser()

    return (
        <Layout>
            <AppNavbar />
            { !user ? <Login /> : (
                <h2>dashboard {user}</h2>
            )}
            {/* <Register /> */}
        </Layout>
    )
}