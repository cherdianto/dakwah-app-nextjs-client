import { useUser } from '@contexts/user.context'
import axiosJWT from '@utils/axiosJWT'
import { useEffect, useState } from 'react'

const useAuth = () => {
    const [currentUser, setCurrentUser]= useState(null)
    const { user, setUser } = useUser()

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const res = await axiosJWT('http://localhost:3001/auth/user', {
                    withCredentials: true
                })
        
                setCurrentUser(res.data.user.fullname)
                // setUser(res.data.user.fullname)
            } catch (error) {
                if (error.isAxiosError) {
                    setCurrentUser()
                    // setUser()
                }
            }
        }

        fetchUser()
    }, [user])
    return { currentUser }
}

export default useAuth