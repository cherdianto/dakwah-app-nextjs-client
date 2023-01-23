import axios from "axios"

const refreshToken = async() => {
    await axios.get('http://localhost/auth/refreshToken', {withCredentials: true})
}

export const handleRequest = async (request) => {
    try {
        const res = await request()
        console.log(res)
        return res
    } catch (error) {
        // if error 401, get new token, then ulangi request
        if(error?.response?.status === 401){
            try {
                await refreshToken()
                return await request()
            } catch (error) {
                
            }
        }
    }
}