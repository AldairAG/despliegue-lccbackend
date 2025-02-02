import { useEffect, useRef, useState } from "react";
import { usePeticion } from "../../../hooks/usePeticion";
import { PETICION_TIPOS } from '../../../constants/tiposPeticion'
import { formatearTipoPeticionAdmin } from "../../../helpers/helpers";
import { errorResponse } from '../../../helpers/erroresHelps'
import MensajeAlerta from '../../../components/AlertMsg/MensajeAlerta'

const tipos = [PETICION_TIPOS.PAGO_MENSUALIDAD, PETICION_TIPOS.PAGO_STARTER_PACK_FACTURA,
PETICION_TIPOS.STARTER_PACK]
const AprobarPagos = () => {
    const { pagosList, fetchPeticionesBytipos, aprobar, denegar } = usePeticion()
    const [loading, setLoading] = useState(true)
    const alertRef=useRef()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        await fetchPeticionesBytipos(tipos)
        setLoading(false)
    }

    const HandleAprobar = async (aprobado, peticion) => {
        if (aprobado) {
            manejoErrores(await aprobar(peticion.peticion_id))
        } else {
            manejoErrores(await denegar(peticion.peticion_id))
        }
    }

    const manejoErrores = async (status) => {
        console.log(status);
        
        const error=errorResponse(400)
        if(status==200){
            alertRef.current.showAlert('Operacion realizada con exito',true)
            await fetchData()
        }else{
            alertRef.current.showAlert(error,false)
        }
    }

    return (
        <>
            <div className="tabla">
                <MensajeAlerta ref={alertRef}/>
                <div className="encabezado">
                    <h2>Pagos pendiente</h2>
                    <div className="buscador">
                        {/*<input type="text" placeholder="Buscar por E-mail..." onChange={(e) => setTextFind(e.target.value)} />
                        <button onClick={() => adminData.findData(textFind)}><i class="bi bi-search"></i></button>*/}
                    </div>
                    <button onClick={() => fetchData()} className="refresh" ><i class="bi bi-arrow-counterclockwise"></i></button>
                </div>
                <li>
                    <span className="column-header">Nombre de usuario</span>
                    <span className="column-header">E-mail</span>
                    <span className="column-header">Cantidad</span>
                    <span className="column-header">Concepto</span>
                    <span className="column-header">Aprobar</span>
                </li>
                <div className="datos">
                    <ul>
                        {loading ? (
                            <div className="spinner"></div>
                        ) : (
                            pagosList.map((item, index) => (
                                <li key={index}>
                                    <span>{item.username}</span>
                                    <span>{item.email}</span>
                                    <span>{item.monto}</span>
                                    <span>{formatearTipoPeticionAdmin(item.tipo)}</span>
                                    <div className="aprobar">
                                        <button onClick={() => HandleAprobar(true, item)} className="check">
                                            <i class="bi bi-check-circle-fill" />
                                        </button>
                                        <button onClick={() => HandleAprobar(false, item)} className="trash">
                                            <i class="bi bi-x-circle-fill" />
                                        </button>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AprobarPagos