import axios from "axios";
import { API_BASE } from "../utils/apiRoutes";

const ecomerceApi = axios.create({
    baseURL: API_BASE.API_ECOMERCE
});

export const fetchOrdenes = async (username) => {
    try {
        const response = await ecomerceApi.get(`${API_BASE.API_ECOMERCE}/getOrdenes/${username}`);
        return response
    } catch (error) {
        console.log(error);
        return []
    }
}
export const fetchOrdenById = async (id) => {
    try {
        const response = await ecomerceApi.get(`${API_BASE.API_ECOMERCE}/getOrdenesById/${id}`);
        return response
    } catch (error) {
        console.log(error);
        return []
    }
}

export const editOrdenService = async (id,request) => {
    try {
        const response = await ecomerceApi.patch(`${API_BASE.API_ECOMERCE}/editOrden/${id}`,request);
        return response
    } catch (error) {
        console.log(error);
        return error.response
    }
}

export const saveOrdenService = async (request) => {
    try {
        const response = await ecomerceApi.post(`${API_BASE.API_ECOMERCE}/saveOrden`,request);
        return response
    } catch (error) {
        console.log(error);
        return error.response
    }
}



