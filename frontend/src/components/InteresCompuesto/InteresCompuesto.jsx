import "./InteresCompuesto.css"
import IntCompFor from "../IntCompFor/IntCompFor"
import { useEffect, useRef, useState } from "react"
import Alert from "../AlertMsg/MensajeAlerta";
import { useUser } from '../../hooks/useUser'
import { changeStateLocal } from "../../utils/helpers";
import { errorResponse } from '../../helpers/erroresHelps'

const InteresCompuesto = () => {

    const [state, setState] = useState({
        periodos: 12,
        calcularModal: false,
        activarModal: false,
        isActivo: false,
        acumulado:0,
        fin:''
    })

    const alertRef = useRef()
    const { userLogged, saveIc,tryLogin } = useUser()

    useEffect(() => {
        if (userLogged?.wallet?.interesCompuesto) {
            const ic = userLogged?.wallet?.interesCompuesto.find(permiso => permiso.tipo == 'div')
            if (ic) {
                if(ic.isActivo)
                changeStateLocal(setState, 'isActivo', true)
            
                changeStateLocal(setState, 'acumulado', ic.acumulado)
                changeStateLocal(setState, 'fin', ic.fecha_fin)
            }
        }
    }, [userLogged])

    const save = async () => {
        const request = {
            wallet_id: userLogged.wallet.wallet_id,
            tipo: 'div',
            activo: true,
            fecha_fin: addYear()
        }

        const result = await saveIc(request)

        if (result?.status && result?.status == 200) {
            await tryLogin()
            alertRef.current.showAlert('Compound interest activated', true)
        } else {
            alertRef.current.showAlert(errorResponse(result?.status || 400), false)
        }

        changeStateLocal(setState, 'activarModal', false)

    };

    const addYear = () => {
        const years = state.periodos / 12;
        const today = new Date();
        today.setFullYear(today.getFullYear() + years);

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Mes 0-based, ajustamos sumando 1
        const day = String(today.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`; // Cambiamos el formato a YYYY-MM-DD
    };



    return (
        <section className="IComp">
            <IntCompFor isOpen={state.calcularModal}
                closeModal={() => changeStateLocal(setState, 'calcularModal', !state.calcularModal)} />
            <Alert ref={alertRef} />
            {renderModal1()}
            <header><p>Compound interest in mandatory terms</p></header>
            <div className="datos">
                <div className="datoDiv">
                    <div className="dato">
                        <span>Accumulated capital</span>
                        <input type="text" value={state.acumulado || 0} readOnly />
                    </div>
                    <div className="dato">
                        <span>End of term</span>
                        <input type="text" value={state.fin || "---"} readOnly />
                    </div>
                </div>
                <div className="state">
                    <p>State:</p>
                    {state.isActivo ? (
                        <span className="green"><i class="bi bi-circle-fill"></i> Active</span>
                    ) : (
                        <span className="red"><i class="bi bi-circle-fill"></i> Disable</span>
                    )}
                </div>
                <div className="botones">
                    <button
                        className="azul"
                        onClick={() => changeStateLocal(setState, 'calcularModal', !state.calcularModal)}>Calculate</button>
                    <button disabled={state.isActivo}
                        onClick={() => changeStateLocal(setState, 'activarModal', !state.activarModal)}>
                        <i class="bi bi-power"></i> Activate</button>
                </div>
            </div>
        </section>
    )



    function renderModal1() {
        return (
            state.activarModal && (
                <div className="modal1">
                    <div className="overlay"></div>
                    <div className="modal1-content">
                        <div className="header">
                            <button
                                onClick={() => changeStateLocal(setState, 'activarModal', !state.activarModal)}>
                                <i className="bi bi-x"></i>
                            </button>
                        </div>
                        <div className="body">
                            <p>By activating compound interest you will not be able to make withdrawals.</p>
                            <div className="inputs">
                                <span>Select the number of periods</span>
                                <select name="periodos" value={state.periodos}
                                    onChange={(e) => changeStateLocal(setState, 'periodos', e.target.value)}>
                                    <option value={12}>12 Month</option>
                                    <option value={24}>24 Month</option>
                                    <option value={36}>36 Month</option>
                                    <option value={48}>48 Month</option>
                                </select>
                            </div>
                        </div>
                        <div className="botones">
                            <button
                                onClick={() => changeStateLocal(setState, 'activarModal', !state.activarModal)}
                                className="boton1">
                                <p className="button_top">Cancel</p>
                            </button>
                            <button onClick={save} className="boton1"><p className="button_top">Save</p></button>
                        </div>
                    </div>
                </div>
            )
        );
    }

}

export default InteresCompuesto