import axios from 'axios'
import jwt_decode from 'jwt-decode'

const apiUrl = 'http://localhost:3001/api';
const appUrl = process.env.REACT_APP_ENV === 'development' ? process.env.REACT_APP_URL_BASE_DEV : process.env.REACT_APP_URL_BASE_PROD;


// $PENDINGWORK : setelah sukses dapet access token baru, seharusnya token baru disimpan di redux store auth/user/token utk dipake lagi di next request
const axiosJWT = axios.create()
// axios interceptor here
// REQUEST INTERCEPTORS
axiosJWT.interceptors.request.use(async(config) => {
    const currentDate = new Date();
    const decoded = jwt_decode(config.headers.Authorization.split(' ')[1])
    if(decoded.exp * 1000 < currentDate.getTime()){
        const response = await axios.get(apiUrl +'/auth/refreshToken',{ withCredentials: true });
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
    } 
    return config
}, (error) => {
    return Promise.reject(error)
}, [])


// RESPONSE INTERCEPTORS
axiosJWT.interceptors.response.use((response) => {
    return response
}, async function (error) {
    // const originalRequest = error.config;
    // console.log(error)


    // if(error.response.status === 401 && !originalRequest._retry){
    if(error.response.status === 401 || error.response.status === 403){
        // REFRESH TOKEN ON COOKIES IS EXPIRED, FORCE LOGOUT
        // $PENDINGWORK = IT WORKS BUT NOT SMOOTH, REWORK PLEASE
        localStorage.removeItem('user')
        // window.location = process.env.REACT_APP_URL_BASE + "/logout"
        // window.location = appUrl + "/logout"
    }

    return Promise.reject(error)
})


export default axiosJWT
