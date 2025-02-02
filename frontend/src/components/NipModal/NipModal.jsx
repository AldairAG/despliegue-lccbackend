import React, { useEffect, useState } from 'react';
import "./NipModal.css"
import Common from '../js/Common';
import AlertMsgError from "../../components/AlertMsg/AlertMsgError.jsx"
import AlertMsg from "../../components/AlertMsg/AlertMsg.jsx"

const NipModal = ({ correctNip, onOpenClose, modalNip, proceso }) => {
  const [inputNip, setInputNip] = useState('');
  const [visibleE, setVisibleE] = useState(false);
  const [visible, setVisible] = useState(false);
  const [msj, setMsj] = useState("");

  if (!modalNip) return

  function validarNip () {
    if (inputNip == correctNip) {
      proceso()
    } else {
      setMsj("Invalid NIP");
      setVisibleE(true);
    }
  }

  /*const sendRequest = (monto) => {
    const floatValue = parseFloat(monto);
    const common = new Common();
    let seleccion
    if (opcion) {
      seleccion = 1
    } else {
      seleccion = 2
    }
    if (inputNip === correctNip) {
      const peticionModel = new PeticionModel("Retiro", floatValue, seleccion)
      peticionModel.saveRetiro().then(() => {
        setVisible(true)
        setMsj("Request submitted successfully")
        fetch()
        onOpenClose()
        setInputNip("")
      })
    } else {
      setMsj("Invalid NIP");
      setVisibleE(true);
    }
  }

  const verificarNip = () => {
    const common = new Common();
    if (inputNip === correctNip) {
      common.editAnyUser(updatedUserData).then(() => {
        setMsj("Changes made successfully");
        setVisible(true);
        onOpenClose();
        setInputNip("")
      }).catch(() => {
        setMsj("Error");
        setVisibleE(true);
      })
    } else {
      setMsj("Invalid NIP");
      setVisibleE(true);
    }
  }*/

  return (
    <section className="ModalNip">
      <AlertMsg visible={visible} setVisible={setVisible} texto={msj} />
      <AlertMsgError visible={visibleE} setVisible={setVisibleE} texto={msj} />
      <div className='overlay'></div>
      {/*authTF ? (*/
        <div className="modal-contentNip">
          <p>Enter your NIP</p>
          <input type="password" value={inputNip} onChange={(e) => setInputNip(e.target.value)} maxLength={4} placeholder="Enter 4-digit NIP" />
          <div className='botones'>
            <button onClick={onOpenClose}>Close</button>
            <button onClick={validarNip} className='azul'>Verify</button>
          </div>
        </div>
      /*) : (
        <div className='modal-contentNip'>
          <p>Complete two-step verification to create your PIN</p>
          <button onClick={openClose}>Close</button>
        </div>
      )*/}

    </section>
  );
};

export default NipModal;
