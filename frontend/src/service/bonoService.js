import axios from "axios";
import { API_BASE } from "../utils/apiRoutes";

const bonoApi = axios.create({
    baseURL: API_BASE.API_BONOS
});

export const ejecutarBono = async (ruta) => {
    try {
        const response = await bonoApi.get(`${API_BASE.API_BONOS}/${ruta}`);
        return response
    } catch (error) {
        console.log(error);
        const errorMessage = error.response?.data?.message || 'Error desconocido';
        return errorMessage
    }
}