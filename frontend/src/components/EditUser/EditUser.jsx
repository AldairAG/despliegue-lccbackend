import "./EditUser.css"
import { useState, useEffect } from "react"
import React from "react"
import InputData from "./InputData/InputData"
import SwitchFun from "./InputData/SwitchFun"
import appFirebase from "../../firebase-config";
import Common from '../../components/js/Common';
import { getDatabase, ref, get, set } from "firebase/database";

const EditUser = (props) => {
    const [visible, setVisible] = useState(false)
    const [userModel, setUserModel] = useState([]);
    const [permisos, setPermisos] = useState([]);
    const [userName, setUserName] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [referredBy, setReferredBy] = useState("");
    const [validity, setValidity] = useState("");
    const [rank, setRank] = useState(0);
    const [walletDiv, setWalletDiv] = useState(0);
    const [walletCom, setWalletCom] = useState(0);
    const [bonoRefDirect, setBonoRefDirect] = useState(0);
    const [bonoFastTrack, setBonoFastTrack] = useState(0);
    const [bonoIngresoRes, setBonoIngresoRes] = useState(0);
    const [bonoRangoRes, setBonoRangoRes] = useState(0);
    const [bonoIgualacion, SetBonoIgualacion] = useState(0);

    useEffect(() => {
        setVisible(props.visible)
        setUserModel(props.user)
        console.log(userModel)
        if (userModel) {
            setPermisos(props.permisos)
            setUserName(userModel.userName)
            setFirstName(userModel.firstName)
            setReferredBy(userModel.referredBy)
            setValidity(userModel.validity)
            setRank(userModel.rank)
            setWalletDiv(userModel.walletDiv)
            setWalletCom(userModel.walletCom)
            setBonoRefDirect(userModel.bonoRefDirect)
            setBonoFastTrack(userModel.bonoFastTrack)
            setBonoIngresoRes(userModel.bonoIngresoRes)
            setBonoRangoRes(userModel.bonoRangoRes)
            setLastName(userModel.lastName)
            SetBonoIgualacion(userModel.bonoIgualacion)
        }
    }, [props.visible]);

    const closeModal = () => {
        setVisible(false);
        props.setVisible(false)
    }

    const actualizarPermiso = (indice, nuevoValor) => {
        const nuevosPermisos = [...permisos];
        nuevosPermisos[indice] = nuevoValor;
        setPermisos(nuevosPermisos);
    };

    const setData = async () => {

        const db = getDatabase(appFirebase);
        const dbRef = ref(db, "users/");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const userData = snapshot.val();
            const currentUserData = Object.values(userData).find(userData => userData.firebaseKey === userModel.firebaseKey);

            if (currentUserData) {
                currentUserData.userPermisos = permisos.join("")
                currentUserData.userName = userName
                currentUserData.firstName = firstName
                currentUserData.lastName = lastName
                currentUserData.rank = rank
                currentUserData.referredBy = referredBy
                currentUserData.validity = validity
                currentUserData.walletDiv = walletDiv
                currentUserData.walletCom = walletCom
                currentUserData.bonoRefDirect = bonoRefDirect
                currentUserData.bonoFastTrack = bonoFastTrack
                currentUserData.bonoIngresoRes = bonoIngresoRes
                currentUserData.bonoRangoRes = bonoRangoRes
                currentUserData.bonoIgualacion = bonoIgualacion

                try {
                    await set(ref(db, `users/${currentUserData.firebaseKey}`), currentUserData);
                } catch (error) {
                }
            } else {
            }
        } else {
        }
    }

    return (
        <section className={visible ? "editUser" : "none"}>
            <div className="overlay2"></div>
            <div className="content">
                <div className="s1">
                    <p className="nameA">Editar usuario</p>
                    <button className="buttonC" onClick={closeModal}>Cerrar</button>
                </div>
                <div className="item s2"><InputData value={userName} setValue={setUserName} titulo="Nombre de usuario" /></div>
                <div className="item s3"><InputData value={firstName} setValue={setFirstName} titulo="Nombre" /></div>
                <div className="item s4"><InputData value={lastName} setValue={setLastName} titulo="Apellidos" /></div>
                <div className="item s5"><InputData value={referredBy} setValue={setReferredBy} titulo="Patrocinador" /></div>
                <div className="item s6"><InputData value={rank} setValue={setRank} titulo="Rango" /></div>
                <div className="item s7"><InputData value={walletDiv} setValue={setWalletDiv} titulo="Wallet de dividendos" /></div>
                <div className="item s8"><InputData value={walletCom} setValue={setWalletCom} titulo="Wallet de comiciones" /></div>
                <div className="item s9"><InputData value={validity} setValue={setValidity} titulo="Vigencia de pago" /></div>
                <div className="item s10"><InputData value={bonoRefDirect} setValue={setBonoRefDirect} titulo="Bono de referencia directa" /></div>
                <div className="item s11"><InputData value={bonoFastTrack} setValue={setBonoFastTrack} titulo="Bono FastTrack" /></div>
                <div className="item s12"><InputData value={bonoIgualacion} setValue={SetBonoIgualacion} titulo="Bono de igualación" /></div>
                <div className="item s13"><InputData value={bonoRangoRes} setValue={setBonoIngresoRes} titulo="Bono de rango residual" /></div>
                <div className="item s14"><InputData value={bonoIngresoRes} setValue={setBonoIngresoRes} titulo="Bono de ingreso residual" /></div>
                <div className="item s15"><SwitchFun visible={visible} permiso={permisos[0]} indice={0} actualizarPermiso={actualizarPermiso} titulo="Recibir dividendos" /></div>
                <div className="item s16"><SwitchFun visible={visible} permiso={permisos[1]} indice={1} actualizarPermiso={actualizarPermiso} titulo="Recibir bono referencia directa" /></div>
                <div className="item s17"><SwitchFun visible={visible} permiso={permisos[2]} indice={2} actualizarPermiso={actualizarPermiso} titulo="Recibir bono Fast track" /></div>
                <div className="item s18"><SwitchFun visible={visible} permiso={permisos[3]} indice={3} actualizarPermiso={actualizarPermiso} titulo="Recibir bono de igualación" /></div>
                <div className="item s19"><SwitchFun visible={visible} permiso={permisos[4]} indice={4} actualizarPermiso={actualizarPermiso} titulo="Recibir bono residual" /></div>
                <div className="item s20"><SwitchFun visible={visible} permiso={permisos[5]} indice={5} actualizarPermiso={actualizarPermiso} titulo="Recibir bono rango residual" /></div>
                <div className="item s21"><SwitchFun visible={visible} permiso={permisos[6]} indice={6} actualizarPermiso={actualizarPermiso} titulo="primera transacción" /></div>
                <div className="item s22"><SwitchFun visible={visible} permiso={permisos[7]} indice={7} actualizarPermiso={actualizarPermiso} titulo="Cobrar mensualidad" /></div>
                <div className="item s23"><SwitchFun visible={visible} permiso={permisos[8]} indice={8} actualizarPermiso={actualizarPermiso} titulo="Bono de 10% mensual" /></div>
                <div className="s24">
                    <button className="buttonC" onClick={setData}>save</button>
                </div>
            </div>
        </section>
    )
}
export default EditUser