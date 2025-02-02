import axios from "axios";
import { API_BASE } from "../utils/apiRoutes";

const usersApi = axios.create({
    baseURL: API_BASE.API_PERMISO
});

export const modificarPermiso = async (body) => {
    try {
        const response = await usersApi.post(`${API_BASE.API_PERMISO}`, body);
        return response
    } catch (error) {
        console.log(error);
    }
}