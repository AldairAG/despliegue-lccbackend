import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import "./Aviso.css"
import React, { useState, useRef,useEffect } from 'react';
import { useUser } from "../../context/UserContext";
import img1 from "../../Assets/Images/Baners_jpg/advertencia.png"
import img2 from "../../Assets/Images/qr/qrms.png"
import Alert from "../AlertMsg/MensajeAlerta"
import Peticion from "../../model/PeticionModel";

const Aviso = () => {
  const [state, setState] = useState({
    pagina: 0,
    visible: false
  })
  let location = useLocation();
  const { userData } = useUser();
  const alertRef = useRef(null);

  const comprobarVigencia = (userData) => {
    if (!userData) return
    if (userData.validity === "unpaid") {
      changeState("visible", true)
    } else {
      changeState("visible", false)
    }
  }

  useEffect(() => {
    comprobarVigencia(userData)
  }, [userData]);

  const changeState = (name, value) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }



  const goProduct = () => {
    changeState("pagina", state.pagina + 1)
  }

  const setRequestHandle = () => {
    const peticion = new Peticion("Mantenimiento", 25)
    peticion.save().then(() => {
      alertRef.current.showAlert("transaction completed", true)
    })
  }

  const handleCopy = () => {
    const inputElement = document.getElementById("wallet");
    inputElement.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alertRef.current.showAlert("the wallet address has been copied", true)
  };

  const content = [
    <div className="avisoContent">
      <div className="sec0-ev">
        <img src={img1} alt="signo" />
      </div>
      <div className="sec1-ev">
        <p>Monthly maintenance payment has not been covered</p>
      </div>
      <div className="sec2-ev">
        <p>You do not have enough balance to pay the monthly maintenance (25 USDT). Certain functions have been suspended until payment is made again.</p>
      </div>
      <div className="sec3-ev">
        <button onClick={goProduct}>
          <p>Buy package of 25 usdt</p>
        </button>
      </div>
    </div>,
    <div className="avisoContent2">
      <div className="sec4-ev"><p>Payment process</p></div>
      <div className="sec5-ev">
        <span className="line"></span>
        <p>1-Scan the QR code</p>
        <img src={img2} alt="qr_code" />
      </div>
      <div className="sec6-ev">
        <span className="line"></span>
        <p>or</p>
        <span className="line"></span>
      </div>
      <div className="sec7-ev">
        <p>1-Copy the wallet address</p>
        <input type="text" id="wallet" value={"TMuMJUSBamBf1d2vhbd4g1p13pUf6N7TtM"} readOnly />
        <button onClick={handleCopy}><i class="bi bi-copy"></i> Copy</button>
      </div>
      <div className="sec8-ev">
        <p>2-verify the amount</p>
        <input type="text" value={"25 USDT"} readOnly />
      </div>
      <div className="sec9-ev">
        <p>3-Finish the process</p>
        <button onClick={setRequestHandle}>Finish</button>
      </div>
    </div>
  ]

  return (
    state.visible && (
      <section className={location.pathname === '/Dashboard/packs' ? 'none' : 'Aviso'}>

        <Alert ref={alertRef} />
        <div className="overlay-av"></div>
        {content[state.pagina]}
      </section>
    )
  )
}
export default Aviso