import axios from "axios";
import { API_BASE } from "../utils/apiRoutes";

const usersApi = axios.create({
    baseURL: API_BASE.API_USER
});

export const fetchAllUsers = async () => {
    try {
        const response = await usersApi.get(`${API_BASE.API_USER}/all`);
        return response
    } catch (error) {
        console.error(error)
    }
}
export const fetchUserForAdmin = async (id) => {
    try {
        const response = await usersApi.get(`${API_BASE.API_USER}/${id}`);
        return response
    } catch (error) {
        console.error(error)
    }
}
export const fetchUser = async (loginRequest) => {
    try {
        const response = await usersApi.post(`${API_BASE.API_USER}/login`,loginRequest);
        return response
    } catch (error) {
        console.log(error);
        
        return error.response
    }
}
export const fetchMyNet = async (username) => {
    try {
        const response = await usersApi.get(`${API_BASE.API_USER}/myNet/${username}`);
        return response
    } catch (error) {
        console.error(error)
    }
}
export const register=async(body)=>{
    try {
        const response=await usersApi.post(`${API_BASE.API_USER}`,body)
        return response
    } catch (error) {
        console.error(error)
    }
}
export const updateUser = async (id, body) => {
    try {
        const response = await usersApi.patch(`${API_BASE.API_USER}/${id}`, body);
        return response
    } catch (error) {
        console.error(error)
    }
}
export const getCardUserData = async (username) => {
    try {
        const response = await usersApi.get(`${API_BASE.API_USER}/cardUser/${username}`);
        return response
    } catch (error) {
        console.error(error)
    }
}
export const createPeticion = async (id,body) => {
    try {
        const response = await usersApi.post(`${API_BASE.API_USER}/addPeticion/${id}`, body);
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}
export const fetchUserDestinatario = async (username) => {
    try {
        const response = await usersApi.get(`${API_BASE.API_USER}/findDestinatario/${username}`)
        return response
    } catch (error) {
        return error.response
    }
}
export const transferenciaInterna= async(body)=>{
    try {
        const response = await usersApi.post(`${API_BASE.API_USER}/ti`, body);
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}
export const ServiceSaveIc=async (body)=>{
    try {
        const response = await usersApi.post(`${API_BASE.API_USER}/ic/save`, body);
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}
export const tryNip = async (username,nip) => {
    try {
        const response = await usersApi.post(`${API_BASE.API_USER}/validateNip/${username}`,null,{params: { nip },});
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}
export const updateService = async (request) => {
    try {
        const response = await usersApi.put(`${API_BASE.API_USER}/update`,request);
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}
export const sendEmailService = async (template,bodyParams) => {
    try {
        const response = await usersApi.post(`${API_BASE.API_USER}/sendEmail`,{template,bodyParams});
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}
export const updateNipService = async (id,idUser,newNip) => {
    try {
        const response = await usersApi.put(`${API_BASE.API_USER}/updateNip/${id}/${idUser}`,{newNip});
        return response
    } catch (error) {
        console.error(error)
        return error.response
    }
}