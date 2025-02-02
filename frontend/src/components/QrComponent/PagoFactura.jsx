import { useCallback, useRef, useState } from "react"
import { usePeticion } from "../../hooks/usePeticion"
import { generarOpciones } from "../../utils/helpers";
import { PETICION_TIPOS } from '../../constants/tiposPeticion'
import { errorResponse } from "../../helpers/erroresHelps";
import { changeStateLocal } from "../../utils/helpers";
import AlertMsj from "../AlertMsg/MensajeAlerta"
import img1 from "../../Assets/flaticons/qrfi.png"
import img2 from "../../Assets/flaticons/copyfi.png"
import img3 from "../../Assets/flaticons/advertecniafi.png"

const nota3 = {
    intruccion1: "1- select an amount and generate your payment code",
    instruccion2: "2- Copy the code so that someone else can pay for the package",
    advertencia1: "The maximum amount that can be paid through this method corresponds to 50%",
    advertencia2: "The remaining amount must be paid via USDT transfer (TRC20)"
}

const PagoFactura = ({ paquete, close }) => {
    const { fillPeticion, savePeticion, newPeticion } = usePeticion()
    const [state, setState] = useState({
        monto: 0,
        code:'',
    })
    const alertRef = useRef()

    const generarCodigo = async () => {
        if (state.monto == 0) {
            alertRef.current.showAlert("Invalid option", false)
            return
        }

        const code = generarCodigoFactura()

        const request={
            tipo:PETICION_TIPOS.PAGO_FACTURA,
            code:code,
            monto:state.monto,
        }

        const result = await savePeticion(request)
        if (result?.status && result?.status == 201) {
            changeStateLocal(setState,'code',code)
            alertRef.current.showAlert('factura creada correctamente', true)
        } else {
            const error = errorResponse(result?.status || 400)
            alertRef.current.showAlert(error, false)
            fillPeticion('code', '')
        }
    }

    const generarCodigoFactura = () => {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000000);
        return `FAC-${timestamp}-${random}`;
    }

    const handleCopy = useCallback((event) => {
        const inputId = 'code';
        const inputElement = document.getElementById(inputId);

        inputElement.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();

        alertRef.current.showAlert('Code copied successfully', true);
    }, []);

    return (
        <div className="modal-contentQr ">
            <AlertMsj ref={alertRef} />
            <div className="payment">
                <p className="textoM3">Complete the payment</p>
                <div className="monto">
                    <p className="textoM2">1-. Select a quantity</p>
                    <div>
                        {paquete == 5 ? (
                            <input type="text" id="code" value={state.monto}
                                onChange={(e) => changeStateLocal(setState,'monto', e.target.value)} placeholder="0" />
                        ) : (
                            <select className="select-box"
                                value={state.monto}
                                onChange={(e) => changeStateLocal(setState,'monto', e.target.value)} >
                                {generarOpciones(paquete).map((item) => (
                                    <>
                                        <option value={item}>{item}</option>
                                    </>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
                <button className="finish" onClick={generarCodigo}>Generate code</button>
                <div className="copyAddrs">
                    <p className="textoM2">2-. Copy your code</p>
                    <div className="wallet">
                        <input type="text" id="code" value={state.code} readOnly />
                        <button onClick={handleCopy} ><i class="bi bi-copy"></i></button>
                    </div>
                </div>
                <button className="close" onClick={close}><span>Close</span></button>
            </div>
            <div className="notasqr">
                <div><p className="textoM3">How to make a payment by invoice?</p></div>
                <div className="nota">
                    <img src={img1} className="imgSec2-qr" alt="qric" />
                    <p>{nota3.intruccion1}</p>
                </div>
                <div className="nota">
                    <img src={img2} className="imgSec2-qr" alt="qric" />
                    <p>{nota3.instruccion2} </p>
                </div>
                <div className="nota">
                    <img src={img3} className="imgSec2-qr" alt="qric" />
                    <p>{nota3.advertencia1} </p>
                </div>
                <div className="nota">
                    <img src={img3} className="imgSec2-qr" alt="qric" />
                    <p>{nota3.advertencia2} </p>
                </div>
            </div>
        </div>
    )
}

export default PagoFactura