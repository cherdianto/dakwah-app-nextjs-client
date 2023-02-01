import axios from 'axios'
import jwt_decode from 'jwt-decode'
const apiUrl = process.env.ENV === 'dev' ? process.env.API_URL_DEV : process.env.API_URL_PROD

const ai = (user) => {
    const axiosJWT = axios.create()
    axiosJWT.interceptors.request.use(async(config) => {
        console.log(user)
        if(!user){
            console.log('calling axiosJWT without user')
            const response = await axios.get(apiUrl +'/auth/refreshToken',{ withCredentials: true });
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        } else {
            config.headers.Authorization = `Bearer ${user.data.accessToken}`;
            console.log('calling axiosJWT with user')
            const currentDate = new Date();
            const decoded = jwt_decode(config.headers.Authorization.split(' ')[1])
            if(decoded.exp * 1000 < currentDate.getTime()){
                const response = await axios.get(apiUrl +'/auth/refreshToken',{ withCredentials: true });
                config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            } 
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    }, [])

    return axiosJWT
}

export default ai