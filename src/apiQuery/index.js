import axiosJWT from "@utils/axiosJWT"
import axios from "axios"
const apiUrl = process.env.ENV === 'dev' ? process.env.API_URL_DEV : process.env.API_URL_PROD

const GET_MATERIES = apiUrl + "/api/materi"
const ADD_MATERI = apiUrl + "/api/materi/add"
const BASE_API = apiUrl + "/api/materi"

export const getMateries = async () => {
    try {
        const response = await axios.get(GET_MATERIES)
        return response.data.list
    } catch (error) {
        throw new Error(error)
    }
}

export const addMateri = async (formData) => {
    try {
        await axiosJWT.post(ADD_MATERI, formData, { withCredentials : true})
        // console.log(response.data.materi)
        // return response.data.materi
    } catch (error) {
        throw new Error(error)
    }
}

export const showMateri = async (materiId) => {
    // console.log(materiId)
    try {
        const response = await axios.get(`${BASE_API}/${materiId}`)
        // console.log(response.data.materi)
        return response.data.materi
    } catch (error) {
        throw new Error(error)
    }
}

export const addContent = async ({materiId,formData}) => {
    try {
        await axiosJWT.post(`${BASE_API}/${materiId}/content`, formData, { withCredentials : true})
        // console.log(response.data.materi)
        // return response.data.materi
    } catch (error) {
        throw new Error(error)
    }
}

export const updateContent = async ({materiId, contentId, formData}) => {
    try {
        await axiosJWT.put(`${BASE_API}/${materiId}/content/${contentId}`, formData, { withCredentials : true})
        // console.log(response.data.materi)
        // return response.data.materi
    } catch (error) {
        throw new Error(error)
    }
}
