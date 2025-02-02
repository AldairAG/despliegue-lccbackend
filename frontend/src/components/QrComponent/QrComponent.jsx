import "./QrComponent.css"
import React, { useState, useRef } from 'react';
import qr from "../../Assets/Images/qr/qrms.png"

import { usePeticion } from '../../hooks/usePeticion'
import { generarOpciones } from "../../utils/helpers";
import { PETICION_TIPOS } from '../../constants/tiposPeticion'




const QrComponent = ({ visible, openClose, op }) => {

    /* const { fillPeticion, savePeticion, newPeticion } = usePeticion()

    const [state, setState] = useState('')

    const alertRef = useRef()

    if (!visible) return

    const handleCopy = (event) => {
        let inputElement
        if (event.target.name == 'wallet') {
            inputElement = document.getElementById("wallet");
        } else {
            inputElement = document.getElementById("codeF");
        }

        inputElement.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        alertRef.current.showAlert("Code copied successfully", true)
    };

    const onOpenClose = () => {
        setState(null)
        openClose()
    }

    const handleSavePeticion = async () => {
        fillPeticion('tipo', PETICION_TIPOS.STARTER_PACK)
        const result = await savePeticion()
        if (result?.status && result?.status == 201) {
            alertRef.current.showAlert('factura creada correctamente', true)
        } else {
            const error = errorResponse(result?.status || 400)
            alertRef.current.showAlert(error, false)
            fillPeticion('code', '')
        }
    }

    const generarCodigo = async () => {
        if (state.opcion == "Seleccione una opción") {
            alertRef.current.showAlert("Invalid option", false)
            return
        }

        const code = generarCodigoFactura()
        fillPeticion('tipo', PETICION_TIPOS.PAGO_STARTER_PACK_FACTURA)
        fillPeticion('code', code)
        const result = await savePeticion()
        if (result?.status && result?.status == 201) {
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

    return (
        <section className='qrPago'>
            <AlertMsj ref={alertRef} />
            <div className="overlay"></div>
            <div className="modal-contentQr">

                {!state && (
                    <div className="selector">
                        <div className="titulo">
                            <img src={img4} alt="ic_pago" />
                            <p>Select a payment method</p>
                        </div>
                        <select value={state.opcionPago} onChange={(e) => setState(e.target.value)}>
                            {opcionesPago.map((opcion, index) => (
                                <option key={index} value={opcion}>
                                    {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {state === opcionesPago[1] && (
                    <>
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
                                    {op === 5 ? (
                                        <input type="text" id="wallet"
                                            value={state.opcion}
                                            onChange={(e) => fillPeticion('monto', e.target.value)} />
                                    ) : (
                                        <select className="select-box"
                                            value={state.opcion}
                                            onChange={(e) => fillPeticion('monto', e.target.value)} >
                                            {generarOpciones(op).map((item) => (
                                                <>
                                                    <option value={item}>{item}</option>
                                                </>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            </div>
                            <button className="finish" onClick={handleSavePeticion}>Finish payment</button>
                            <button className="close" onClick={onOpenClose}><span>Close</span></button>
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
                    </>
                )}

                {state === opcionesPago[2] && (
                    <>
                        <div className="payment">
                            <p className="textoM3">Complete the payment</p>
                            <div className="monto">
                                <p className="textoM2">1-. Select a quantity</p>
                                <div>
                                    {op === 5 ? (
                                        <input type="text" id="code" value={state.opcion}
                                            onChange={(e) => fillPeticion('monto', e.target.value)} />
                                    ) : (
                                        <select className="select-box"
                                            value={state.opcion}
                                            onChange={(e) => fillPeticion('monto', e.target.value)} >
                                            {generarOpciones(op).map((item) => (
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
                                    <input type="text" id="codeF" value={newPeticion.code} readOnly />
                                    <button onClick={handleCopy} ><i class="bi bi-copy"></i></button>
                                </div>
                            </div>
                            <button className="close" onClick={onOpenClose}><span>Close</span></button>
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
                    </>
                )}

            </div>
        </section >
    ) */
}

export default QrComponent