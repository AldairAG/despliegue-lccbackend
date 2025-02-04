import { useCallback, useRef, useState } from "react";
import qr from "../../Assets/Images/qr/qrms.png"
import AlertMsj from "../AlertMsg/MensajeAlerta"
import { usePeticion } from "../../hooks/usePeticion";
import { generarOpciones } from "../../utils/helpers";
import { PETICION_TIPOS } from '../../constants/tiposPeticion'
import { errorResponse } from "../../helpers/erroresHelps";
import { changeStateLocal } from "../../utils/helpers";
import img1 from "../../Assets/flaticons/qrfi.png"
import img2 from "../../Assets/flaticons/copyfi.png"
import img3 from "../../Assets/flaticons/advertecniafi.png"

const PagoQr = ({paquete,close}) => {
    const alertRef=useRef()
    const { savePeticion} = usePeticion()

    const [state,setState]=useState({
        monto:0,
    })


    const handleCopy = useCallback((event) => {
        const inputId = event.target.name === 'wallet';
        const inputElement = document.getElementById(inputId);

        inputElement.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();

        alertRef.current.showAlert('Code copied successfully', true);
    }, []);

    const handleSavePeticion = async () => {
        const request={
            monto:state.monto,
            tipo:PETICION_TIPOS.STARTER_PACK,
        }
        const result = await savePeticion(request)

        if (result?.status && result?.status == 201) {
            close()
            alertRef.current.showAlert('Petition created successfully', true)
        } else {
            const error = errorResponse(result?.status || 400)
            alertRef.current.showAlert(error, false)
        }
    }

    return (
        <div className="modal-contentQr">
            <AlertMsj ref={alertRef} />
            <div className="payment">
                <p className="textoM3">Complete the payment</p>
                <img src={qr} alt="qr" />
                <div className="copyAddrs">
                    <p >Wallet address to pay</p>
                    <div className="wallet">
                        <input type="text" id="wallet" readOnly value="TMuMJUSBamBf1d2vhbd4g1p13pUf6N7TtM" />
                        <button onClick={handleCopy} ><i class="bi bi-copy"></i></button>
                    </div>
                </div>
                <div className="monto">
                    <p>Amount</p>
                    <div>
                        {paquete == 5 ? (
                            <input type="text" id="wallet"
                                value={state.monto}
                                onChange={(e) => changeStateLocal(setState,'monto', e.target.value)} />
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
                <button className="finish" onClick={handleSavePeticion}>Finish payment</button>
                <button className="close" onClick={close}><span>Close</span></button>
            </div>
            <div className="notasqr">
                <div><p className="textoM3">How to make a deposit?</p></div>
                <div className="nota">
                    <img src={img1} className="imgSec2-qr" alt="qric" />
                    <p>Scan the Qr code with your payment app</p>
                </div>
                <div className="or">
                    <p><i class="bi bi-dash"></i> or <i class="bi bi-dash"></i></p>
                </div>
                <div className="nota">
                    <img src={img2} className="imgSec2-qr" alt="qric" />
                    <p>Copy the USDT address and
                        amount to pay, then paste them
                        into your payment app
                    </p>
                </div>
                <div className="nota">
                    <img src={img3} className="imgSec2-qr" alt="qric" />
                    <p>Transfer only Tether USD TRC20
                        token (USDT). Transferring
                        other currency will result in the
                        toss of funds
                    </p>
                </div>
                <div className="nota">
                    <img src={img3} className="imgSec2-qr" alt="qric" />
                    <p>
                        Make sure to correctly send the transaction, verifying the exact amount and that the Wallet is correct.
                        Any sending error will result in the loss of funds.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PagoQr