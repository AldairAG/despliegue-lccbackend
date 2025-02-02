import { getDatabase, ref, onValue } from 'firebase/database';
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import Common from '../../components/js/Common';
import DireccionModel from '../../model/DireccionModel';
import "./Editar.css"
import TextInput from "../../components/TextInput/TextInput"
import Orden from "../../model/OrdenModel"
const Editar = () => {
    const { fk } = useParams();
    const [orden, setOrden] = useState([])
    const [rastreo, setRastreo] = useState("")
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState([])
    const [direccion, setDireccion] = useState([])
    const [estado, setEstado] = useState("Pending")

    useEffect(() => {
        const db = getDatabase();
        const userRef = ref(db, 'ordenes/' + fk);

        const unsubscribe = onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setOrden(data);
            } else {
                console.log(fk)
                console.log("No such document!");
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (Object.keys(orden).length > 0) {
            setRastreo(orden.numeroRastreo || "");
            setEstado(orden.estado)
        }
    }, [orden]);

    const getUserData = async () => {
        const getUser = new Common()
        const userData = await getUser.getUserDataByName(orden.owner)
        setUserData(userData || [])
    };

    useEffect(() => {
        getUserData()
    }, [orden]);

    useEffect(() => {
        const direccionModel = new DireccionModel()
        direccionModel.getDireccion(userData.firebaseKey, setDireccion)
    }, [userData]);

    useEffect(() => {
        if (Object.keys(direccion).length > 0) {
            setLoading(false);
        }
    }, [direccion]);

    /////////////
    const guardarCambios = () => {
        const ordenModel = new Orden()
        const newOrden = orden
        newOrden.numeroRastreo = rastreo
        newOrden.estado = estado
        ordenModel.saveOrden(fk, newOrden)
        alert("Orden actualizada")
    }

    return (
        <section className="tabla eaec">
            {loading ? (
                <div className='spinner'></div>
            ) : (
                <>
                    <div className="sec0-eaec"><p>Orden #{orden.numeroOrden}</p></div>
                    <div className="sec1-eaec">
                        <div className="sec2-eaec sec-eaec">
                            <span className='titulo'>Editar datos</span>
                            <TextInput ti={"Numero de rastreo"} value={rastreo} setValue={setRastreo} pl={"4946415643164"} />
                            <p>Estado del pedido:</p>
                            <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                                <option value="Pending">Pendiente</option>
                                <option value="Preparing for shipment">En preparación</option>
                                <option value="Sent">Enviado</option>
                                <option value="delivered">Entregado</option>
                            </select>
                            <button onClick={guardarCambios}>Guardar cambios</button>
                        </div>
                        <div className="sec3-eaec sec-eaec">
                            <span className='titulo'>Detalles de la orden</span>
                            <div className='productos'>
                                {orden.productos.map((item, index) => (
                                    <div className="productos-rv">
                                        <div className="item-ecc">
                                            <p>{item.nombre}</p>
                                            <span>{item.precio} USDT x {item.cantidad}</span>
                                        </div>
                                        <p>{item.precio*item.cantidad} USDT</p>
                                    </div>
                                ))}
                            </div>
                            <p>Total: {orden.totalPagar} USDT</p>
                        </div>
                        <div className="sec4-eaec sec-eaec">
                            <span className='titulo'>Informacion de envio</span>
                            <p><span>Direccion:</span> {direccion.direccion},{direccion.numExt},{direccion.numInt||"S/n"}.</p>
                            <p><span>Colonia:</span> {direccion.colonia}.</p>
                            <p><span>Ciudad:</span> {direccion.city}.</p>
                            <p><span>Estado:</span> {direccion.estadoSeleccionado}.</p>
                            <p><span>Codigo postal:</span> {direccion.cp}.</p>
                        </div>
                        <div className="sec5-eaec sec-eaec">
                        <span className='titulo'>Informacion de envio</span>
                            <p><span>Nombre:</span> {userData.firstName}.</p>
                            <p><span>Apellidos:</span> {userData.lastName}.</p>
                            <p><span>Username:</span> {userData.userName}.</p>
                            <p><span>E-mail:</span> {userData.email}.</p>
                            <p><span>Patrocinador:</span> {userData.referredBy}.</p>
                        </div>
                    </div>
                </>
            )}
        </section>
    )
}

export default Editar