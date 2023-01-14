import Login from '@common/Login'
import Register from '@common/Register'
import React from 'react'
import Layout from '../modules/common/Layout'


export default function AccountPage(props) {
    

    return (
        <Layout>
            {/* <Login /> */}
            <Register />
        </Layout>
    )
}