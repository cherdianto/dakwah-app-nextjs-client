import axios from "axios"

const getError = (error) => {
    if (error.isAxiosError && error.response) return error.response.data
    return 'unexpected error'
}

const handleRequest = async (request) => {
    try {
        
    } catch (error) {
        if(error?.response?.status === 401 ){
            try {
                
            } catch (error) {
                throw getError(error)
            }
        }
    }
}

export const axiosGetter = async (url, config) => {
    try {
        const request = () => axios.get(url, { withCredentials: true})
        const { data} = await handleRequest(request)

        return [null, data]
    } catch (error) {
        return [error, null]
    }
}