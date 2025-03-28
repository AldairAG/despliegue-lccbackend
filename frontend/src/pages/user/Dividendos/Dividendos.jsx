import { useState } from "react";
import "./Dividendos.css";
import { PETICION_TIPOS } from '../../../constants/tiposPeticion'
import { Historial as HistorialTable } from "../../../components/tablas/Historial";
import { ItemHistorial } from "../../../components/tablas/items/ItemHistorial";
import { ItemHistorialBonos } from "../../../components/tablas/items/ItemHistorialBonos";
import { useHistorial } from "../../../hooks/useHistorial"
import { useUser } from "../../../hooks/useUser";
import { changeStateLocal } from "../../../utils/helpers";

const diccionarioHistorialesBono = [
    {
        key: "mantenimiento",
        finder: PETICION_TIPOS.PAGO_MANTENIMIENTO,
        titulo: "Pago mantenimiento",
        ic: "bi bi-hammer"
    },
    {
        key: "matching",
        finder: PETICION_TIPOS.BONO_MATCHING,
        titulo: "Bono matching",
        ic: "bi bi-arrows-angle-contract"
    },
    {
        key: "fasttrack",
        finder: PETICION_TIPOS.BONO_FAST_TRACK_BRONCE,
        titulo: "Bono fast track",
        ic: "bi bi-bar-chart-steps"
    },
    {
        key: "rangoRes",
        finder: PETICION_TIPOS.BONO_RANGO_RESIDUAL,
        titulo: "Bono rango residual",
        ic: "bi bi-diamond"
    },
    {
        key: "refDirect",
        finder: PETICION_TIPOS.BONO_REFERENCIA_DIRECTA,
        titulo: "Bono referencia directa",
        ic: "bi bi-diamond-fill"
    }
]

const diccionarioHistorialesTrans = [
    {
        key: 'divDiario',
        finder: PETICION_TIPOS.DIVIDENDO_DIARIO,
        titulo: "Dividendo diario",
        ic: "bi bi-calendar-check-fill"
    },
    {
        key: 'stp',
        finder: PETICION_TIPOS.STARTER_PACK,
        titulo: "Starter pack",
        ic: "bi bi-flag"
    },
    {
        key: 'retiros',
        finder: PETICION_TIPOS.RETIRO_WALLET_COMISION,
        titulo: "Retiros wallet",
        ic: "bi bi-wallet"
    },
    {
        key: 'transferInter',
        finder: PETICION_TIPOS.TRANSFERENCIA_INTERNA_WALLET_COM,
        titulo: "Transferencia interna",
        ic: "bi bi-wallet"
    },
    {
        key: 'interes',
        finder: PETICION_TIPOS.INTERES_COMPUESTO,
        titulo: "Interes compuesto",
        ic: "bi bi-piggy-bank"
    },
    {
        key: 'facturas',
        finder: PETICION_TIPOS.PAGO_STARTER_PACK_FACTURA,
        titulo: "Pago factura",
        ic: "bi bi-credit-card-2-front"
    },
]

const Dividendos = () => {

    const { getHistorialByTipo } = useHistorial()
    const { userLogged } = useUser()

    const [historiales, setHistoriales] = useState({
        mantenimiento: [],
        matching: [],
        fasttrack: [],
        rangoRes: [],
        refDirect: [],
        divDiario: [],
        stp: [],
        transferInter: [],
        retiros: [],
        interes: [],
        facturas: [],
    })

    const asignarHistorial = async (tipo,key) => {
        let historial=[]

        const result = await getHistorialByTipo(tipo, userLogged.username)

        if(result?.data){
            historial=result?.data.reverse()
        }

        changeStateLocal(setHistoriales, key, historial || [])
    }


    return (

        <section className="seccionDividendos">

            <div className="sec1-div"><i className="bi bi-graph-up-arrow"></i><h2>Benefits</h2></div>

            {/* --------------------------------- */}

            <div className="bonos-section">
                <div className="bonos-header">
                    <h3>Commisions</h3>
                    <hr />
                </div>


                <div className="bonos-header">
                    {diccionarioHistorialesBono.map(item => (
                        <HistorialTable historial={historiales[item.key]}
                            fetchHistory={()=>asignarHistorial(item.finder,item.key)}
                            titulo={item.titulo}
                            ic={item.ic}>
                            {(item) => (
                                <tr>
                                    <ItemHistorialBonos item={item} />
                                </tr>
                            )}
                        </HistorialTable>
                    ))}
                </div>

                <div className="bonos-section">
                    <div className="bonos-header">
                        <h3>Transactions</h3>
                        <hr />
                    </div>

                    {diccionarioHistorialesTrans.map(item => (
                        <HistorialTable historial={historiales[item.key]}
                            fetchHistory={()=>asignarHistorial(item.finder,item.key)}
                            titulo={item.titulo}
                            ic={item.ic}>
                            {(item) => (
                                <tr>
                                    <ItemHistorial item={item} />
                                </tr>
                            )}
                        </HistorialTable>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Dividendos;
