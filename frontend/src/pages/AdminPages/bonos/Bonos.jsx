import './Bonos.css'
import { ejecutarBono } from '../../../service/bonoService'
import { useRef, useState } from 'react'
import MensajeAlerta from '../../../components/AlertMsg/MensajeAlerta'
const rutas =
{
    mb: "mb",
    bm: "bm",
    cm: "cm",
    brs: "brs",
    dd: "dd",
    ic: "ic",
}


const Bonos = () => {
    const alertRef = useRef()
    const [loading,setLoading ] = useState(false)

    const handleEjecutarBono = async (ruta) => {
        const result = await ejecutarBono(ruta)
        setLoading(true)
        if(result?.status==200 || result?.status==204){
            alertRef.current.showAlert('Operacion realizada con exito',true)
        }else{
            alertRef.current.showAlert(result,false)
        }
        setLoading(false)

    }

    return (
        <div className="bonos">
            <MensajeAlerta ref={alertRef} />
            {loading && (
                <div className='spinner'></div>
            )}
            <button onClick={()=>handleEjecutarBono(rutas.mb)}>Matching</button>
            <button onClick={()=>handleEjecutarBono(rutas.cm)}>Cobrar mensualidad</button>
            <button onClick={()=>handleEjecutarBono(rutas.brs)}>Bono rango residual</button>
            <button onClick={()=>handleEjecutarBono(rutas.dd)}>Dividendo diario</button>
            <button onClick={()=>handleEjecutarBono(rutas.ic)}>Ejecutar interes compuesto</button>
        </div>
    )
}

export default Bonos