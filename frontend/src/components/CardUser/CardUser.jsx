import "./CardUser.css"
import img0 from '../../Assets/Images/Logos/Logo_1pq.png'
import { useUser } from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { calcularRango } from "../../helpers/cardUserHelper";

const CardUser = () => {
    const { userLogged, getCardUserData } = useUser()
    const [state, setState] = useState({
        rango: null,
        teamCapital: '',
        imgRank: null,
        referidosDirectos: '',
        referidosTotal: '',
        loading: true
    })

    useEffect(() => {
        fetchData()
    }, [userLogged])

    const fetchData = async () => {
        const result = await getCardUserData(userLogged.username)
        
        const { rango, imgRank } = calcularRango(userLogged.wallet.rango)
        setState((prev) => ({
            ...prev,
            ['teamCapital']: result?.data.teamCapital || 0,
            ['referidosDirectos']: result?.data.referidosDirectos || 0,
            ['referidosTotal']: result?.data.referidosTotal || 0,
            ['rango']: rango,
            ['imgRank']: imgRank,
            ['loading']: false,
        }))
    }

    return (
        <section className="userDetail">
            {state.loading ? (
                <div className="spinner"></div>
            ) : (
                <>
                    <div className="sec1">
                        <p>Your rank</p>
                        <span>{state?.rango || 'no rank'}</span>
                    </div>
                    <div className="sec2">
                        <img className='rangoImg' src={state?.imgRank || img0} alt="rango" />
                    </div>
                    <div className="sec3">
                        <span>{userLogged?.username || ''}</span>
                        <p>Team capital: ${state?.teamCapital}<img alt="logo_usdt" /></p>
                        <p>Joined on: {userLogged?.wallet.fecha_ingreso || ''}</p>
                    </div>
                    <div className="sec4">
                        <div className="datosRedes">
                            <p className="titulo">Direct</p>
                            <p className="datoRed">{state?.referidosDirectos}</p>
                        </div>
                    </div>
                    <div className="sec5">
                        <div className="datosRedes">
                            <p className="titulo">Total network</p>
                            <p className="datoRed">{state?.referidosTotal}</p>
                        </div>
                    </div>
                </>
            )}

        </section>
    )

}
export default CardUser