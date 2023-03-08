import { useUser } from '@contexts/user.context'
import { useEffect, useState } from 'react'
import { fetchUser } from '../apiQuery'
import Router from 'next/router'

const useAuth = ({redirect}) => {
    const [currentUser, setCurrentUser]= useState(null)
    const { user, setUser } = useUser()

    const getUser = async () => {
        try {
            const res = await fetchUser(user?.accessToken)
            setCurrentUser(res)
            setUser(res)
        } catch (error) {
            setUser()
            setCurrentUser(null)
            if(redirect !== null) {
                Router.push(`/${redirect}`)
            }
        }
    }

    useEffect(() => {
        if (!user) getUser()
    }, [])

    return currentUser
}

export default useAuth