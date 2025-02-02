import "./Retiros.css"
import TextInput from "../../components/TextInput/TextInput"
import { useState } from "react"
const Retiros = () => {
    const [cantidad, setCantidad] = useState("")
    const [historial, setHistorial] = useState([])
    return (
        <section className="Retiros-ec">
            <p >Withdrawals</p>
            <div className="content-rec">
                <div className="sec1-rec">
                    <p>Request withdrawal</p>
                    <div className="textin-rec">
                        <p>Amount</p>
                        <input type="text" />
                    </div>
                    <div className="textin-rec">
                        <p>Wallet</p>
                        <input type="text" />
                    </div>
                    <button>Request withdrawal</button>
                </div>
                <div className="sec2-rec">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Date
                                </th>
                                <th>
                                    Hour
                                </th>
                                <th>
                                    Amount date
                                </th>
                                <th>
                                    status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {historial && historial.length > 0 ? (
                                historial.map((item) => (
                                    <tr key={item.userName}>
                                        <td className="p-4 align-middle">{item.userName}</td>
                                        <td className="p-4 align-middle">{item.firstName + " " + item.lastName}</td>
                                        <td className="p-4 align-middle">{item.admissionDate}</td>
                                        <td className="p-4 align-middle">{item.Country}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-4 align-middle">You have not made withdrawals yet</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
export default Retiros