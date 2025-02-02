import "./OrdenModal.css"
import { useState, useEffect } from "react"

const OrdenModal = (props) => {
    const [visibleOrdenDetail, setVisibleOrdenDetail] = useState(false)

    const onclicVisible = () => {
        setVisibleOrdenDetail(!visibleOrdenDetail)
    }

    return (
        <section>
            <button onClick={onclicVisible}>View details</button>
            {visibleOrdenDetail && (
                <div className="orden-modal">
                    <div className="overlay"></div>
                    <div className="orden-modalContent">
                        <div className="sec0-mec">
                            <div>
                                <span>Order #{props.orden.numeroOrden}</span>
                                <p>Date: {props.orden.fecha}</p>
                                <p>State: {props.orden.estado}</p>
                            </div>
                            <button onClick={onclicVisible}><i class="bi bi-x"></i></button>
                        </div>
                        <div className="sec1-mec">
                            <p>Products</p>
                        </div>
                        <div className="sec2-mec"></div>
                        <div className="sec3-mec"></div>
                        <div className="sec4-mec"></div>
                        <div className="sec5-mec"></div>
                        <div className="sec6-mec"></div>
                    </div>
                </div>
            )}
        </section>
    )
}
export default OrdenModal