import { useEffect, useState } from "react"
import logoUSDT from "../../../Assets/Images/Logos/usdt.png";
import { useUser } from "../../../hooks/useUser";
import {Historial} from "../../../components/tablas/Historial";
import { ItemHistorialBonos } from "../../../components/tablas/items/ItemHistorialBonos";
import "./DeudaDetails.css";
import { useHistorial } from "../../../hooks/useHistorial";


const DeudaDetails = () => {
    const [historial, setHistorial] = useState([])
    const { userLogged } = useUser()
    const{getHistorialAbono}=useHistorial()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchHistorial()
    }, [])

    const fetchHistorial = async () => {
        const result =await  getHistorialAbono(userLogged?.username)
        console.log(result);
        
        setHistorial(result)
    };


    return (
        <section className="contenido DeudaDetails">
            <header className="titulos">
                <i className="bi bi-person-gear"></i>
                <span>Debt</span>
            </header>
            <section className="contenido">
                <div className="walletOpcion">
                    <h3>Total debt</h3>
                    <div>
                        <img src={logoUSDT} alt="usdt_logo" />
                        <span>{(userLogged?.wallet.deuda.deuda || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</span>
                    </div>
                </div>

                <section className="historial">
                    <Historial historial={historial}
                        fetchHistory={fetchHistorial}
                        titulo={'Payment history'}
                        ic={"bi bi-clock-history"}>
                        {(item) => (
                            <tr>
                                <ItemHistorialBonos item={item} />
                            </tr>
                        )}
                    </Historial>
                </section>

            </section>
            {/* <header>
                        <h2><i class="bi bi-clock-history"></i> Payment history</h2>
                    </header>

                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Hour
                                </th>
                                <th>
                                    Date
                                </th>
                                <th>
                                    Amount
                                </th>
                                <th>
                                    Concept
                                </th>
                                <th>
                                    Transmitter
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <div className="spinner"></div>
                            ) : (
                                historial ? (
                                    historial.map((item) => (
                                        <tr key={item}>
                                            <td >{item.hora}</td>
                                            <td >{item.date}</td>
                                            <td >{item.cantidad} USDT</td>
                                            <td >{item.concepto} </td>
                                            <td >{item.emisor}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6">No orders</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table> */}
        </section>

    )
}

export default DeudaDetails