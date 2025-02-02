import { useSelector, useDispatch } from "react-redux";
import { fillNewPeticion, savePagosList, fillDestinatario } from '../store/slices/solicitudSlice'
import { createPeticion, transferenciaInterna } from "../service/userService";
import { fetchSolicitudesByTipos, fetchEnvoiceByCode, findUserByPeticionId, aprobarPeticion,
     denegarPeticion,PagarFacturasService,findRetiroPendiente } from '../service/peticionService'
import { fetchUserDestinatario } from '../service/userService'

export const usePeticion = () => {
    const dispatch = useDispatch();
    const { newPeticion, pagosList, retirosList, destinatario } = useSelector((state) => state.solicitud)
    const { userLogged } = useSelector((state) => state.user)

    const fillPeticion = (name, value) => {
        dispatch(fillNewPeticion({ name, value }));
    }
    const savePeticion = async (request) => {
        const result = await createPeticion(userLogged.id, request)
        return result
    }
    const fetchPeticionesBytipos = async (tipos) => {
        const result = await fetchSolicitudesByTipos(tipos)
        if (result?.data) {
            dispatch(savePagosList(result?.data))
            return
        }
        dispatch(savePagosList([]))
    }
    const getDestinatario = async () => {
        const result = await fetchUserDestinatario(newPeticion.code)
        dispatch(fillDestinatario(result?.data))
        return result
    }
    const transferir = async () => {
        const request = {
            emisor: userLogged.username,
            destinatario: newPeticion.code,
            monto: newPeticion.monto,
            tipo: newPeticion.tipo
        }
        const result = await transferenciaInterna(request)
        return result.status
    }
    const getDestinatarioById = async (id) => {
        const result = await findUserByPeticionId(id)
        return result
    }
    const getFactura = async (code) => {
        const result = await fetchEnvoiceByCode(code)
        return result
    }
    const aprobar = async (id) => {
        const result = await aprobarPeticion(id)
        console.log(result);
        
        return result?.status || 400
    }
    const denegar = async (id) => {
        const result = await denegarPeticion(id)
        return result?.status || 400
    }
    const pagarFactura=async(id,body)=>{
        const result = await PagarFacturasService(id,body)
        return result
    }
    const getRetiroPendiente=async()=>{
        const result = await findRetiroPendiente(userLogged?.username)
        if(result?.status && result?.status==200)return result?.data
        else return null
    }

    return {
        newPeticion,
        pagosList,
        retirosList,
        destinatario,
        fillPeticion,
        savePeticion,
        getDestinatario,
        fetchPeticionesBytipos,
        transferir,
        getFactura,
        getDestinatarioById,
        aprobar,
        denegar,
        pagarFactura,
        getRetiroPendiente,
    }
}