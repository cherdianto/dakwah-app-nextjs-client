import axios from 'axios'
import jwt_decode from 'jwt-decode'

const apiUrl = process.env.ENV === 'dev' ? process.env.API_URL_DEV : process.env.API_URL_PROD
// const { user } = useUser()
// $PENDINGWORK : setelah sukses dapet access token baru, seharusnya token baru disimpan di redux store auth/user/token utk dipake lagi di next request
// axios.defaults.withCredentials = true;

const axiosJWT = axios.create()

axiosJWT.interceptors.request.use(async (config) => {
    // console.log(user)
    // if (!user) {
    //     console.log('calling axiosJWT without user')
    //     const response = await axios.get(apiUrl + '/auth/refreshToken', {
    //         withCredentials: true
    //     });
    //     config.headers.Authorization = `Bearer ${response.data.accessToken}`;
    // } else {
        // config.headers.Authorization = `Bearer ${user.data.accessToken}`;
        // console.log('calling axiosJWT with config')
        // console.log(config.headers)
        const currentDate = new Date();
        const decoded = jwt_decode(config.headers.Authorization.split(' ')[1])
        if (decoded.exp * 1000 < currentDate.getTime()) {
            const response = await axios.get(apiUrl + '/auth/refreshToken', {
                withCredentials: true
            });
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        }
    // }
    return config
}, (error) => {
    console.log('error from axiosjwt')
    console.log(error)
    return Promise.reject('UNAUTHORIZED, PLEASE RELOGIN')
}, [])


// RESPONSE INTERCEPTORS
axiosJWT.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    // console.log(originalRequest)
    // console.log(error)

    // if(error.isAxiosError){
    //     console.log(error.response.data)
    //     const er = error.response.data
    //     return Promise.reject(er)
    //     // throw new Error('rejected')
    // } else {
    //     console.log('mbuh')
    // }

    return Promise.reject('UNAUTHORIZED')

    // if(error.response.status === 401 && !originalRequest._retry){
    // if(error.response.status === 401 || error.response.status === 403){
    //     // REFRESH TOKEN ON COOKIES IS EXPIRED, FORCE LOGOUT
    //     // $PENDINGWORK = IT WORKS BUT NOT SMOOTH, REWORK PLEASE
    //     localStorage.removeItem('user')
    //     console.log(error)
    //     // window.location = process.env.REACT_APP_URL_BASE + "/logout"
    //     // window.location = appUrl + "/logout"
    // }

    // return Promise.reject(error).catch(error => {
    //     console.log(error)
    // })
})


export default axiosJWT