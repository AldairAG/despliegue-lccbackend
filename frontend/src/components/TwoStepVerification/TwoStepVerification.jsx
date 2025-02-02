import React, { useEffect, useRef, useState } from 'react';
import MensajeAlerta from '../AlertMsg/MensajeAlerta';
import { EMAIL_TEMPLATES } from '../../constants/emailTemplates';
import "./TwoStepVerification.css"
import { useUser } from '../../hooks/useUser';
import { changeStateLocal } from '../../utils/helpers';

const estados = {
    enviar: 1,
    escribir: 2,
    nip: 3,
    completado: 4,
}

const TwoStepVerification = () => {
    const { userLogged, sendEmail,updateNip } = useUser()
    const alertRef = useRef()
    const [state, setState] = useState({
        state: estados.enviar,
        isLoading: false,
        code: '',
        input: '',
    })

    useEffect(() => {
        if (userLogged?.twoStepVeref) {
            changeStateLocal(setState, 'state', estados.completado)
        }
    }, [userLogged])

    const start = async () => {
        changeStateLocal(setState, 'isLoading', true)
        const codigo = Math.floor(100000 + Math.random() * 900000);
        changeStateLocal(setState, 'code', codigo)
        //agregar metodo para enviar correo
        const request = {
            code: codigo,
            email: userLogged.email
        }
        const result = await sendEmail(EMAIL_TEMPLATES.VERIFICACION, request)
        if (result == 200) {
            changeStateLocal(setState, 'state', estados.escribir)
            changeStateLocal(setState, 'isLoading', false)
            alertRef.current.showAlert("E-mail send", true)
        } else {
            alertRef.current.showAlert("Something went wrong", false)
        }
    }

    const verificarCode = () => {
        if (state.code == state.input) {
            changeStateLocal(setState, 'state', estados.nip)
            changeStateLocal(setState, 'input', '')
            return
        }
        alertRef.current.showAlert("Wrong code!", false)
    }

    const finalizar = async () => {
        //actualizar el nip
        
        const result=await updateNip(state.input)
        
        if(result==200){
            changeStateLocal(setState, 'state', estados.completado)
        }else{
            alertRef.current.showAlert("Something went wrong", false)
        }
    }

    return (
        <section className='TSV'>
            <MensajeAlerta ref={alertRef} />
            <header><h1>Two-factor authentication</h1></header>
            <section className='contenido'>
                <div className='resaltado'>
                    <p>Two-factor authentication improves the security and privacy of accounts and personal data,
                        reducing the risk of identity theft or phishing.</p>
                </div>
                {state.isLoading ? (
                    <div className='spinner'></div>
                ) : (
                    <>
                        {state.state == estados.enviar && (
                            <button onClick={start}>Start</button>
                        )}
                        {state.state == estados.completado && (
                            <div className='completado'>
                                <p>You have completed two-step verification</p><i class="bi bi-check-circle-fill"></i>
                            </div>
                        )}
                        {renderPaso()}
                    </>
                )}
            </section>
        </section>
    );

    function renderPaso() {
        return (
            <section className='code'>
                {state.state == estados.escribir && (
                    <div className='inputData'>
                        <p>Enter the code that is sent to your email</p>
                        <input type="text" value={state.input} onChange={(e) => changeStateLocal(setState, 'input', e.target.value)} />
                        <button onClick={verificarCode}>Verify</button>
                    </div>
                )}
                {state.state == estados.nip && (
                    <div className='inputData'>
                        <p><span>Enter a 4-digit code</span>, this code will be used to change your USDT (TRC20) wallet
                            and make virtual office withdrawals</p>
                        <input type="text" value={state.input}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{0,4}$/.test(value)) changeStateLocal(setState, 'input', value)
                            }} />
                        < button onClick={finalizar} > Finish</button>
                    </div>
                )
                }
            </section >
        )
    }
};

export default TwoStepVerification;
