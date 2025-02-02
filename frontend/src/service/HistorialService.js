import axios from "axios";
import { API_BASE } from "../utils/apiRoutes";

const historialApi = axios.create({
    baseURL: API_BASE.API_HISTORIAL
});

export const fetchHistorialByTipo = async (tipo,username) => {
    try {
        const response = await historialApi.get(`${API_BASE.API_HISTORIAL}/getByTipo/${tipo}/${username}`);
        return response
    } catch (error) {
        console.log(error);
        return []
    }
}
export const findHistorialAbonos= async(username)=>{
    try {
        const result=await historialApi.get(`${API_BASE.API_HISTORIAL}/getByAbono/${username}`);
        return result
    } catch (error) {
        console.log(error);
        return null
    }
}