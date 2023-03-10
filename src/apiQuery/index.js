import axiosJWT from "@utils/axiosJWT"
import axios from "axios"
axios.defaults.withCredentials = true;

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

export const addMateri = async ({accessToken, formData}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
        withCredentials: true
    }
    
    try {
        await axiosJWT.post(ADD_MATERI, formData, config)
    } catch (error) {
        throw new Error(error.response.data || error)
    }
}

export const showMateri = async (materiId) => {

    try {
        const response = await axios.get(`${BASE_API}/${materiId}`)
        return response.data.materi
    } catch (error) {
        throw new Error(error)
    }
}

export const updateMateri = async ({materiId, accessToken, formData}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    }

    try {
        const response = await axiosJWT.put(`${BASE_API}/update/${materiId}`, formData, config)
        return response.data.updatedMateri
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteMateri = async ({accessToken, materiId}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    }

    try {
        const response = await axiosJWT.delete(`${BASE_API}/delete/${materiId}`, config)
        return response.data.deletedMateri
    } catch (error) {
        throw new Error(error)
    }
}

export const addContent = async ({materiId, accessToken, formData}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    }

    try {
        await axiosJWT.post(`${BASE_API}/${materiId}/content`, formData, config)
    } catch (error) {
        throw new Error(error)
    }
}

export const updateContent = async ({materiId, accessToken, contentId, formData}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    }

    try {
        await axiosJWT.put(`${BASE_API}/${materiId}/content/${contentId}`, formData, config)
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteContent = async ({materiId, accessToken, contentId}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    }

    try {
        await axiosJWT.delete(`${BASE_API}/${materiId}/content/${contentId}`, config)
    } catch (error) {
        throw new Error(error)
    }
}


export const updateProfile = async ({data, accessToken}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    }
    
    try {
        const response = await axiosJWT.put(`${apiUrl}/auth/update-profile`, data, config)
        return response.data.user
    } catch (error) {
        throw new Error(error)
    }
}

export const fetchUser = async (accessToken) => {
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    }

    try {
        const response = await axiosJWT.get(`${apiUrl}/auth/user`, config)
        return response.data.user
    } catch (error) {
        throw new Error(error)
    }
}
