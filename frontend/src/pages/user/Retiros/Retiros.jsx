import logoUSDT from "../../../Assets/Images/Logos/usdt.png";
import "./Retiros.css";
import TextInput from "../../../components/TextInput/TextField";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import AlertMsj from "../../../components/AlertMsg/MensajeAlerta";
import NipModal from '../../../components/NipModal/InputNip'
import { useUser } from "../../../hooks/useUser";
import { usePeticion } from "../../../hooks/usePeticion";
import { PETICION_TIPOS } from '../../../constants/tiposPeticion'
import { errorResponse } from '../../../helpers/erroresHelps'
import { validarPermiso } from "../../../helpers/permisoHelper";
import { PERMISOS } from "../../../utils/permisos";
import { getFechaHora } from "../../../utils/helpers";

const Retiros = () => {
  const { userLogged, tryLogin } = useUser()
  const { savePeticion, getRetiroPendiente } = usePeticion()
  const alertRef = useRef()
  const nipRef = useRef()

  const [state, setState] = useState({
    isLoading: true,
    isLoadingRP: true,
    seleccionado: 1,
    retiroActivo: false,
    botonDisabled: false,
    monto: 0,
  })
  const [historial, setHistorial] = useState([]);
  const [retiroPendiente, setRetiroPendiente] = useState(null)

  useEffect(() => {
    fetchRetiroPendiente()
  }, [])

  const fetchRetiroPendiente = async () => {
    const result = await getRetiroPendiente()
    setRetiroPendiente(result)
    changeState('isLoadingRP', false)
  }

  const changeState = (name, value) => {
    setState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validacion = () => {
    const retiroMinimo = state.seleccionado == 1 ? 50 : 10
    const wallet = state.seleccionado == 1 ? userLogged.wallet_div : userLogged.wallet_com
    const errores = {
      invalidValue: "The value you entered is not valid",
      noWallet: "You have not yet registered your USDT wallet",
      completeProfile: "Complete your profile to be able to withdraw",
      insufficientBalance: "You do not have enough balance to withdraw this amount",
      minWithdrawal: `The minimum withdrawal amount is ${retiroMinimo} USDT`,
      minBalanceAfterWithdraw: "After withdrawing you need to have at least 25 USDT remaining",
      retiroActivo: "you already have a pending withdrawal",
      permisoBloqueado: "You do not have permissions to perform this action"
    };

    const mostrarError = (mensaje) => {
      alertRef.current.showAlert(mensaje, false)
      return false;
    };

    if (state.seleccionado == 1 && validarPermiso(userLogged.wallet.permisos, PERMISOS.RETIRAR_DIVIDENDO)) {
      return mostrarError(errores.permisoBloqueado)
    }

    if (state.seleccionado == 2 && validarPermiso(userLogged.wallet.permisos, PERMISOS.RETIRAR_COMISION)) {
      return mostrarError(errores.permisoBloqueado)
    }

    if (retiroPendiente) {
      return mostrarError(errores.retiroActivo)
    }
    
    if (isNaN(parseFloat(state.monto)) || hasMoreThanTwoDecimals(state.monto)) {
      return mostrarError(errores.invalidValue);
    }

    /*if (!userLogged.usdtAddress) {
          return mostrarError(errores.noWallet);
        } */

    /*     if (!userLogged.phoneNumber || !userLogged.firstName || !userLogged.lastName) {
          return mostrarError(errores.completeProfile);
        } */

    if (state.monto > wallet) {
      return mostrarError(errores.insufficientBalance);
    }

    if (state.monto < retiroMinimo) {
      return mostrarError(errores.minWithdrawal);
    }

    if (state.seleccionado == 1 && userLogged.wallet_div - state.monto < 25) {
      return mostrarError(errores.minBalanceAfterWithdraw);
    }

    // Si todas las validaciones pasan
    return true;
  }

  function hasMoreThanTwoDecimals(num) {
    const str = num.toString();
    const decimalIndex = str.indexOf(".");
    return decimalIndex !== -1 && str.slice(decimalIndex + 1).length > 2;
  };

  const openCloseNipModal = () => {
    if (!validacion()) return

    nipRef.current.show()
  };

  const solicitarRetiro = async () => {
    const request = {
      code: userLogged.wallet.wallet_address,
      monto: state.monto,
      tipo: state.seleccionado == 1 ?
        PETICION_TIPOS.RETIRO_WALLET_DIVIDENDO : PETICION_TIPOS.RETIRO_WALLET_COMISION
    }

    const result = await savePeticion(request)

    if (result?.status && result?.status == 201) {
      await tryLogin()

      const { fecha, hora } = getFechaHora();
      request.hora = hora
      request.fecha = fecha
      setRetiroPendiente(request)

      alertRef.current.showAlert('Solicitud de retiro creada', true)
      nipRef.current.show()

    } else {
      const error = errorResponse(result?.status || 400)
      alertRef.current.showAlert(error, false)
    }

  }

  return (
    <section className="contenido Retiros">
      <AlertMsj ref={alertRef} />
      <NipModal ref={nipRef} proceso={solicitarRetiro} />
      <section className="titulos titulo-re">
        <i className="bi bi-person-gear"></i>
        <span>Retiros</span>
      </section>

      <section className="contenido-re">
        <section className="retirar">
          <p className="titulo">Select your wallet</p>
          <div className="wallets">
            {WalletOpcion("Divident wallet", userLogged.wallet.wallet_div, 1)}
            {WalletOpcion("Comission wallet", userLogged.wallet.wallet_com, 2)}
          </div>
          <TextInput ti={"Wallet address"} value={userLogged.usdtAddress} pl={''} block={false} changeState={() => { }} />
          <TextInput ti={"Amount to withdraw(USDT)"}
            value={state.monto}
            changeState={changeState}
            name={'monto'} pl={0} />

          <button disabled={state.botonDisabled} className="boton4" onClick={openCloseNipModal}><span>Request withdrawal</span></button>
        </section>

        <section className="notas">
          <p className="textoM2">Important notes:</p>
          <p className="textoM"><li>You need to have your USDT(TRC20) wallet address registered. If you don't have it yet,<Link to="Profile" className="link"> click here</Link></li></p>
          <p className="textoM"><li>Withdrawal requests: minimum amount of 50 USDT required for the <span>dividend wallet</span> and minimum amount of 10 USDT required for <span>commission wallet</span>.</li></p>
          <p className="textoM"><li>All requests will be approved only <span>Monday through Friday</span> starting at 12:00 a.m. (Miami time).</li></p>
          <p className="textoM"><li>Withdrawal <span>cost of 3% </span>for the total amount requested (Administrative expenses).</li></p>
          <p className="textoM"><li>When a withdrawal is requested the dividend wallet <span>must have at least 25 USDT</span>.</li></p>
        </section>
      </section>

      <section className="historial">
        <div className="titulo">
          <h2><i class="bi bi-clock-history"></i> Pending withdrawals</h2>
        </div>

        <table>
          <tbody>
            {state.isLoadingRP ? (
              <div className="spinner"></div>
            ) : (
              retiroPendiente ? (
                <tr>
                  <td >{retiroPendiente.fecha}</td>
                  <td >{retiroPendiente.hora}</td>
                  <td><span>{retiroPendiente.monto} USDT</span></td>
                  <td className="e"><i class="bi bi-hourglass-split"></i> Pending</td>
                  <td >{retiroPendiente.tipo == 'rwd' ? "Dividend wallet" : "Comission wallet"}</td>
                </tr>
              ) : (
                <tr>
                  <p className="aviso">You have no pending withdrawals</p>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>

      <section className="historial">
        <div className="titulo">
          <h2><i class="bi bi-clock-history"></i> History</h2>
        </div>

        <table>
          <tbody>
            {state.isLoading ? (
              <div className="spinner"></div>
            ) : (
              historial.length > 0 ? (
                historial.map((item) => (
                  <tr>
                    <td >{item.date}</td>
                    <td >{item.hora}</td>
                    <td><span>{item.cantidad} USDT</span></td>
                    <td className={item.state == 1 ? "r" : "acept"}>{item.state == 1 ? <span><i class="bi bi-x-circle"></i> Denied</span> : <span><i class="bi bi-check2-circle"></i>  Approved</span>}</td>
                    <td >{item.emisor}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <p className="aviso">You have not yet made a withdrawal</p>
                </tr>
              )
            )}
          </tbody>
        </table>
      </section>
    </section >
  )

  function WalletOpcion(titulo, wallet, opc) {
    return (
      <div onClick={() => changeState('seleccionado', opc)} className={state.seleccionado == opc ? "seleccionado walletOpcion" : "walletOpcion"}>
        <h3>{titulo}</h3>
        <div>
          <img src={logoUSDT} alt="usdt_logo" />
          <span>{(wallet || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')}</span>
        </div>
      </div>
    )
  }

}

export default Retiros