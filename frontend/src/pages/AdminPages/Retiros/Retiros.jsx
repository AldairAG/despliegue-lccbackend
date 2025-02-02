import "./Retiros.css"
import { useState, useEffect } from "react";
import { usePeticion } from "../../../hooks/usePeticion";
import { PETICION_TIPOS } from '../../../constants/tiposPeticion'

const tipos = [PETICION_TIPOS.RETIRO_WALLET_DIVIDENDO,PETICION_TIPOS.RETIRO_WALLET_COMISION]

const Retiros = () => {
    const { pagosList, fetchPeticionesBytipos, denegar,aprobar } = usePeticion()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const handleCopy = () => {
        const inputElement = document.getElementById("wallets");
        const range = document.createRange();
        range.selectNode(inputElement);
        window.getSelection().removeAllRanges();  // Clear any existing selections
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();  // Unselect after copying
    };

    const fetchData = async () => {
        setLoading(true)
        await fetchPeticionesBytipos(tipos)
        setLoading(false)
    }

    const handleDelete = async (id) => {
        await denegar(id)
        await fetchData()
    }

    const handleAprobar = async (id) => {
        await aprobar(id)
        await fetchData()
    }

    return (
        <section className="RetiroAdmin">
            <div className="tabla contenidoRetiros">
                <div className="titulo-read">
                    <p>Solicitudes de retiros</p>
                    <button className="sect2-rea" onClick={fetchData}><i class="bi bi-arrow-clockwise"></i></button></div>
                <div className="contenido-read">
                    {loading ? <div className="spinner"></div> : (
                        <ul>
                            {pagosList.map((item, index) => (
                                <div className="card-retiro">
                                    <div className="sec1-rea">
                                        <p>Usuario: {item.userName}</p><tr />
                                        <span>{item.email}</span>
                                    </div>
                                    <div className="sec2-rea">
                                        <p>Cantidad:</p> <tr />
                                        <span>{item.monto}</span>
                                    </div>
                                    <div className="sec3-rea">
                                        <button onClick={() => handleAprobar(item.peticion_id)}>Notificar de aprobado</button>
                                    </div>
                                    <div className="sec4-rea">
                                        <p >Wallet address to pay:</p>
                                        <div className="wallet">
                                            <span id="wallets">{item.usdtAddress}</span>
                                            <button onClick={handleCopy} ><i class="bi bi-copy"></i></button>
                                        </div>
                                    </div>
                                    <button onClick={() => handleDelete(item.peticion_id)}>Eliminar</button>
                                </div>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Retiros