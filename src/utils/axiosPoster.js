import axios from "axios"

export const axiosPoster = async(url, payload) => {
    try {
        const request = () => axios.post(url, payload, { withCredentials: true })
        const { data } = await handleRequest(request)

        return [null, data]
    } catch (error) {
        return [error, null]
    }
}