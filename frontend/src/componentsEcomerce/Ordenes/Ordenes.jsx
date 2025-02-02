import { useState, useEffect } from "react"
import "./Ordenes.css"
import OrdenModel from "../../model/OrdenModel"
import OrdenModal from "../OrdenModal/OrdenModal"
const Ordenes = ({userName}) => {
    const [ordenes, setOrdenes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchOrdenes()
    }, []);

    const fetchOrdenes = () => {
        const ordenData = new OrdenModel()
        ordenData.getOrdenes(userName).then(orders => {
            setOrdenes(orders)
            setIsLoading(false);
        });
    }

    return (
        <section className="Ordenes-ec">
            <div className="sec0-oec">
                <table>
                    <thead>
                        <tr>
                            <th>
                                Date
                            </th>
                            <th>
                                Order number
                            </th>
                            <th>
                                Total
                            </th>
                            <th>
                                State
                            </th>{/* 
                            <th>
                                Actions
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <div className="spinner"></div>
                        ) : (
                            ordenes ? (
                                ordenes.map((item) => (
                                    <tr key={item.userName}>
                                        <td >{item.fecha}</td>
                                        <td >{item.numeroOrden}</td>
                                        <td >{item.totalPagar} USDT</td>
                                        <td >{item.estado}</td>
                                        {/* <td><OrdenModal orden={item} /></td> */}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No orders</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}
export default Ordenes