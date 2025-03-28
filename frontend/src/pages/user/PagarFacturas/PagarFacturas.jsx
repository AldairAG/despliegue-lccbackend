import logoUSDT from "../../../Assets/Images/Logos/usdt.png";
import "./PagarFacturas.css";
import TextInput from "../../../components/TextInput/TextField";
import { useState, useRef, useEffect } from "react";
import img1 from "../../../Assets/Images/qr/qrms.png"
import { useUser } from "../../../hooks/useUser";
import MensajeAlerta from "../../../components/AlertMsg/MensajeAlerta";
import { Historial as HistorialTable } from "../../../components/tablas/Historial";
import { ItemPagoFactura } from "../../../components/tablas/items/ItemPagoFactura";
import InputNip from "../../../components/NipModal/InputNip";
import { changeStateLocal } from '../../../utils/helpers'
import { usePeticion } from "../../../hooks/usePeticion";
import { errorResponse } from "../../../helpers/erroresHelps";
import { calcularPaquete } from "../../../helpers/cardUserHelper";
import { PERMISOS } from "../../../utils/permisos";
import { validarPermiso } from "../../../helpers/permisoHelper";

const PagarFacturas = () => {
    const [state, setState] = useState({
        code: '',
        seleccionado: 1,
        visibleModal: false,
        factura: {
            code: "",
            fecha: "",
            hora: "",
            monto: 0,
            peticion_id: 0,
            tipo: "stppf",
        },
        propietario: {
            apellidos: "",
            email: "",
            nombres: "",
            username: ""
        },
        loading: true
    })
    const alertRef = useRef(null)
    const nipRef = useRef(null)
    const { userLogged,tryLogin } = useUser()
    const { getFactura, getDestinatarioById, pagarFactura } = usePeticion()
    const [historial, setHistorial] = useState(null)

    const handlePagarFactura = async () => {
        const wallet = state.seleccionado == 1 ? userLogged.wallet.wallet_div :
            (state.seleccionado == 2 ? userLogged.wallet.wallet_com : userLogged.wallet.wallet_deuda)

        if (!validacion(wallet)) return

        const request = {
            monto: state.factura.monto / 2,
            wallet: state.seleccionado == 1 ? 'div' : (state.seleccionado == 2 ? 'com' : 'deuda'),
            usernameBeneficiario: state.propietario.username,
            usernameBenefactor: userLogged.username,
        }

        const result = await pagarFactura(state.factura.peticion_id, request)

        if (result?.status && result?.status == 200) {
            alertRef.current.showAlert('Invoice paid correctly', true)
            nipRef?.current?.show()

                changeStateLocal(setState,'visibleModal', false)
                await tryLogin()
        } else {
            alertRef.current.
                showAlert(errorResponse(result?.status || 400, 'factura'), false)
        }
    }

    const changeState = (name, value) => {
        setState(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const validacion = (wallet) => {
        const errores = {
            codeNotFound: "Code not found",
            insufficientBalance: "You do not have enough balance to withdraw this amount",
            minBalanceAfterWithdraw: "After withdrawing you need to have at least 25 USDT remaining",
            permisoBloqueado: "You do not have permissions to perform this action",
        }
        const mostrarError = (mensaje) => {
            alertRef.current.showAlert(mensaje, false)
            return false;
        };

        if (state.code == "" || !state.code) {
            return mostrarError(errores.codeNotFound)
        }
        if (wallet <= 0) {
            return mostrarError(errores.insufficientBalance)
        }
        if (wallet < state.factura.monto * .5) {
            return mostrarError(errores.insufficientBalance)
        }
        if (state.seleccionado == 1 && Number(wallet - state.factura.monto * .5) < 25) {
            return mostrarError(errores.minBalanceAfterWithdraw)
        }
        if (state.seleccionado == 1 && validarPermiso(userLogged.wallet.permisos, PERMISOS.FACTURAR_DIV)) {
            return mostrarError(errores.permisoBloqueado)
        }
        return true
    }

    const handleCopy = () => {
        const inputElement = document.getElementById("wallet");
        inputElement.select();
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        alertRef.current.showAlert("Address copied successfully", true)
    };

    const fetchHisotrial = async () => {

    }

    const encontrarFactura = async () => {
        if (!validacion()) return

        const result = await getFactura(state.code)
        const destinatario = await getDestinatarioById(result?.data?.peticion_id)||null

        if (!result?.status || result?.status != 200) {

            alertRef.current.
                showAlert(errorResponse(result?.status || 400, 'factura'), false)
            return
        }
        if (!destinatario?.status && destinatario?.status != 200) {
            alertRef.current.
                showAlert(errorResponse(result?.status || 400, 'factura'), false)
            return
        }

        changeState('propietario', destinatario?.data)
        changeState('factura', result?.data)
        changeState('loading', false)
        changeState('visibleModal', true)

    }

    return (
        <section className="PagarFacturas contenido">
            <MensajeAlerta ref={alertRef} />
            <InputNip ref={nipRef} proceso={handlePagarFactura} />
            {state.visibleModal && (
                confirmarTransaccionModal()
            )}
            <section className="titulos titulo-pf">
                <i class="bi bi-receipt"></i>
                <span>Facturas</span>
            </section>
            <section className="contenido-pf">
                <section className="transaccion-area-pf">
                    <section className="inputArea">
                        <p className="titulo">Select your wallet</p>
                        <div className="wallets">
                            {WalletOpcion("Dividend wallet", userLogged?.wallet.wallet_div, 1)}
                            {WalletOpcion("Comission wallet", userLogged?.wallet.wallet_com, 2)}
                            {validarPermiso(userLogged.wallet.permisos,PERMISOS.DEUDA) && (
                                WalletOpcion("Corporate credit", userLogged?.wallet.deuda.wallet_deuda, 3)
                            )}
                        </div>
                        <TextInput ti={"Billing code"}
                            value={state.code}
                            name={'code'}
                            changeState={changeState}
                            pl={'Code here'} />
                        <button className="boton4" onClick={encontrarFactura}><span>Find invoice</span></button>
                    </section>
                    <section className="notas-pf">
                        <p className="titulo">How to pay the remaining 50%?</p>
                        <h4 className="textoM">Scan the QR code to pay or copy the wallet address into your preferred application.</h4>
                        <div className="copyAddrs">
                            <h4 >Wallet address:</h4>
                            <div className="wallet">
                                <input type="text" id="wallet" readOnly value="TMuMJUSBamBf1d2vhbd4g1p13pUf6N7TtM" />
                                <button onClick={handleCopy} ><i class="bi bi-copy"></i></button>
                            </div>
                            <div className="or">
                                <div className="line" />
                                <h4>Or</h4>
                                <div className="line" />
                            </div>
                            <div className="qr">
                                <h4>Qr code:</h4>
                                <img src={img1} alt="QR code" />
                            </div>
                        </div>
                    </section>
                </section>

                <HistorialTable historial={historial} fetchHistory={fetchHisotrial}>
                    {(item) => (
                        <tr>
                            <ItemPagoFactura item={item} />
                        </tr>
                    )}
                </HistorialTable>

            </section>
        </section >
    )

    function WalletOpcion(titulo, wallet, opc) {
        return (
            <div onClick={() => changeStateLocal(setState, 'seleccionado', opc)}
                className={state.seleccionado == opc ?
                    "seleccionado walletOpcion" : "walletOpcion"}>
                <h3>{titulo}</h3>
                <div>
                    <img src={logoUSDT} alt="usdt_logo" />
                    <span>
                        {(wallet || 0).
                            toLocaleString('de-DE',
                                { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                            .replace(',', '.')}
                    </span>
                </div>
            </div>
        )
    }

    function confirmarTransaccionModal() {

        const openNipModal = () => {
            nipRef?.current?.show()
            changeStateLocal(setState, 'visibleModal', false)
        }

        return (
            <section className="confirmarTransaccionModal">
                <div className="overlay"></div>
                <section className="confirmarTransaccion-contenido">
                    <header>
                        <h1>Transaction details</h1>
                        <button onClick={() => changeStateLocal(setState, 'visibleModal', false)}><i class="bi bi-x"></i></button>
                    </header>
                    <div className=" ">
                        <div className="titulo"><i class="bi bi-person"></i><span>Recipient user</span></div>

                        {state.loading ? <div className="spinner" /> :
                            <>
                                <h5>Username: <span>{state.propietario.username}</span></h5>
                                <h5>Name: <span>{state.propietario.nombres}</span></h5>
                                <h5>Last name: <span>{state.propietario.apellidos}</span></h5>
                                <h5>email: <span>{state.propietario.email}</span></h5>
                            </>}

                    </div>
                    <div className="datosDeTranferencia">
                        <div className="titulo"><i class="bi bi-coin"></i><span>Invoice details</span></div>
                        <h5>Selected wallet: <span>{state.seleccionado == 1 ? ("Dividend") : state.seleccionado == 2 ? ("Commision") : ('Corporate credit')}</span></h5>
                        <h5>Starter pack: <span>{calcularPaquete(state.factura.monto)}</span></h5>
                        <h5>Maximun to pay: <span>{(state.factura.monto / 2

                        ).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.') || "0.00"} USDT</span></h5>
                        <h5>Total amount: <span>{(state.factura.monto).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.') || "0.00"} USDT</span></h5>
                        <button onClick={openNipModal}><i class="bi bi-send"></i>Pay</button>
                    </div>
                </section>
            </section>
        )
    }
}



export default PagarFacturas