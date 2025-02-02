import React, { useRef } from "react";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import "./login.css";
import MensajeAlerta from "../../components/AlertMsg/MensajeAlerta.jsx";
import { useUser } from "../../hooks/useUser.js";
import {ROUTES_USER} from '../../constants/routes.js'
import { errorResponse } from '../../helpers/erroresHelps'

const Login = () => {
    const {navigateTo, handleChangeState, loginRequest, tryLogin } = useUser()
    const alertRef = useRef(null);
    const [state, setState] = useState(false)

    const toggleShowPassword = (e) => {
        e.preventDefault()
        setState(!state)
    }

    const vallidaciones = () => {
        const errores = {
            camposVacios: "Please fill out all fields"
        }

        const mostrarAlerta = (texto) => {
            if (alertRef.current) {
                alertRef.current.showAlert(texto, false)
            }
            return false
        }

        if (!loginRequest.credencial || !loginRequest.password) {
            return mostrarAlerta(errores.camposVacios)
        }

        return true
    }

    //cambiar
    const validarRol = (rol) => {
        if (rol === 'ADMIN')
            navigateTo('/admin');
        else if (rol === "USER")
            navigateTo(ROUTES_USER.HOME);
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if (!vallidaciones()) return

        const result = await tryLogin()
        if (result?.status && result?.status == 200) {
            validarRol(result.data?.rol)
        }else{
            const error=errorResponse(result?.status||400)
            alertRef.current.showAlert(error,false)
        }
    }

    return (
        <div className="login-seccion">
            {state.isLoading ? (
                <div className="spinner"></div>
            ) : (
                <>
                    <MensajeAlerta ref={alertRef} />
                    <div className="login-main-box">
                        <div className="login-box">
                            <img alt="logo" />
                            <div className="lg">
                                <hr />
                                <span>sing in</span>
                                <hr />
                            </div>
                            <form>
                                <label htmlFor="username">Username</label>
                                <input type="text" name="email"
                                    placeholder="Enter Username"
                                    value={loginRequest.email}
                                    onChange={(e) => handleChangeState('credencial', e.target.value, 'login')} />
                                <label htmlFor="password">Password</label>
                                <div className="password">
                                    <input type={state ? 'text' : 'password'}
                                        name="password" placeholder="Enter Password"
                                        value={loginRequest.password}
                                        onChange={(e) => handleChangeState('password', e.target.value, 'login')} />
                                    <button className="show" onClick={(e) => toggleShowPassword(e)}>
                                        <i className={state ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                                    </button>
                                </div>
                                <input type="submit" value="Login" onClick={(e) => handleLogin(e)} />
                                <Link className="fyp" to={`/recovery_password`}><p >Forgot your password?</p></Link>
                            </form>
                        </div>
                        <img className="imagen" alt="img1" />
                    </div>
                </>
            )}
        </div>
    )
}

export default Login;