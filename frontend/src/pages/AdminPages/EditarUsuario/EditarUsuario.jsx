import "./EditarUsuario.css"
import TextInput from "../../../components/TextInput/TextInput"
import { useState, useEffect, useRef } from "react"
import ToggleButton from "../../../components/ToggleButton/ToggleButton.jsx";
import { useParams } from "react-router-dom";
import { useUser } from "../../../hooks/useUser.js";
import { PERMISOS } from "../../../utils/permisos.js";
import { changeStateLocal } from "../../../utils/helpers.js";
import { errorResponse } from '../../../helpers/erroresHelps.js'
import MensajeAlerta from '../../../components/AlertMsg/MensajeAlerta.jsx'

const propiedadesOfUsuario = [
    { label: "Nombre de usuario", key: "username", isNumber: false, nodo: null },
    { label: "Contraseña", key: "password", isNumber: false, nodo: null },
    { label: "E-mail", key: "email", isNumber: false, nodo: null },
    { label: "Nombre", key: "nombres", isNumber: false, nodo: null },
    { label: "Apellidos", key: "apellidos", isNumber: false, nodo: null },
    { label: "Telefono", key: "telefono", isNumber: false, nodo: null },
]

const propiedadesOfWallet = [
    { label: "StaterPack", key: "staterpack", isNumber: true, nodo: 'wallet' },
    { label: "wallet de comisiones", key: "wallet_com", isNumber: true, nodo: 'wallet' },
    { label: "wallet de dividendos", key: "wallet_div", isNumber: true, nodo: 'wallet' },
    { label: "Ganancias totales", key: "ganancia_total", isNumber: true, nodo: 'wallet' },
    { label: "Retiros totales", key: "retiro_total", isNumber: true, nodo: 'wallet' },
    { label: "Direccion de wallet", key: "wallet_address", isNumber: false, nodo: 'wallet' },
    { label: "Fecha de inscripción", key: "fecha_ingreso", isNumber: false, nodo: 'wallet' },
    { label: "Rango", key: "rango", isNumber: true, nodo: 'wallet' },
    { label: "Referido", key: "referido", isNumber: false, nodo: 'wallet' }
]

const propiedadesBono = [
    { label: "Bono fast-Track", key: "fast_track", isNumber: true, nodo: 'bonos' },
    { label: "Bono de igualación", key: "matching", isNumber: true, nodo: 'bonos' },
    { label: "Bono ingreso residual", key: "membresia_mensual", isNumber: true, nodo: 'bonos' },
    { label: "Bono rango residual", key: "rango_res", isNumber: true, nodo: 'bonos' },
    { label: "Bono referencia directa", key: "ref_direct", isNumber: true, nodo: 'bonos' },
]

const propiedadesDeuda = [
    { label: "Deuda", key: "deuda", isNumber: true, nodo: 'deuda' },
    { label: "Credito corporativo", key: "wallet_deuda", isNumber: true, nodo: 'deuda' }
]

const propiedadesPermiso = [
    { label: 'Pagar facturas con dividendos', key: PERMISOS.FACTURAR_DIV, default: true },
    { label: 'Activar promocion de 10%', key: PERMISOS.PROMO_DIEZ, default: false },
    { label: 'Matching bono', key: PERMISOS.RECIBIR_MATCHING, default: true },
    { label: 'Retirar de Comisiones', key: PERMISOS.RETIRAR_COMISION, default: true },
    { label: 'Retirar de dividendos', key: PERMISOS.RETIRAR_DIVIDENDO, default: true },
    { label: 'Activar deuda', key: PERMISOS.DEUDA, default: false },
]

const EditarUsuario = () => {
    const { userSelect, getSelectUser, navigateTo, handleChangeState
        , updateByAdmin, updatePermiso,
    } = useUser()
    const alertRef = useRef()

    const { fk } = useParams();
    const [state, setState] = useState({
        loading: true,
        visibleAlert: false,
        permisos: {
            [PERMISOS.FACTURAR_DIV]: true,
            [PERMISOS.PROMO_DIEZ]: true,
            [PERMISOS.RECIBIR_MATCHING]: false,
            [PERMISOS.RETIRAR_COMISION]: true,
            [PERMISOS.RETIRAR_DIVIDENDO]: true,
            [PERMISOS.DEUDA]: false,
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            await getSelectUser(fk);
            asignarPermisos();
            changeStateLocal(setState, 'loading', false);
        };

        fetchData(); // Llama a la función
    }, [fk]);


    const asignarPermisos = () => {
        const permisosList = userSelect.wallet.permisos
        const nuevosPermisos = { ...state.permisos };

        propiedadesPermiso.forEach(permisoKey => {
            const permiso = permisosList.find(item => item.permisoName == permisoKey.key)
            if (permiso) {
                console.log(permisoKey.key);
                console.log(permiso.activo);
            }

            nuevosPermisos[permisoKey.key] = permiso ? permiso.activo : permisoKey.default;
        })
        changeStateLocal(setState, 'permisos', nuevosPermisos)
    }

    const handleChange = (item, value) => {
        if (item.isNumber)
            value = Number(value)
        handleChangeState(item.key, value, item.nodo)

        console.log(userSelect);
        
    };

    const handleEditar = async () => {
        await updateByAdmin(userSelect.id_user)
    };

    const handleEliminar = () => {

    };

    const handleRegresar = () => {
        navigateTo('/admin/gestionar-ususarios');
    };

    const handleUpdatePermiso = async (key, def) => {

        const permisos = userSelect.wallet.permisos;

        // Buscar el permiso existente
        let permiso = permisos.find(p => p.permisoName === key);

        // Crear un nuevo objeto de permiso con valores iniciales
        const newPermiso = {
            permiso_id: permiso?.permiso_id || null,
            permisoName: key,
            activo: permiso ? !permiso.activo : !def,
            walletId: userSelect.wallet.wallet_id,
        };

        // Actualizar el permiso en la base de datos
        const result = await updatePermiso(newPermiso);

        if (result?.status && result?.status == 200) {
            alertRef.current.showAlert('changes made correctly', true)
            changeStateLocal(setState, 'permisos', ({
                ...state.permisos,
                [key]: !state.permisos[key]
            })
            )
            console.log(state.permisos);

        } else {
            alertRef.current.showAlert(errorResponse(result?.status || 400), true)
        }

    };

    return (
        <section className="EditarUsuario">

            {state.loading ? <div className="spinner"></div>
                : <>
                    {/* <AlertMsg visible={visible} setVisible={setVisible} texto={msj} />
            {visibleAlert && (
                <section className="deleteSection">
                    <div className="overlay-ads"></div>
                    <div className="deleteContain">
                        <div className="sec1-dc"><p>Eliminar al usuario: {userSelect.username}</p></div>
                        <div className="sec2-dc">
                            <button onClick={() => setVisibleAlert(false)} className="cancel">Cancelar</button>
                            <button onClick={eliminarUsuario} className="ok">Aceptar</button>
                        </div>
                    </div>
                </section>
            )} */}
                    <MensajeAlerta ref={alertRef} />
                    <section className="botones">
                        <div><button onClick={handleRegresar}><p>Regresar</p></button></div>
                        <div><button onClick={handleEditar}><p>Guardar</p></button></div>
                        {/* <div><button onClick={() => setVisibleAlert(true)}><p>Eliminar usuario</p></button></div> */}
                        <div><button onClick={handleEliminar}><p>Eliminar usuario</p></button></div>
                    </section>
                    <div><p className="titulo-edtu">Datos personales</p></div>
                    <section className="enterData">
                        {propiedadesOfUsuario.map(input => (
                            <div key={input.key}>
                                <TextInput
                                    ti={input.label}
                                    value={userSelect[input.key]}
                                    setValue={(value) => handleChange(input, value)}
                                />
                            </div>
                        ))}
                    </section>
                    <div><p className="titulo-edtu">Datos de oficinal virtual</p></div>
                    <section className="enterData">
                        {propiedadesOfWallet.map(input => (
                            <div key={input.key}>
                                <TextInput
                                    ti={input.label}
                                    value={userSelect.wallet[input.key]}
                                    setValue={(value) => handleChange(input, value)}
                                />
                            </div>
                        ))}
                        {propiedadesBono.map(input => (
                            <div key={input.key}>
                                <TextInput
                                    ti={input.label}
                                    value={userSelect.wallet.bonos[input.key]}
                                    setValue={(value) => handleChange(input, value)}
                                />
                            </div>
                        ))}
                    </section>
                    <div><p className="titulo-edtu">Credito corporativo</p></div>
                    <section className="enterData">
                        {propiedadesDeuda.map(input => (
                            <div key={input.key}>
                                <TextInput
                                    ti={input.label}
                                    value={userSelect.wallet.deuda[input.key]}
                                    setValue={(value) => handleChange(input, value)}
                                />
                            </div>
                        ))}
                    </section>
                    <div><p className="titulo-edtu">Permisos</p></div>
                    <section className="permisos">
                        {propiedadesPermiso.map(input => (
                            <div className="permiso" key={input.key}>
                                <ToggleButton
                                    checked={state.permisos[input.key]}
                                    onClick={() => handleUpdatePermiso(input.key, input.default)}
                                />
                                <span>{input.label}</span>
                            </div>
                        ))}
                    </section>
                </>
            }
        </section>
    );
};

export default EditarUsuario;
