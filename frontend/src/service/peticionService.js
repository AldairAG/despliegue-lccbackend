import { API_BASE } from "../utils/apiRoutes";
import axios from "axios";

const usersApi = axios.create({
    baseURL: API_BASE.API_PETICION
});

export const fetchSolicitudesByTipos = async (body) => {
    try {
        const response = await usersApi.post(`${API_BASE.API_PETICION}/findByTipos`, body);
        return response
    } catch (error) {
        console.error(error)
    }
}
export const fetchEnvoiceByCode=async(code)=>{
    try {
        const response=await usersApi.get(`${API_BASE.API_PETICION}/findByCode/${code}`)
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}
export const findUserByPeticionId=async(id)=>{
    try {
        const response=await usersApi.get(`${API_BASE.API_PETICION}/findUserByPeticionId/${id}`)
        return response
    } catch (error) {
        console.error(error)
    }
}
export const aprobarPeticion=async(id)=>{
    try {
        const response=await usersApi.get(`${API_BASE.API_PETICION}/aprobar/${id}`)
        return response
    } catch (error) {
        console.error(error)
    }
}
export const denegarPeticion=async(id)=>{
    try {
        const response=await usersApi.delete(`${API_BASE.API_PETICION}/eliminar/${id}`)
        return response
    } catch (error) {
        console.error(error)
    }
}
export const PagarFacturasService=async(id,body)=>{
    try {
        const response=await usersApi.post(`${API_BASE.API_PETICION}/pagarFactura/${id}`,body)
        return response
    } catch (error) {
        console.error(error)
    }
}
export const findRetiroPendiente=async(username)=>{
    try {
        const response=await usersApi.get(`${API_BASE.API_PETICION}/retiroPen/${username}`)
        return response
    } catch (error) {
        console.error(error)
    }
}