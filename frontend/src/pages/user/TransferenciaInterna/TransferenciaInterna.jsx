import logoUSDT from "../../../Assets/Images/Logos/usdt.png";
import "./TransferenciaInterna.css";
import TextField from "../../../components/TextInput/TextField";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import Alert from "../../../components/AlertMsg/MensajeAlerta";
import InputNip from "../../../components/NipModal/InputNip";
import { useUser } from "../../../hooks/useUser";
import { usePeticion } from "../../../hooks/usePeticion";
import { Historial as HistorialTable } from "../../../components/tablas/Historial";
import { ItemInternalTransfer } from "../../../components/tablas/items";
import { changeStateLocal } from "../../../utils/helpers";
import { errorResponse } from '../../../helpers/erroresHelps'
import { MENSAJES_ALERT } from '../../../constants/mensajes'
import { PETICION_TIPOS } from '../../../constants/tiposPeticion'

const TransferenciaInterna = () => {
  const { userLogged, tryLogin } = useUser()
  const { newPeticion, fillPeticion, getDestinatario, destinatario, transferir } = usePeticion()
  const alertRef = useRef()
  const nipRef = useRef()
  const [state, setState] = useState({
    seleccionado: 1,
    visibleConfirmarTransModal: false,
    loading: true,
  })
  const [historial, setHistorial] = useState(null)

  const hasMoreThanTwoDecimals = (num) => {
    const str = num.toString();
    const decimalIndex = str.indexOf(".");
    return decimalIndex !== -1 && str.slice(decimalIndex + 1).length > 2;
  };

  const validacion = () => {
    const wallet = state.seleccionado == 1 ?
      userLogged.wallet.wallet_div : userLogged.wallet.wallet_com
    const trasnferenciaMinima = state.seleccionado == 1 ? 50 : 10

    const errores = {
      invalidValue: "The value you entered is not valid",
      notUser: "The user does not exist",
      completeProfile: "Complete your profile to be able to withdraw",
      insufficientBalance: "You do not have enough balance to withdraw this amount",
      minWithdrawal: `The minimum withdrawal amount is ${trasnferenciaMinima} USDT`,
      minBalanceAfterWithdraw: "After withdrawing you need to have at least 25 USDT remaining",
      retiroActivo: "You already have a pending withdrawal",
    };

    const mostrarError = (mensaje) => {
      alertRef.current.showAlert(mensaje, false)
      return false;
    };

    if (isNaN(parseFloat(newPeticion.monto)) || hasMoreThanTwoDecimals(newPeticion.monto)) {
      return mostrarError(errores.invalidValue);
    }
    if (newPeticion.monto > wallet) {
      return mostrarError(errores.insufficientBalance);
    }

    if (newPeticion.monto < trasnferenciaMinima) {
      return mostrarError(errores.minWithdrawal);
    }

    if (state.seleccionado === 1 && userLogged.wallet_div - newPeticion.monto < 25) {
      return mostrarError(errores.minBalanceAfterWithdraw);
    }

    if (!newPeticion.code) {
      return mostrarError(errores.invalidValue);
    }

    return true;
  }

  const comenzarProceso = async () => {
    if (validacion()) {
      const result = await getDestinatario()
      if (result?.status && result?.status == 200) {
        changeStateLocal(setState, "visibleConfirmarTransModal", true)
        changeStateLocal(setState, 'loading', false)
      } else {
        alertRef.current.showAlert(errorResponse(result?.status || 400), false)
      }
    }
  };

  const handleTransferir = async () => {
    fillPeticion("tipo",state.seleccionado==1?
      PETICION_TIPOS.TRANSFERENCIA_INTERNA_WALLET_DIV:
      PETICION_TIPOS.TRANSFERENCIA_INTERNA_WALLET_COM
    )
    const result = await transferir()
    
    if (result && result == 200) {
      await tryLogin()
      nipRef.current.show()
      alertRef.current.showAlert(MENSAJES_ALERT.TI_EXITO, true)
    } else {
      alertRef.current.showAlert(errorResponse(400), false)
    }
  }

  const fetchHisotrial = async () => {

  }

  return (
    <section className="contenido contenedor-main-ts">
      {state.visibleConfirmarTransModal && (
        confirmarTransaccionModal()
      )}
      <Alert ref={alertRef} />
      <InputNip ref={nipRef} proceso={handleTransferir} />
      <section className="titulos titulo-ts">
        <i className="bi bi-cash-coin"></i>
        <span>Internal Transactions</span>
      </section>

      <div className="contenido-ts">
        <section className="transaccion-area-ts">
          <section className="inputArea">
            <p className="titulo">Select your wallet</p>
            <div className="wallets">
              {WalletOpcion("Dividend wallet", userLogged.wallet.wallet_div, 1)}
              {WalletOpcion("Comission wallet", userLogged.wallet.wallet_com, 2)}
            </div>
            <TextField ti={"User"}
              value={newPeticion.code}
              name={"code"}
              changeState={fillPeticion}
              pl={"Ej:user123"} />
            <TextField ti={"Amount to transfer(USDT)"}
              value={newPeticion.monto}
              name={"monto"}
              changeState={fillPeticion}
              pl={0} />
            <button className="boton4" onClick={comenzarProceso}><span>Transfer</span></button>
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

        <HistorialTable historial={historial} fetchHistory={fetchHisotrial}>
          {(item) => (
            <tr>
              <ItemInternalTransfer item={item} />
            </tr>
          )}
        </HistorialTable>
      </div>
    </section >
  )

  function WalletOpcion(titulo, wallet, opc) {
    return (
      <div onClick={() => changeStateLocal(setState, 'seleccionado', opc)}
        className={state.seleccionado == opc ? "seleccionado walletOpcion" : "walletOpcion"}>
        <h3>{titulo}</h3>
        <div>
          <img src={logoUSDT} alt="usdt_logo" />
          <span>{(wallet || "0.00").toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')}</span>
        </div>
      </div>
    )
  }
  function confirmarTransaccionModal() {

    const openNipModal = () => {
      nipRef.current.show()
      changeStateLocal(setState, 'visibleConfirmarTransModal', false)
    }

    return (
      <section className="confirmarTransaccionModal">
        <div className="overlay"></div>
        <section className="confirmarTransaccion-contenido">
          <header>
            <h1>Transaction details</h1>
            <button onClick={() => changeStateLocal(setState, 'visibleConfirmarTransModal', false)}><i class="bi bi-x"></i></button>
          </header>
          <div className="datosDeTranferencia">
            <div className="titulo"><i class="bi bi-person"></i><span>Addressee</span></div>

            {state.loading ? (<div className="spinner" />) : (
              <>
                <h5>Username: <span>{destinatario?.username}</span></h5>
                <h5>Name: <span>{destinatario?.nombres}</span></h5>
                <h5>Last name: <span>{destinatario?.apellidos}</span></h5>
                <h5>email: <span>{destinatario?.email}</span></h5>
              </>
            )}

          </div>
          <div className="datosDeTranferencia">
            <div className="titulo"><i class="bi bi-coin"></i><span>Amount details</span></div>
            <h5>Selected wallet: <span>{state.seleccionado == 1 ? ("Dividend") : ("Commision")}</span></h5>
            <h5>Amount: <span>{newPeticion.monto.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.') || "0.00"} USDT</span></h5>
            <button onClick={openNipModal}><i class="bi bi-send"></i>Transfer</button>
          </div>
        </section>
      </section>
    )
  }

}

export default TransferenciaInterna