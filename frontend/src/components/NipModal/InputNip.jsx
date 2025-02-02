import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import "./NipModal.css"
import Alert from "../../components/AlertMsg/MensajeAlerta"
import { useUser } from '../../hooks/useUser';

const InputNip = forwardRef(({ proceso }, ref) => {
    const [state, setState] = useState({ nip: "", visible: false })
    const { userLogged ,validateNip} = useUser()
    const alertRef = useRef()
    
    const changeState = (name, value) => {
        setState(prev => ({
            ...prev,
            [name]: value
        }))
    }
    
    const openClose = () => {
        changeState("visible", !state.visible)
    }

    useImperativeHandle(ref, () => ({
        show: () => {
            openClose()
        }
    }));

    if (!state.visible) return

    const vallidaciones = () => {
        if (!userLogged.wallet.nip) {
            alertRef.current.showAlert("complete two-step verification to get your PIN",false)
            return false
        }
        return true
    }

    async function validarNip() {
        if (!vallidaciones())return
        if (await validateNip(state.nip)) {
            proceso()
        } else {
            alertRef.current.showAlert("Incorrect nip",false)
        }
    }



    return (
        <section className="ModalNip">
            <Alert ref={alertRef} />
            <div className='overlay'></div>
            <div className="modal-contentNip">
                <p>Enter your NIP</p>
                <input type="password" value={state.nip} onChange={(e) => changeState("nip", e.target.value)} maxLength={4} placeholder="Enter 4-digit NIP" />
                <div className='botones'>
                    <button onClick={openClose}>Close</button>
                    <button onClick={validarNip} className='azul'>Verify</button>
                </div>
            </div>
        </section>
    );
});

export default InputNip;
