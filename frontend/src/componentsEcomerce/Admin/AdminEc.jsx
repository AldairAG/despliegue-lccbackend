import { useState, useEffect } from "react"
import Orden from "../../model/OrdenModel"
import "./AdminEc.css"
import { useHistory } from 'react-router-dom';

const AdminEc = () => {
    const [ordenes, setOrdenes] = useState([])
    const [estado, setEstado] = useState("All")
    const [loading, setLoading] = useState(true)
    const history = useHistory();


    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        const ordenModel = new Orden()
        ordenModel.getAllOrdenes().then(ordenes=>{
            setOrdenes(ordenes)
            setLoading(false)
        })
    }   
    const handleBlur = () => {
        const ordenModel = new Orden()
        ordenModel.getAllOrdenes()
    };
    const handleClick = (item) => {
        history.push('/admin/editar-orden/' + item.id);
    }

    return (
        <section className="tabla aec">
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <>
                    <div className="sec0-aec">
                        <h2>Ordenes</h2>
                        <select value={estado} onChange={(e) => setEstado(e)} onBlur={handleBlur}>
                            <option value="All">Todas</option>
                            <option value="Pending">Pendiente</option>
                            <option value="Preparing for shipment">En preparación</option>
                            <option value="Sent">Enviado</option>
                            <option value="delivered">Entregado</option>
                        </select>
                        <button className="refresh" ><i class="bi bi-arrow-counterclockwise"></i></button>
                    </div>
                    <div className="sec1-aec">
                        {ordenes.reverse().map((item, index) => (
                            <div className="ordenes-rv">
                                <div className="s11-aec">
                                    <span>#{item.numeroOrden}</span>
                                    <p>{item.estado}</p>
                                </div>
                                <div className="s12-aec">
                                    <div><p>Fecha:</p><span>{item.fecha}</span></div>
                                    <div><p>Cliente:</p><span>{item.owner}</span></div>
                                    <div><p>Total:</p><span>{item.totalPagar} USDT</span></div>
                                </div>
                                <div className="s11-aec"><button onClick={() => handleClick(item)}>Actualizar</button></div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    )
}
export default AdminEc