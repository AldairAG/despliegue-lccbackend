import "./CardData.css"
import React, { useState, useEffect } from 'react';
import img1 from "../../Assets/Images/Logos/usdt.png"
const CardData = ({ titulo, dato }) => {
    const [valor, setValor] = useState(0.00);

    useEffect(() => {
        setValor(dato || 0.00);
    }, [dato]);


    return (
        <section className="contain-data-home">
            <div className="case">
                <p class="text-sm text-muted-foreground">{titulo}</p>
                <div className="case2">
                    <img src={img1} alt="logo_usdt" />
                    <h3 class="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">{dato} USDT</h3>
                </div>
            </div>
        </section>
    )
}
export default CardData