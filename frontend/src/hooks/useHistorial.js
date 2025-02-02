import {fetchHistorialByTipo,findHistorialAbonos} from '../service/HistorialService'

export const useHistorial = () => {
    const getHistorialByTipo=async(tipo,username)=>{
            const result= await fetchHistorialByTipo(tipo,username)
            return result
    }

    const getHistorialAbono=async(username)=>{
        const result=await findHistorialAbonos(username) 
        if(result?.status && result?.status==200){
            return result?.data
        }

        return []
    }



    return {
        getHistorialByTipo,
        getHistorialAbono,
    }
}