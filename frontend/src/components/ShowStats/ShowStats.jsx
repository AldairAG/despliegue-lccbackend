import React from "react";
import "./ShowStats.css"

const ShowStats = (props) => {
    return (
        <div className="seccion-ShowStats">
            <div className="seccion1-c">
                <img alt="logo" />
                <p>Distinguished customer,</p>
            </div>
            <div className="seccion2-c">
                <p>Rank</p>
                <img alt="rango" />
            </div>
            <div className="seccion3-c">
                <p>Balance in wallet</p>
                <p>$ 0.00</p>
            </div>
            <div>

            </div>

        </div>
    )
}

export default ShowStats