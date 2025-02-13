import "./QR.css"
import React, { useRef, useState } from 'react';
import qr from "../../Assets/Images/qr/qrecc.png"
import img1 from "../../Assets/flaticons/qrfi.png"
import img2 from "../../Assets/flaticons/copyfi.png"
import img3 from "../../Assets/flaticons/advertecniafi.png"
import MensajeAlerta from "../../components/AlertMsg/MensajeAlerta";
import { useEcomerce } from "../../hooks/useEcomerce";


const QrComponent = ({ opc }) => {
    const [visible, setVisible] = useState(false)
    const { carrito } = useEcomerce()
    const alertRef=useRef()

    const openClose = () => {
        setVisible(!visible)
    }
    const handleCopy = () => {
        const inputElement = document.getElementById("wallet");
        inputElement.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
    };

    const setRequestHandle = () => {
    }

    const validaciones = () => {
        const mostrarAlert=(mensaje)=>{
            alertRef.current.showAlert(mensaje,false)
            return false
        }
        //validar direccion no vacia
        //setTxt("You do not have any registered address")

        if(carrito.products.length===0)
            return mostrarAlert("You don't have any products")

        return true
    }

    const realizarCompra = async () => {
        if(!validaciones()) return

        if (opc == 4) {
            openClose()
        } else {
            //setTxt("Your order was created successfully")
        }
    }

    return (
        <section className="compQR-main">
            <MensajeAlerta ref={alertRef}/>
            <button onClick={realizarCompra}>Pay</button>
            {visible && (
                <section className={visible ? 'compQR' : 'none'}>
                    <div className="modal-content">
                        <div className="sec1-qr">
                            <div className="s1-qr">
                                <p className="textoM3">Direct payment</p>
                            </div>
                            <div className="s2-qr">
                                <img src={qr} alt="qr" />
                            </div>
                            <div className="s3-qr">
                                <p >Wallet address to pay</p>
                                <div className="walletInput">
                                    <input type="text" id="wallet" readOnly value="TFDno1XUsT8RBiSsu4Mj2AxhmPwC4mvHuN" />
                                    <button onClick={handleCopy} ><i class="bi bi-copy"></i></button>
                                </div>
                            </div>
                            <div className="s4-qr">
                                <p>Amount</p>
                                <input type="text" id="wallet" readOnly value={carrito.total.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.') + " USDT"} />
                            </div>
                            <div className="s5-qr">
                                <button className="boton3" onClick={openClose}><span>Close</span></button>
                                <button className="boton2" onClick={setRequestHandle}>Finish payment</button>
                            </div>
                            <div className="s11-qr">
                                <p>Press the button "Finish payment" to complete the request</p>
                            </div>
                        </div>
                        <div className="sec2-qr">
                            <div className="s6-qr"><p className="textoM3">How to make a deposit?</p></div>
                            <div className="s7-qr">
                                <img src={img1} className="imgSec2-qr" alt="qric" />
                                <p>Scan the Qr code with your payment app</p>
                            </div>
                            <div className="s8-qr">
                                <img src={img2} className="imgSec2-qr" alt="qric" />
                                <p>Copy the USDT address and
                                    amount to pay, then paste them
                                    into your payment app
                                </p>
                            </div>
                            <div className="s9-qr">
                                <img src={img3} className="imgSec2-qr" alt="qric" />
                                <p>Transfer only Tether USD TRC20
                                    token (USDT). Transferring
                                    other currency will result in the
                                    toss of funds
                                </p>
                            </div>
                            <div className="s10-qr">
                                <img src={img3} className="imgSec2-qr" alt="qric" />
                                <p>
                                    Make sure to correctly send the transaction, verifying the exact amount and that the Wallet is correct.
                                    Any sending error will result in the loss of funds.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )
            }
        </section >
    )
}
export default QrComponent