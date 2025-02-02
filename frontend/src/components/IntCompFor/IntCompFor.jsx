import { useEffect, useState } from "react"
import "./IntCompFor.css"
const IntCompFor = ({ isOpen, closeModal }) => {
    const [operaciones, setOperaciones] = useState([])
    const [startBalance, setStartBalance] = useState(500)
    const [periods, setperiods] = useState(12)

    useEffect(() => {
        setOperaciones([])
        realizarOperacion()
    }, [startBalance, periods]);

    const realizarOperacion = () => {
        //determinar el paquete de entrada
        const porcentaje = determinarPaquete(startBalance)
        let balance =  Math.round(startBalance * 100) / 100;
        let operacionesFlag = []
        //recorrer el numero de periodos
        for (let index = 0; index < periods; index++) {
            const periodoResultante = {}
            periodoResultante.periodo = index + 1
            periodoResultante.startBalance = balance
            //determinar el balance final
            const ganancia = balance * porcentaje / 100
            const balanceTotal = balance + ganancia
            periodoResultante.balanceFinal =Math.round(balanceTotal * 100) / 100;
            balance =Math.round(balanceTotal * 100) / 100;
            //determinar su porcentaje
            const ganciaMensual = ((balance - startBalance) * 100) / startBalance
            periodoResultante.ganciaMensual = Math.round(ganciaMensual * 100) / 100||0;
            //guardar en el aoo
            operacionesFlag = [...operacionesFlag, periodoResultante]
            //console.log(operacionesFlag)
        }
        setOperaciones(operacionesFlag)
    }

    const determinarPaquete = (num) => {
        switch (true) {
            case num > 99 && num < 500:
                return 5;
            case num > 499 && num < 2500:
                return 6;
            case num > 2499 && num < 5000:
                return 7;
            case num > 4999 && num < 10000:
                return 8;
            case num >= 10000:
                return 9;
            default:
                return 0;
        }
    }

    const handleBalanceChange = (e) => {
        setStartBalance(e.target.value);
    };

    const handlePeriodsChange = (e) => {
        setperiods(e.target.value);
    };
    if (!isOpen) return null;


    return (
        <section className="IntCFor">
            <div className="overlay"></div>
            <div className="content-ICF">
                <div className="header">
                    <button onClick={closeModal}><i class="bi bi-x"></i></button>
                    <div><p>Compounding Calculator</p></div>
                </div>
                <div className="inputs">
                    <p>Starting balance</p>
                    <input type="text" value={startBalance} onChange={handleBalanceChange} />
                    <p>Number of periods</p>
                    <select name="periodos" value={periods} onChange={handlePeriodsChange}>
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                        <option value={36}>36</option>
                        <option value={48}>48</option>
                    </select>
                </div>
                <div className="resultados">
                    <div className="resultadosFinal">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Ending balance
                                    </th>
                                    <th>
                                        Total gain
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td >{operaciones[operaciones.length-1]?.ganciaMensual||0}%</td>
                                    <td >{operaciones[operaciones.length-1]?.balanceFinal||0}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="resultado">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Period
                                    </th>
                                    <th>
                                        Starting balance
                                    </th>
                                    <th>
                                        Montlhy reward
                                    </th>
                                    <th>
                                        Ending balance
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {operaciones.map((item) => (
                                    <tr key={item.periodo}>
                                        <td >{item.periodo}</td>
                                        <td >{item.startBalance}</td>
                                        <td >{item.ganciaMensual} %</td>
                                        <td >{item.balanceFinal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default IntCompFor