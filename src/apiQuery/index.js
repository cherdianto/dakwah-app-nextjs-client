import axios from "axios"
const apiUrl = process.env.ENV === 'vercel' ? process.env.API_URL_VERCEL : process.env.API_URL_LOCAL

const GET_MATERIES = "http://localhost:3001/api/materi"

export const getMateries = async () => {
    try {
        const response = await axios.get(GET_MATERIES)
        console.log(response.data.list)
        return response.data.list
    } catch (error) {
        throw new Error(error)
    }
}
