import { useEffect, useState } from 'react'
import './style/Historial.css'
export const Historial = ({ historial, fetchHistory, children, titulo, ic }) => {
    const [loading, setLoading] = useState(true)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if (historial) {
            setLoading(false)
        }else{
            setLoading(true)
        }
    }, [historial])

    const handleClickOpen = () => {
        setIsOpen(!isOpen)
        if (!isOpen) 
            fetchHistory()
        
    }

    return (
        <section className="tableContainer">
            <div className="titulo">
                <h5><i class={ic ? ic : "bi bi-clock-history"}></i> {titulo ? titulo : "Historial"}</h5>
                <svg onClick={handleClickOpen} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000">
                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                </svg>
            </div>
            {isOpen && (
                <table>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td>
                                    <div className='spinner'></div>
                                </td>
                            </tr>
                        ) : historial.length != 0 ? (
                            historial.map((item) => (
                                children(item)
                            ))
                        ) : <tr><td><span>You have not yet made a transaccion</span></td></tr>
                        }
                    </tbody>
                </table >
            )}
        </section>

    )
}

