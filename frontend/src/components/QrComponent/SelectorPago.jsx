import { useState, useImperativeHandle, forwardRef } from "react"
import "./QrComponent.css"
import img4 from ".././../Assets/Images/Baners_jpg/pagometodo.png"
import PagoQr from "./PagoQr"
import PagoFactura from "./PagoFactura"

const opcionesPago = ["---", "USDT Transfer", "Pay by invoice/USDT"]

const SelectorPago = forwardRef(({ }, ref) => {
    const [state, setState] = useState({
        opcionPago: '---',
        visible: false,
        paquete: 1,
    })

    useImperativeHandle(ref, () => ({
        show(paquete) {

            setState((prev) => ({
                ...prev,
                ['visible']: true,
                ['paquete']: paquete
            }))
        }
    }));

    const close=()=>{
        setState((prev) => ({
            ...prev,
            ['visible']: false,
            ['paquete']: 1,
            ['opcionPago']: "---"
        }))
    }

    return (
        state.visible && (
            <section className='qrPago'>
                <div className="overlay" />

                {state.opcionPago == opcionesPago[0] && (
                    <div className="modal-contentQr ">
                        <div className="selector">
                            <div className="titulo">
                                <img src={img4} alt="ic_pago" />
                                <p>Select a payment method</p>
                            </div>
                            <select value={state.opcionPago} onChange={(e) =>setState((prev) => ({...prev,['opcionPago']: e.target.value}))}>
                                {opcionesPago.map((opcion, index) => (
                                    <option key={index} value={opcion}>
                                        {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {state.opcionPago == opcionesPago[1] && (
                    <PagoQr paquete={state.paquete} close={close}/>
                )}

                {state.opcionPago == opcionesPago[2] && (
                    <PagoFactura paquete={state.paquete} close={close}/>
                )}
            </section>
        )
    )
})

export default SelectorPago