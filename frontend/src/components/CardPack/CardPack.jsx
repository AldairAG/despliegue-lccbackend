import { useEffect, useState } from "react"
import "./CardPack.css"
import img1 from "../../Assets/Images/Logos/usdt.png"
const CardPack = (props) => {
    const [paquete, setPaquete] = useState("")

    useEffect(() => {
        setPaquete(seleccionarOpcion(props.dato))
    }, [props.dato]);

    const seleccionarOpcion = (num) => {
        switch (true) {
            case num > 99 && num < 500:
                return "BUILDER";
            case num > 499 && num < 2500:
                return "BRONZE";
            case num > 2499 && num < 5000:
                return "SILVER";
            case num > 4999 && num < 10000:
                return "GOLD";
            case num >= 10000:
                return "PLATINUM";
            default:
                return "No pack";
        }
    }

    return (
        <section className="cardpack">
            <div className="cardpack-s1">
                <p className="pcp1">YOUR PACKAGE TOTAL: </p>
                <p className="pcp2">{paquete}</p>
            </div>
            <div className="cardpack-s2">
                <div className="cardpack-s3">
                    <img src={img1} alt="logo_usdt" />
                    <p className="pcp3">{props.dato.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(',', '.')} USDT</p>
                </div>
            </div>
        </section>
    )
}

export default CardPack