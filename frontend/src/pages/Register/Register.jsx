import React, { useEffect, useRef, useState } from "react"
import "./Register.css"
import MensajeAlerta from "../../components/AlertMsg/MensajeAlerta"
import { useParams } from 'react-router-dom';
import { changeStateLocal } from "../../utils/helpers";
import { useUser } from "../../hooks/useUser";
import PhoneInput from "../../components/PhoneInput/PhoneInput"

const userEditables = [
    { label: 'Phone', key: 'telefono', block: false, nodo: '' },

]


const Register = () => {
    const { r } = useParams();
    const alertRef = useRef()
    const { registerRequest, registerUser, handleChangeState } = useUser()

    const [numero, setNumero] = useState({ lada: "+52", numero: "" });

    useEffect(() => {
        handleChangeState('referido', r, 'register')
    }, [])

    const [state, setState] = useState({
        passwordConf: '',
        showPass: false,
        showPass2: false,
    })

    const validacion = () => {
        const errores = {
            passNoMatch: 'Passwords do not match.',
            passLess: 'Password should contain at least 6 characters.',
            emptyField: 'There are empty fields'
        }

        const showError = (msj) => {
            alertRef?.current?.showAlert(msj, false)
            return false
        }

        if (!registerRequest.email || !registerRequest.password || !state.passwordConf ||
            !registerRequest.username || !registerRequest.referido) {
            return showError(errores.emptyField)
        }

        if (registerRequest.password.length < 6) {
            return showError(errores.passLess)
        }
        if (registerRequest.password !== state.passwordConf) {
            return showError(errores.passNoMatch)
        }

        return true
    }
    const handleChangeUsername = (e) => {
        const newValue = e.target.value;
        const sanitizedValue = newValue.replace(/[^\w\s]/gi, '').replace(/\s/g, "");
        handleChangeState('username', sanitizedValue, 'register')
    };
    const handleChangeEmail = (e) => {
        const value = e.target.value;
        const textoConvertido = value.toLowerCase();
        handleChangeState('email', textoConvertido, 'register');
    }

    const handleTogglePassword = (e, opc) => {
        e.preventDefault();
        if (opc == 1) {
            changeStateLocal(setState, 'showPass', !state.showPass)
        } else {
            changeStateLocal(setState, 'showPass2', !state.showPass2)
        }
    };

    const registrar = async (e) => {
        e.preventDefault();
        if (!validacion()) return
        registerUser()
    }


    return (
        <div className="register-seccion">
            <MensajeAlerta ref={alertRef} />
            <div className="form-register">
                <img alt="logo" />
                <h2>Sing up</h2>
                <h4>Enter your username, email and password to register</h4>
                <span>Username:</span>
                <input type="text"
                    placeholder="Enter your Username"
                    value={registerRequest.username}
                    onChange={handleChangeUsername} />
                <span>Email:</span>
                <input type="email"
                    placeholder="Enter your E-mail"
                    value={registerRequest.email}
                    onChange={handleChangeEmail} />
                <span>Password</span>
                <div className="password">
                    <input type={state.showPass ? 'text' : 'password'}
                        placeholder="Enter Password"
                        value={registerRequest.password}
                        onChange={(e) => handleChangeState('password', e.target.value, 'register')} />
                    <button className="show" onClick={(e) => handleTogglePassword(e, 1)}>
                        <i className={state.showPass ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                    </button>
                </div>
                <span>Confirm your password</span>
                <div className="password">
                    <input type={state.showPass2 ? 'text' : 'password'}
                        placeholder="confirm your password"
                        value={state.passwordConf}
                        onChange={(e) => changeStateLocal(setState, 'passwordConf', e.target.value)} />
                    <button className="show" onClick={(e) => handleTogglePassword(e, 2)}>
                        <i className={state.showPass2 ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                    </button>
                </div>
                <span>Phone</span>
                {userEditables.map(input => (
                    <div key={input.key}>
                        {input.key === "telefono" && (
                            <PhoneInput
                                value={numero}
                                setValue={setNumero}
                                ti=""
                                pl="Introduce tu número"
                                block={false}
                            />
                        )}

                    </div>
                ))}

                <label htmlFor="reference">Referred by:</label>
                <input type="text" name="referred" id="referred" readOnly value={registerRequest.referido} />
                <h5 className="tac">"By registering, you agree to all terms and conditions."</h5>
                <input className='botons' type="submit" value="Register" onClick={(e) => registrar(e)} />
            </div>
            <div className="msj-seccion">
                <img className="img1" alt="img1" />
                <img className="img2" alt="img2" />
                <span>Sign up now and start investing in your future!</span>

            </div>
        </div>
    )
}

export default Register;

