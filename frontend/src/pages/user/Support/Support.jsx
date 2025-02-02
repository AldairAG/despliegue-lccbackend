import { useState } from "react"
import "./Support.css"
import Email from "../../../components/js/Email"
import AlertMsg from "../../../components/AlertMsg/AlertMsg"

const Support = (props) => {
    const [motivo, setMotivo] = useState("Soporte General")
    const [mensaje, setMensaje] = useState("")
    const [visible, setVisible] = useState(false);
    const [msj, setMsj] = useState("");

    const sendEmail = () => {
        const email = new Email(props.email, "template_zkw75fr")
        email.sendEmailSupport(motivo, props.userName, mensaje)
        setVisible(true)
        setMsj("Report sent successfully")
    }


    return (
        <section className="support">
            <AlertMsg visible={visible} setVisible={setVisible} texto={msj} />
            <div className="sec0-sp">
                <i className="bi bi-exclamation-octagon"></i>
                <span>Support</span>
            </div>
            <div className="sec1-sp">
                <label for="support-options">Select your request:</label>
                <div class="custom-select-wrapper">
                    <select id="support-options" class="custom-select" onChange={(e) => setMotivo(e.target.value)}>
                        <option value="Soporte General">Soporte General</option>
                        <option value="Soporte General">Capital request starter package (Forced term 12 months, after 12 months: -30%, after 24 months: 0%)</option>
                        <option value="la acreditación de dividendos">I did not receive my dividends correctly</option>
                        <option value="la acreditacion de comisiones">I did not receive my commissions correctly</option>
                        <option value="un retiro pendiente">I have a pending withdrawal</option>
                        <option value="la compra de un paquete de inicio (Aun no se refleja)">Buy a starter pack (Not yet reflected)</option>
                        <option value="la actulizacion datos generales">General data update support</option>
                    </select>
                </div>
            </div>
            <div className="sec2-sp">
                <p>Tell us your problem</p>
                <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="Write your problem here" />
            </div>
            <div className="sec3-sp">
                <button class="btn2" onClick={sendEmail}>Send</button>
            </div>
            <div className="sec4-sp">
                <div className="contenido">
                    <p>We do our best to solve all your problems and provide you with quality service.</p>
                    <img alt="support_img" />
                </div>
            </div>
        </section>
    )
}

export default Support